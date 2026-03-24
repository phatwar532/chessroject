"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer ring trailing
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop environments
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* 1. Precise Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      
      {/* 2. Trailing Glass Ring / Magnetic Solid Pill */}
      <motion.div
        className="fixed top-0 left-0 mix-blend-difference border-[1px] border-white rounded-full flex items-center justify-center overflow-hidden"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          scale: isHovered ? 1 : 1,
          borderColor: isHovered ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
