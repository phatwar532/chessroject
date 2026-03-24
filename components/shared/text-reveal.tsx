"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export function TextRevealScroll({ text, className }: { text: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "start 40%"]
  });

  const words = text.split(" ");

  return (
    <div ref={container} className={`relative w-full ${className || ""}`}>
      <p className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-0.1em text-[clamp(2.5rem,5vw,5rem)] font-[800] font-hero text-[#0f1e4a] leading-[1.1]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
        })}
      </p>
    </div>
  );
}

const Word = ({ children, progress, range }: any) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [40, 0]);
  const rotateX = useTransform(progress, range, [-45, 0]);
  
  return (
    <span className="relative inline-block overflow-hidden pb-2" style={{ perspective: "1000px" }}>
      <motion.span 
        style={{ opacity, y, rotateX, display: "inline-block", transformOrigin: "bottom" }}
        className="drop-shadow-sm"
      >
        {children}
      </motion.span>
    </span>
  );
};
