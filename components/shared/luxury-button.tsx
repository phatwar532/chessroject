"use client";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";

interface LuxuryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  dark?: boolean;
  gold?: boolean;
}

export function LuxuryButton({ children, href, onClick, className = "", dark = false, gold = false }: LuxuryButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.35); // Magnetic pull intensity
    y.set(middleY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  let bgClasses = "";
  let textFlipClass = "";

  if (gold) {
    bgClasses = "bg-gradient-to-r from-[#d98b0a] to-[#f59e0b] shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)] text-[#0f1e4a] border border-white/20";
    textFlipClass = "text-white";
  } else if (dark) {
    bgClasses = "bg-transparent border-2 border-white text-white hover:bg-white/5 shadow-[0_10px_30px_rgba(255,255,255,0.05)] text-white";
    textFlipClass = "text-[#f59e0b]";
  } else {
    bgClasses = "bg-[#0f1e4a] border border-[#1a3fa8]/20 text-white shadow-[0_10px_40px_rgba(15,30,74,0.15)] hover:shadow-[0_20px_50px_rgba(26,63,168,0.25)]";
    textFlipClass = "text-[#f59e0b]";
  }

  const Content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-5 font-nav font-black tracking-[0.2em] uppercase transition-shadow ${bgClasses} ${className}`}
    >
      {/* Lighting Sweep Animation */}
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
        <div className="relative h-full w-8 bg-white/20 blur-sm" />
      </div>

      {/* Vertical Flip Text Container */}
      <div className="relative z-10 flex h-[1.3em] overflow-hidden items-center">
        {/* Top Text (Normal) */}
        <span className="flex items-center gap-3 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Bottom Text (Hover) */}
        <span className={`absolute left-0 flex items-center gap-3 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 ${textFlipClass}`}>
          {children}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    if (href.startsWith('#')) {
      return (
        <a href={href} className="inline-block" onClick={onClick}>
          {Content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block" onClick={onClick}>
        {Content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block outline-none">
      {Content}
    </button>
  );
}
