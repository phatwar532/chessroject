"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { LuxuryButton } from "@/components/shared/luxury-button";

const AnimatedServiceCard = ({ title, desc, icon }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(26,63,168,0.18), transparent 50%)`;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 100, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
      }}
      style={{ perspective: "2500px" }}
      className="h-full relative group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col h-full bg-white/70 backdrop-blur-3xl rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 relative outline-none border border-white group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-l-4 border-l-[#1a3fa8] p-[40px] items-center text-center"
      >
        <motion.div className="pointer-events-none absolute -inset-px transition opacity-0 group-hover:opacity-100 z-0 mix-blend-multiply" style={{ background: spotlightBg }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />
        
        <div className="relative z-20 flex flex-col h-full items-center justify-center w-full" style={{ transformStyle: "preserve-3d" }}>
          <motion.div style={{ transform: "translateZ(60px)" }}>
            {icon}
          </motion.div>
          <motion.h3 style={{ transform: "translateZ(40px)" }} className="font-hero text-[1.6rem] font-[700] text-[#0f1e4a] mb-[16px] tracking-wide uppercase">
            {title}
          </motion.h3>
          <motion.p style={{ transform: "translateZ(30px)" }} className="font-body text-[1rem] font-medium text-gray-700 leading-[1.75]">
            {desc}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const services = [
    {
      title: "ONLINE COACHING",
      desc: "Live 1-on-1 and group sessions from anywhere in India.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[80px] h-[80px] mb-[32px] fill-none stroke-[#f59e0b] stroke-[1.5px] drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
          <path d="M12 2C11.5 2 11 2.5 11 3V5C11 5.5 11.5 6 12 6C12.5 6 13 5.5 13 5V3C13 2.5 12.5 2 12 2ZM9 6L8 8C7 10 7.5 13 12 15C16.5 13 17 10 16 8L15 6L14 7L12 5L10 7L9 6ZM8 16V18H16V16H8ZM6 19V22H18V19H6Z" />
        </svg>
      )
    },
    {
      title: "TOURNAMENT PREP",
      desc: "Specialized coaching for competitive play at all levels.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[80px] h-[80px] mb-[32px] fill-none stroke-[#f59e0b] stroke-[1.5px] drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
           <path d="M12 2L10 6H14L12 2ZM6 8C5 10 5.5 13 10 15V18C10 19 8 19.5 8 20V22H16V20C16 19.5 14 19 14 18V15C18.5 13 19 10 18 8H15L12 11L9 8H6Z" />
        </svg>
      )
    },
    {
      title: "PARENT DASHBOARD",
      desc: "Track your child's progress, session history, and coach feedback.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[80px] h-[80px] mb-[32px] fill-none stroke-[#f59e0b] stroke-[1.5px] drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
           <path d="M12 2C10.8954 2 10 2.89543 10 4C10 4.88147 10.5702 5.62678 11.3659 5.90843L9.62343 14H14.3766L12.6341 5.90843C13.4298 5.62678 14 4.88147 14 4C14 2.89543 13.1046 2 12 2ZM8 15V17H16V15H8ZM7 18V20H17V18H7ZM6 21V22H18V21H6Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-offwhite">
      
      {/* Liquid Aurora Background Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply">
         <motion.div 
           animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(26,63,168,0.08)_0deg,rgba(245,158,11,0.06)_120deg,rgba(26,63,168,0.08)_240deg,rgba(250,248,244,0.02)_360deg)] blur-[120px]" 
         />
      </div>

      {/* Floating Chess Icons */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛'].map((piece, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -60, 0], rotate: [0, 15, -15, 0], x: [0, 30, -30, 0] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="absolute opacity-[0.04] text-navy select-none"
              style={{ top: `${((i * 15) + Math.random() * 20) % 100}%`, left: `${((i * 12) + Math.random() * 20) % 100}%`, fontSize: `${Math.random() * 8 + 6}rem`, filter: "blur(2px)" }}
            >
              {piece}
            </motion.div>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex flex-col items-start justify-center px-[24px] md:px-[80px] max-w-[1400px] mx-auto w-full pb-20 pt-40 z-10">
        <motion.div 
          animate={{ rotate: [15, 20, 15], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[10%] opacity-20 pointer-events-none"
        >
          <svg viewBox="0 0 24 24" className="h-[60vh] w-[60vh] fill-none stroke-[#1a3fa8] stroke-[0.5px]">
            <path d="M6 2H8V5H10V2H14V5H16V2H18V6L15 14H9L6 6V2ZM8 15V17H16V15H8ZM6 18V22H18V18H6Z" />
          </svg>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[800px]"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-6 mb-4">
             <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-navy/40" />
             <span className="font-nav text-sm uppercase tracking-[0.5em] text-navy/70 font-black">Begin Your Journey</span>
          </motion.div>
          <motion.h1 
            variants={fadeUp}
            className="font-hero font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0f1e4a] via-[#1a3fa8] to-[#0f1e4a] drop-shadow-[0_10px_20px_rgba(26,63,168,0.2)] mb-8 text-[clamp(4.5rem,8vw,8rem)] leading-[0.95]"
          >
            Free Trial Class
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-[1.2rem] font-medium leading-[1.8] text-gray-700 mb-[40px] max-w-[650px]">
            Before enrolling, experience a free trial session. Your trainer provides detailed personal feedback and a customized strategic path to mastery.
          </motion.p>
          <motion.p variants={fadeUp} className="font-hero italic text-[#f59e0b] text-[1.8rem] mb-[48px] drop-shadow-sm font-semibold">
            "Every grandmaster was once a beginner."
          </motion.p>
          <motion.div variants={fadeUp} className="mt-4">
            <LuxuryButton href="/contact" dark={false}>
              BOOK FREE TRIAL
            </LuxuryButton>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-[120px] px-[24px] md:px-[48px] max-w-[1400px] mx-auto w-full relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[40px]"
        >
          {services.map((svc, i) => (
            <AnimatedServiceCard key={i} title={svc.title} desc={svc.desc} icon={svc.icon} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
