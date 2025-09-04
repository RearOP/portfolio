import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "./About";
import Contact from "./Contact";
import ImageCursorTrail from "../components/ui/image-cursortrail";
// import HomeProjects from "../components/HomeProjects";
gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.unsplash.com/photo-1692606743169-e1ae2f0a960f?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1644141655284-2961181d5a02?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://assets.lummi.ai/assets/QmNfwUDpehZyLWzE8to7QzgbJ164S6fQy8JyUWemHtmShj?auto=format&w=1500",
  "https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format",
  "https://assets.lummi.ai/assets/Qmb2P6tF2qUaFXnXpnnp2sk9HdVHNYXUv6MtoiSq7jjVhQ?auto=format&w=1500",
  "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=1200&auto=format",
];

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const API_URL = "http://localhost:5000";
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // ONE wrapper that contains all sections
  const rootRef = useRef(null);
  // Optional direct refs (clearer + avoids selector misses)
  const heroRefe = useRef(null);
  const heroCardsRef = useRef(null);
  const servicesRef = useRef(null);
  const cardsRef = useRef(null);
  const servicesHeaderRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : data?.projects || [];
        setProjects(items);
        setFilteredProjects(items);
      } catch (e) {
        console.error("Error fetching projects:", e);
      }
    })();
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Lenis + ST (guard against double-instantiation)
      const lenis = new Lenis();
      const onTick = (time) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const smoothStep = (p) => p * p * (3 - 2 * p);

      // --- HERO ---
      ScrollTrigger.create({
        trigger: heroRefe.current, // <- element, not selector
        start: "top top",
        end: "75% top",
        scrub: 1,
        onUpdate: (self) => {
          if (!heroCardsRef.current || !heroRef.current) return; // GUARD
          const progress = self.progress;
          const heroOpacity = gsap.utils.interpolate(
            1,
            0.5,
            smoothStep(progress)
          );
          gsap.set(heroCardsRef.current, { opacity: heroOpacity });

          const ids = ["#hero-card-1", "#hero-card-2", "#hero-card-3"];
          ids.forEach((id, i) => {
            const el = heroRef.current.querySelector(id);
            if (!el) return; // GUARD
            const delay = i * 0.9;
            const cp =
              gsap.utils.clamp(0, 1, progress - delay * 0.1) /
              (1 - delay * 0.1);
            const y = gsap.utils.interpolate("0%", "250%", smoothStep(cp));
            const scale = gsap.utils.interpolate(1, 0.75, smoothStep(cp));
            let x = "0%",
              rotation = 0;
            if (i === 0) {
              x = gsap.utils.interpolate("0%", "90%", smoothStep(cp));
              rotation = gsap.utils.interpolate(0, -15, smoothStep(cp));
            } else if (i === 2) {
              x = gsap.utils.interpolate("0%", "-90%", smoothStep(cp));
              rotation = gsap.utils.interpolate(0, 15, smoothStep(cp));
            }
            gsap.set(el, { y, x, rotation, scale });
          });
        },
      });

      // --- SERVICES: pin ---
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        pin: servicesRef.current,
        pinSpacing: true,
      });

      // --- CARDS position switching across pin ---
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        onLeave: () => {
          const rect = servicesRef.current.getBoundingClientRect();
          const topAbs = window.pageYOffset + rect.top;
          gsap.set(cardsRef.current, {
            position: "absolute",
            top: topAbs,
            left: 0,
            width: "100vw",
            height: "100vh",
          });
        },
        onEnterBack: () => {
          gsap.set(cardsRef.current, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          });
        },
      });

      // --- SERVICES: header + cards flip ---
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
          const headerY = gsap.utils.interpolate(
            "400%",
            "0%",
            smoothStep(headerProgress)
          );
          gsap.set(servicesHeaderRef.current, { y: headerY });

          ["#card-1", "#card-2", "#card-3"].forEach((id, index) => {
            const card = cardsRef.current.querySelector(id);
            const inner = card?.querySelector(".flip-card-inner");
            if (!card || !inner) return;

            const delay = index * 0.5;
            const cp =
              gsap.utils.clamp(0, 1, progress - delay * 0.1) /
              (0.9 - delay * 0.1);

            let y;
            if (cp < 0.4) {
              const np = cp / 0.4;
              y = gsap.utils.interpolate("-100%", "50%", smoothStep(np));
            } else if (cp < 0.6) {
              const np = (cp - 0.4) / 0.2;
              y = gsap.utils.interpolate("50%", "0%", smoothStep(np));
            } else {
              y = "0%";
            }
            let scale;
            if (cp < 0.4) {
              const np = cp / 0.4;
              scale = gsap.utils.interpolate(0.75, 1, smoothStep(np));
            } else if (cp < 0.6) {
              const np = (cp - 0.4) / 0.2;
              scale = gsap.utils.interpolate(0.75, 1, smoothStep(np));
            } else {
              scale = 1;
            }
            let opacity;
            if (cp < 0.2) {
              const np = cp / 0.2;
              opacity = smoothStep(np);
            } else {
              opacity = 1;
            }

            let x, rotateZ, rotationY;
            if (cp < 0.6) {
              x = index === 0 ? "100%" : index === 1 ? "0%" : "-100%";
              rotateZ = index === 0 ? -5 : index === 1 ? 0 : 5;
              rotationY = 0;
            } else if (cp < 1) {
              const np = (cp - 0.6) / 0.4;
              x = gsap.utils.interpolate(
                index === 0 ? "100%" : index === 1 ? "0%" : "-100%",
                "0%",
                smoothStep(np)
              );
              rotateZ = gsap.utils.interpolate(
                index === 0 ? -5 : index === 1 ? 0 : 5,
                0,
                smoothStep(np)
              );
              rotationY = smoothStep(np) * 180;
            } else {
              x = "0%";
              rotateZ = 0;
              rotationY = 180;
            }

            gsap.set(card, { opacity, x, y, rotate: rotateZ, scale });
            gsap.set(inner, { rotationY });
          });
        },
      });

      // cleanup
      return () => {
        gsap.ticker.remove(onTick);
        ScrollTrigger.getAll().forEach((st) => st.kill());
        lenis.destroy();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div ref={rootRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen relative overflow-x-hidden"
          ref={containerRef}
        >
          <ImageCursorTrail
            items={images}
            maxNumberOfImages={5}
            distance={25}
            imgClass="sm:w-10 w-8 sm:h-28 h-16 object-contain"
            className=" max-w-4xl rounded-3xl "
          >
            <div ref={heroRef}>
              <Hero titleRef={heroTitleRef} />
            </div>
          </ImageCursorTrail>
        </motion.div>
        <section className="hero" ref={heroRef}>
          <div className="hero-cards" ref={heroCardsRef}>
            <div className="card" id="hero-card-1">
              <div className="card-title">
                <span>Plan</span>
                <span>01</span>
              </div>
              <div className="card-title">
                <span>Plan</span>
                <span>01</span>
              </div>
            </div>
            <div className="card" id="hero-card-2">
              <div className="card-title">
                <span>Design</span>
                <span>02</span>
              </div>
              <div className="card-title">
                <span>Design</span>
                <span>02</span>
              </div>
            </div>
            <div className="card" id="hero-card-3">
              <div className="card-title">
                <span>Development</span>
                <span>03</span>
              </div>
              <div className="card-title">
                <span>Development</span>
                <span>03</span>
              </div>
            </div>
          </div>
        </section>
        <section className="about">
          <About />
        </section>
        <section className="services min-h-screen" ref={servicesRef}>
          <div className="services-header" ref={servicesHeaderRef}>
            <h1 className="text-5xl">This is services</h1>
          </div>
        </section>
        <section className="cards" ref={cardsRef}>
          <div className="cards-container">
            <div className="card" id="card-1">
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title">
                      <span>Plan</span>
                      <span>01</span>
                    </div>
                    <div className="card-title">
                      <span>Plan</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title">
                      <span>Plan</span>
                      <span>01</span>
                    </div>
                    <div className="card-copy">
                      <p>Discovery</p>
                      <p>Audit</p>
                      <p>User Flow</p>
                      <p>Site Map</p>
                      <p>Personas</p>
                      <p>Strategy</p>
                    </div>
                    <div className="card-title">
                      <span>Plan</span>
                      <span>01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" id="card-2">
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title">
                      <span>Design</span>
                      <span>02</span>
                    </div>
                    <div className="card-title">
                      <span>Design</span>
                      <span>02</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title">
                      <span>Design</span>
                      <span>02</span>
                    </div>
                    <div className="card-copy">
                      <p>Discovery</p>
                      <p>Audit</p>
                      <p>User Flow</p>
                      <p>Site Map</p>
                      <p>Personas</p>
                      <p>Strategy</p>
                    </div>
                    <div className="card-title">
                      <span>Design</span>
                      <span>02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" id="card-3">
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title">
                      <span>Development</span>
                      <span>03</span>
                    </div>
                    <div className="card-title">
                      <span>Development</span>
                      <span>03</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title">
                      <span>Development</span>
                      <span>03</span>
                    </div>
                    <div className="card-copy">
                      <p>Discovery</p>
                      <p>Audit</p>
                      <p>User Flow</p>
                      <p>Site Map</p>
                      <p>Personas</p>
                      <p>Strategy</p>
                    </div>
                    <div className="card-title">
                      <span>Development</span>
                      <span>03</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="outro">
          <Contact />
        </section>
      </div>
    </>
  );
};

export default Home;
