"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or its parents should trigger hover state
      const interactiveEl = target.closest("a, button, [data-cursor]");
      
      if (interactiveEl) {
        setIsHovering(true);
        const text = interactiveEl.getAttribute("data-cursor-text");
        if (text) setHoverText(text);
        else setHoverText("");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-brand-gold rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? (hoverText ? 4 : 2) : 1,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {hoverText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[101] text-[8px] font-bold tracking-widest text-brand-black flex items-center justify-center w-32 h-32"
          animate={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
            opacity: isHovering ? 1 : 0
          }}
          transition={{ duration: 0.15 }}
        >
          {hoverText}
        </motion.div>
      )}
    </>
  );
}
