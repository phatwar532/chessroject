"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const AnimatedBlogCard = ({ post }: any) => {
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

  const spotlightBg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(26,63,168,0.15), transparent 50%)`;

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
        className="flex flex-col h-full bg-white/70 backdrop-blur-3xl rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 relative outline-none border border-white group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-l-4 border-l-[#1a3fa8]"
      >
        <motion.div className="pointer-events-none absolute -inset-px transition opacity-0 group-hover:opacity-100 z-0 mix-blend-multiply" style={{ background: spotlightBg }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />
        
        {/* TOP IMAGE BLOCK (Parallaxed) */}
        <div className="w-full h-[200px] relative border-b border-gray-200/50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a3fa8]/5 to-[#f59e0b]/5" style={{ transformStyle: "preserve-3d" }}>
          <motion.div style={{ transform: "translateZ(30px)" }}>
            <svg viewBox="0 0 24 24" className="w-[100px] h-[100px] fill-none stroke-[#1a3fa8] stroke-[1px] opacity-30 group-hover:opacity-60 group-hover:scale-125 transition-all duration-700 delay-100">
              <path d="M12 2C10.8954 2 10 2.89543 10 4C10 4.88147 10.5702 5.62678 11.3659 5.90843L9.62343 14H14.3766L12.6341 5.90843C13.4298 5.62678 14 4.88147 14 4C14 2.89543 13.1046 2 12 2ZM8 15V17H16V15H8ZM7 18V20H17V18H7ZM6 21V22H18V21H6Z"/>
            </svg>
          </motion.div>
        </div>
        
        <div className="p-[32px] flex flex-col flex-1 relative z-20" style={{ transformStyle: "preserve-3d" }}>
          <motion.div style={{ transform: "translateZ(40px)" }} className="inline-block rounded-full px-4 py-1.5 font-nav text-[0.7rem] tracking-[0.2em] font-[900] uppercase mb-[20px] bg-[#1a3fa8]/10 text-[#1a3fa8] border border-[#1a3fa8]/20 w-max">
            {post.tag}
          </motion.div>
          
          <motion.h3 style={{ transform: "translateZ(50px)" }} className="font-hero text-[1.6rem] font-[800] text-[#0f1e4a] mb-[16px] leading-[1.3] line-clamp-2">
            {post.title}
          </motion.h3>
          
          <motion.p style={{ transform: "translateZ(30px)" }} className="font-body text-[1.05rem] font-medium text-gray-700 leading-[1.7] mb-[40px] flex-1 line-clamp-3">
            {post.excerpt}
          </motion.p>
          
          <motion.div style={{ transform: "translateZ(40px)" }} className="mt-auto">
            <Link href="#" className="font-nav text-[0.85rem] text-[#f59e0b] font-bold tracking-[0.15em] uppercase hover:tracking-[0.25em] transition-all duration-300 w-max flex items-center group/btn">
              Read Article <span className="ml-2 group-hover/btn:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const posts = [
    { tag: "STRATEGY", title: "The London System: Why It's Perfect for Beginners", excerpt: "A reliable and solid opening repertoire that lets you focus on middle-game tactical patterns instead of memorizing endless variations." },
    { tag: "COACHING", title: "How Parents Can Support Their Child's Chess Journey", excerpt: "Discover the most effective ways to encourage growth, manage tournament stress, and foster a healthy competitive mindset." },
    { tag: "TOURNAMENT", title: "Our Students at the 2024 National Championships", excerpt: "Recap of the spectacular performances, upsets, and key game analyses from our top-performing academy representatives." }
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
             <span className="font-nav text-sm uppercase tracking-[0.5em] text-navy/70 font-black">Latest from us</span>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-navy/40" />
          </motion.div>
          <motion.h1 
            variants={fadeUp}
            className="font-hero font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0f1e4a] via-[#1a3fa8] to-[#0f1e4a] drop-shadow-[0_10px_20px_rgba(26,63,168,0.2)] text-[clamp(4.5rem,8vw,8rem)] leading-[0.95] uppercase tracking-[0.05em]"
          >
            Insights <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#f59e0b] to-[#fbbf24] font-serif italic">&</span> News
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-[1.2rem] font-medium leading-[1.8] text-gray-700 max-w-[650px]">
            Explore deep master-level analyses, academy updates, and coaching tips.
          </motion.p>
        </motion.div>
      </section>

      {/* BLOG GRID */}
      <section className="pb-[120px] px-[24px] md:px-[48px] max-w-[1400px] mx-auto w-full relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[40px] xl:gap-[60px]"
        >
          {posts.map((post, i) => (
            <AnimatedBlogCard key={i} post={post} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
