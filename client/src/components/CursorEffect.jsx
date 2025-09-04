// client/src/components/CursorEffect.jsx
import React, { useEffect, useRef } from "react";

const CursorEffect = () => {
  const trailRef = useRef(null);
  const dotRef = useRef(null);
  const isPointerRef = useRef(false);

  // Use requestAnimationFrame for smooth animation
  const requestRef = useRef();
  const previousPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (timestamp) => {
      // Smoothly interpolate toward the target position
      const { x: prevX, y: prevY } = previousPosRef.current;
      const { x: targetX, y: targetY } = targetPosRef.current;

      // Using linear interpolation for smooth movement
      const newX = prevX + (targetX - prevX) * 0.15;
      const newY = prevY + (targetY - prevY) * 0.15;

      // Update DOM directly for better performance
      if (trailRef.current && dotRef.current) {
        trailRef.current.style.left = `${newX}px`;
        trailRef.current.style.top = `${newY}px`;
        dotRef.current.style.left = `${targetX}px`;
        dotRef.current.style.top = `${targetY}px`;

        // Update styles based on pointer state
        const scale = isPointerRef.current ? 1.5 : 1;
        const opacity = isPointerRef.current ? 0.7 : 0.5;

        trailRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        trailRef.current.style.opacity = opacity;
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      previousPosRef.current = { x: newX, y: newY };
      requestRef.current = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseMove = (e) => {
      // Update target position without state updates
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      // Check if element is clickable - but do it less frequently
      const target = e.target;
      const newIsPointer =
        target.closest('a, button, [role="button"], [data-clickable]') ||
        window.getComputedStyle(target).cursor === "pointer";

      if (newIsPointer !== isPointerRef.current) {
        isPointerRef.current = newIsPointer;
      }
    };

    // Throttle the expensive pointer check
    let pointerCheckTimeout;
    const handleMouseMoveForPointer = (e) => {
      if (!pointerCheckTimeout) {
        pointerCheckTimeout = setTimeout(() => {
          const target = e.target;
          const newIsPointer =
            target.closest('a, button, [role="button"], [data-clickable]') ||
            window.getComputedStyle(target).cursor === "pointer";

          if (newIsPointer !== isPointerRef.current) {
            isPointerRef.current = newIsPointer;
          }
          pointerCheckTimeout = null;
        }, 100); // Check only every 100ms
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleMouseMoveForPointer);
    requestRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseMoveForPointer);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor trail */}
      <div
        ref={trailRef}
        className="fixed w-6 h-6 rounded-full border border-[#000000] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-100 ease-out"
        style={{
          opacity: 0.5,
          left: "0px",
          top: "0px",
        }}
      />

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full bg-[#000000] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-50 ease-out"
        style={{
          left: "0px",
          top: "0px",
        }}
      />
    </>
  );
};

export default CursorEffect;
