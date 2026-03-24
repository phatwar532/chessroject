"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const AnimatedCoachCard = ({ coach }: any) => {
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

  const spotlightBg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(245,158,11,0.15), transparent 50%)`;

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
        className="flex flex-col h-full bg-white/70 backdrop-blur-3xl rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 relative outline-none border border-white group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-l-4 border-l-[#f59e0b] p-[40px] items-center text-center"
      >
        <motion.div className="pointer-events-none absolute -inset-px transition opacity-0 group-hover:opacity-100 z-0 mix-blend-multiply" style={{ background: spotlightBg }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />
        
        <div className="relative z-20 flex flex-col h-full items-center justify-center w-full" style={{ transformStyle: "preserve-3d" }}>
          
          <motion.div 
            style={{ transform: "translateZ(60px)" }}
            className="w-[140px] h-[140px] rounded-full mb-[24px] relative flex items-center justify-center p-[4px] border-2 border-[#f59e0b]/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-500"
          >
            <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
              <Image 
                src={"https://i.pravatar.cc/300?img=" + coach.imgId} 
                alt={coach.name} 
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
          </motion.div>

          <motion.div style={{ transform: "translateZ(50px)" }} className="inline-block rounded-full px-4 py-1.5 font-nav text-[0.7rem] tracking-[0.2em] font-[900] uppercase mb-[16px] bg-[#f59e0b]/15 text-[#d98b0a] border border-[#f59e0b]/20">
            CERTIFIED
          </motion.div>
          
          <motion.h3 style={{ transform: "translateZ(40px)" }} className="font-hero text-[1.8rem] font-[700] text-[#0f1e4a] mb-[8px] uppercase tracking-wide">
            {coach.name}
          </motion.h3>
          <motion.div style={{ transform: "translateZ(35px)" }} className="font-nav text-[0.8rem] tracking-[0.2em] font-black uppercase text-[#1a3fa8] mb-[20px]">
            {coach.title}
          </motion.div>
          
          <motion.p style={{ transform: "translateZ(30px)" }} className="font-body text-[1rem] font-medium text-gray-700 leading-[1.7] max-w-[280px]">
            {coach.bio}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CoachesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const coaches = [
    { name: "GM Aryan Kapoor", title: "FIDE MASTER", imgId: 15, bio: "10+ years coaching. Specializing in classical openings." },
    { name: "WFM Divya Nair", title: "WOMEN'S FIDE MASTER", imgId: 16, bio: "State champion. Expertise in endgame and youth development." },
    { name: "IM Suresh Rao", title: "INTERNATIONAL MASTER", imgId: 17, bio: "15+ years competitive chess. Positional play specialist." },
    { name: "FM Karan Desai", title: "FIDE MASTER", imgId: 18, bio: "Tactical specialist with multiple state victories." }
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
      <section className="relative flex flex-col items-center justify-center pt-[200px] pb-[80px] px-[24px] z-10 w-full text-center max-w-[1200px] mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-6 mb-2">
             <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-navy/40" />
             <span className="font-nav text-sm uppercase tracking-[0.5em] text-navy/70 font-black">Our Masters</span>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-navy/40" />
          </motion.div>
          <motion.h1 
            variants={fadeUp}
            className="font-hero font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0f1e4a] via-[#1a3fa8] to-[#0f1e4a] drop-shadow-[0_10px_20px_rgba(26,63,168,0.2)] text-[clamp(4.5rem,8vw,8rem)] leading-[0.95] uppercase tracking-[0.05em]"
          >
            Our Coaches
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-[1.2rem] font-medium leading-[1.8] text-gray-700 max-w-[650px]">
            Learn from FIDE Certified masters with decades of competition experience.
          </motion.p>
        </motion.div>
      </section>

      {/* COACHES GRID */}
      <section className="pb-[120px] px-[24px] md:px-[48px] max-w-[1200px] mx-auto w-full relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-[40px] xl:gap-[60px]"
        >
          {coaches.map((coach, i) => (
            <AnimatedCoachCard key={i} coach={coach} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
