// client/src/components/ProjectCard.jsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../assets/img"
const ProjectCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);
  const namesRef = useRef(null);
  const previewRef = useRef(null);
  const card = [
    {
      id: 1,
      title: "Project One",
      imageUrl:
        "https://www.piclumen.com/wp-content/uploads/2024/11/random-image-generator-random-animal.webp",
    },
    {
      id: 2,
      title: "Project Two",
      imageUrl:
        "https://www.piclumen.com/wp-content/uploads/2024/11/random-image-generator-random-animal.webp",
    },
    {
      id: 3,
      title: "Project Three",
      imageUrl:
        "https://www.piclumen.com/wp-content/uploads/2024/11/random-image-generator-random-animal.webp",
    },
    {
      id: 4,
      title: "Project Four",
      imageUrl:
        "https://www.piclumen.com/wp-content/uploads/2024/11/random-image-generator-random-animal.webp",
    },
  ];

  function SplitTextIntoSpans(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const [firstDigit, secondDigit] = element.innerText;
      element.innerHtml = `<div className="digit-wrapper">
      <span className="first">${firstDigit}</span>
      <span className="second">${secondDigit}</span>
      </div>`;
    });
  }
  function populateGallery() {
    const imageContainers = document.querySelectorAll(".images");
    imageContainers.forEach((container) => {
      for (let j = 0; j < imagesPerProject; j++) {
        if (imageIndex > totalImages) imageIndex = 1;
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img");

        const img = document.createElement("img");
        img.src = `/img/img${imageIndex}.jpg`;
        img.alt = `Project Image ${imageIndex}`;
        imgContainer.appendChild(img);

        container.appendChild(imgContainer);
        imageIndex++;
      }
    });
  }
  SplitTextIntoSpans(".mask h1");
  const imagesPerProject = 6;
  const totalImages = 50;
  let imageIndex = 1;
  populateGallery();

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      gsap.set(".progress-bar", {
        scaleY: self.progress,
      });
    },
  });
  const previewImg = document.querySelector(".preview-img img");
  const imgElements = document.querySelectorAll(".img img");
  imgElements.forEach((img) => {
    ScrollTrigger.create({
      trigger: img,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => (previewImg.src = img.src),
      onEnterBack: () => (previewImg.src = img.src),
    });
  });

  const indicator = document.querySelector(".indicator");
  const indicatorStep = 18;
  const names = gsap.utils.toArray(".name");
  gsap.set(".indicator", {
    top: "0px",
  });
  const projects = gsap.utils.toArray(".project");
  projects.forEach((project, index) => {
    ScrollTrigger.create({
      trigger: project,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        gsap.to(indicator, {
          top: index * indicatorStep + "px",
          duration: 0.3,
          ease: "power2.out",
        });
        names.forEach((name, i) => {
          name.classList.toggle("active", i === index);
        });
      },
      onLeaveBack: () => {
        gsap.to(indicator, {
          top: (index - 1) * indicatorStep + "px",
          duration: 0.3,
          ease: "power2.out",
        });
        names.forEach((name, i) =>
          name.classList.toggle("active", i === index - 1)
        );
      },
    });
  });

  return (
    <div className="portfolio-container" ref={wrapperRef}>
      <nav>
        <a href="#">Index</a>
        <a href="#">Watch reels</a>
      </nav>

      <div className="nav-items">
        <a href="#">Work</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="whitespace w-1"></div>

      <div className="gallery">
        {card.map((item, index) => (
          <div
            className="project"
            key={item.id}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <div className="index">
              <div className="mask">
                <h1 className="h1">{String(item.id).padStart(2, "0")}</h1>
              </div>
            </div>

            <div className="images">
              {/* Example placeholder for image blocks per project */}
              {/* <div className="img"> */}
              {/* <img src="" alt="" /> */}
              {/* </div> */}
            </div>

            {/* render the project-name only when this item is active */}

            <div className="project-names" ref={namesRef}>
              <div className="indicator">
                <div className="symbol"></div>
              </div>
              <div className="name active">
                <p>Project One</p>
              </div>
              <div className="name">
                <p>Project Two</p>
              </div>
              <div className="name">
                <p>Project Three</p>
              </div>
              <div className="name">
                <p>Project Four</p>
              </div>
              <div className="name">
                <p>Project Five</p>
              </div>
              <div className="name">
                <p>Project Six</p>
              </div>
              <div className="name">
                <p>Project Seven</p>
              </div>
              <div className="name">
                <p>Project Eight</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="whitespace w-2"></div>

      {/* single preview-img for the active item */}
      <div className="preview-img" ref={previewRef}>
        <img src={card[activeIndex].imageUrl} alt="" />
      </div>

      <div className="progress-bar"></div>

      <div className="footer">
        <p>portfolio 2025</p>
      </div>
    </div>
  );
};

export default ProjectCard;
