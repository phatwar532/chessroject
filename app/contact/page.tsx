"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { LuxuryButton } from "@/components/shared/luxury-button";

const AnimatedContactCard = ({ children, title, subtitle }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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

  const spotlightBg = useMotionTemplate`radial-gradient(900px circle at ${mouseX}px ${mouseY}px, rgba(26,63,168,0.12), transparent 50%)`;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 100, scale: 0.95 },
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
        className="flex flex-col h-full bg-white/70 backdrop-blur-3xl rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 relative border border-white group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.15)]  p-[48px] xl:p-[64px]"
      >
        <motion.div className="pointer-events-none absolute -inset-px transition opacity-0 group-hover:opacity-100 z-0 mix-blend-multiply" style={{ background: spotlightBg }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#1a3fa8]/50 to-transparent opacity-90 z-20" />
        
        <div className="relative z-20 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          <motion.div style={{ transform: "translateZ(30px)" }} className="inline-block rounded-full px-4 py-1.5 font-nav text-[0.7rem] tracking-[0.2em] font-[900] uppercase mb-[24px] bg-[#f59e0b]/15 text-[#d98b0a] border border-[#f59e0b]/20">
            {subtitle}
          </motion.div>
          <motion.h2 style={{ transform: "translateZ(40px)" }} className="text-[clamp(2.5rem,4vw,3.5rem)] font-hero font-[800] text-[#0f1e4a] mb-[40px] leading-[1.1]">
            {title}
          </motion.h2>
          
          <motion.div style={{ transform: "translateZ(50px)" }} className="w-full">
            {children}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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

      {/* BACKGROUND SVG HUGE */}
      <motion.svg 
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[150vh] w-[150vh] fill-none stroke-[#1a3fa8] stroke-[0.2px] opacity-[0.05] z-0 pointer-events-none"
      >
        <path d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6 10.5 6.5C10.5 7 10 8 9 9L5 5C5 4 4 3.5 3 3.5C2 3.5 1 4.5 1 6C1 7 1.5 7.5 2 8L6 14C6 14.5 5.5 15 5 15C4.5 15 4 14.5 4 14V13H2V17H22V13H20V14C20 14.5 19.5 15 19 15C18.5 15 18 14.5 18 14L22 8C22.5 7.5 23 7 23 6C23 4.5 22 3.5 21 3.5C20 3.5 19 4 19 5L15 9C14 8 13.5 7 13.5 6.5C14 6 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2ZM8 16V18H16V16H8ZM6 19V22H18V19H6Z" />
      </motion.svg>

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
             <span className="font-nav text-sm uppercase tracking-[0.5em] text-navy/70 font-black">Get In Touch</span>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-navy/40" />
          </motion.div>
          <motion.h1 
            variants={fadeUp}
            className="font-hero font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0f1e4a] via-[#1a3fa8] to-[#0f1e4a] drop-shadow-[0_10px_20px_rgba(26,63,168,0.2)] text-[clamp(4.5rem,8vw,8rem)] leading-[0.95] uppercase tracking-[0.05em]"
          >
            Contact
          </motion.h1>
        </motion.div>
      </section>

      {/* CONTACT TWO COLUMN */}
      <section className="pb-[120px] px-[24px] md:px-[48px] max-w-[1400px] mx-auto w-full relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] xl:gap-[80px]"
        >
          
          {/* LEFT: CLIENT SERVICES */}
          <AnimatedContactCard subtitle="CLIENT SERVICES" title="Contact Us">
            <div className="flex flex-col gap-[32px] font-body text-[1.1rem] text-gray-700 font-medium">
              <div className="pb-[32px] border-b border-gray-200 group/link">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-[#1a3fa8] mb-2">Email</div>
                <a href="mailto:academy@chaturangveda.com" className="text-[1.4rem] font-hero font-bold text-[#0f1e4a] group-hover/link:text-[#f59e0b] transition-colors">
                  academy@chaturangveda.com
                </a>
              </div>
              <div className="pb-[32px] border-b border-gray-200">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-[#1a3fa8] mb-2">Phone</div>
                <div className="text-[1.4rem] font-nav font-black tracking-widest text-[#0f1e4a]">
                  +91 75691 94709
                </div>
              </div>
              <div className="pb-[32px]">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-[#1a3fa8] mb-2">Hours</div>
                <div className="text-[1.2rem] font-bold text-[#0f1e4a] uppercase tracking-wide">
                  Mon–Sat, 9:00 AM – 7:00 PM IST
                </div>
              </div>
            </div>
          </AnimatedContactCard>

          {/* RIGHT: DIRECT INQUIRY */}
          <AnimatedContactCard subtitle="DIRECT INQUIRY" title="Send a Message">
            <form className="flex flex-col gap-[24px] w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/50 backdrop-blur-sm border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[12px] px-[24px] py-[20px] text-[#0f1e4a] font-body font-bold text-[1.05rem] outline-none hover:shadow-[0_8px_30px_rgba(26,63,168,0.08)] focus:border-[#1a3fa8]/50 focus:shadow-[0_8px_30px_rgba(26,63,168,0.15)] transition-all placeholder:text-gray-400"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/50 backdrop-blur-sm border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[12px] px-[24px] py-[20px] text-[#0f1e4a] font-body font-bold text-[1.05rem] outline-none hover:shadow-[0_8px_30px_rgba(26,63,168,0.08)] focus:border-[#1a3fa8]/50 focus:shadow-[0_8px_30px_rgba(26,63,168,0.15)] transition-all placeholder:text-gray-400"
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full bg-white/50 backdrop-blur-sm border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[12px] px-[24px] py-[20px] text-[#0f1e4a] font-body font-bold text-[1.05rem] outline-none hover:shadow-[0_8px_30px_rgba(26,63,168,0.08)] focus:border-[#1a3fa8]/50 focus:shadow-[0_8px_30px_rgba(26,63,168,0.15)] transition-all placeholder:text-gray-400"
              />
              <textarea 
                placeholder="How can we help you?" 
                rows={4}
                className="w-full bg-white/50 backdrop-blur-sm border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[12px] px-[24px] py-[20px] text-[#0f1e4a] font-body font-bold text-[1.05rem] outline-none resize-none hover:shadow-[0_8px_30px_rgba(26,63,168,0.08)] focus:border-[#1a3fa8]/50 focus:shadow-[0_8px_30px_rgba(26,63,168,0.15)] transition-all mb-[16px] placeholder:text-gray-400"
              />
              <div className="mt-4 w-full">
                <LuxuryButton className="w-full">
                  Send Message
                </LuxuryButton>
              </div>
            </form>
          </AnimatedContactCard>

        </motion.div>
      </section>

    </div>
  );
}
