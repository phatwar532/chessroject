"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles, Castle, Award, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const CourseCard = ({ course, index, isFeatured }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  
  // 3D Tilt parameters (15 degrees rotation max)
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
    x.set(0);
    y.set(0);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, ${
    isFeatured ? 'rgba(245,158,11,0.18)' : 'rgba(26,63,168,0.18)'
  }, transparent 50%)`;

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
        className={cn(
          "flex flex-col h-full bg-white/70 backdrop-blur-3xl rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 relative outline-none border border-white group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.15)]",
          isFeatured ? "border-2 border-[#f59e0b]/80 ring-4 ring-[#f59e0b]/15" : "border-l-4 border-l-[#1a3fa8]"
        )}
      >
        {/* Dynamic Spotlight */}
        <motion.div
           className="pointer-events-none absolute -inset-px transition opacity-0 group-hover:opacity-100 z-0 mix-blend-multiply"
           style={{ background: spotlightBg }}
        />

        {/* Glossy top edge highlight for glass feel */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />

        {isFeatured && (
          <div className="w-full bg-gradient-to-r from-[#d98b0a] via-[#f59e0b] to-[#d98b0a] text-white font-nav text-[11px] tracking-[0.4em] uppercase py-2.5 text-center font-bold relative shadow-xl z-20" style={{ transform: "translateZ(30px)" }}>
            <span className="relative z-10 flex items-center justify-center gap-2">
               <Crown className="w-4 h-4" /> Premium Edition
            </span>
            <motion.div 
              animate={{ x: ["-200%", "200%"] }} 
              transition={{ duration: 3, ease: "linear", repeat: Infinity }} 
              className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg]" 
            />
          </div>
        )}

        {/* Transform Style 3D Wrapper for content */}
        <div className="relative z-20 flex flex-col h-full p-2" style={{ transformStyle: "preserve-3d" }}>
          <CardHeader className={cn(isFeatured ? "pt-6 pb-4" : "pt-10 pb-4")}>
            <motion.div style={{ transform: "translateZ(40px)" }} className="mb-2">
              {course.icon}
            </motion.div>
            <div className="flex flex-col gap-4">
              <motion.div style={{ transform: "translateZ(50px)" }}>
                <Badge className={cn(
                  "w-max rounded-full uppercase tracking-widest font-black px-4 py-1.5 font-nav text-[10px] shadow-sm backdrop-blur-md",
                  isFeatured ? "bg-[#f59e0b]/15 text-[#d98b0a] border border-[#f59e0b]/30" : "bg-[#1a3fa8]/10 text-[#1a3fa8] border border-[#1a3fa8]/20"
                )}>
                  {course.duration}
                </Badge>
              </motion.div>
              <motion.div style={{ transform: "translateZ(60px)" }}>
                <CardTitle className="text-4xl md:text-5xl font-hero font-bold text-navy tracking-normal">
                  {course.title}
                </CardTitle>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-8" style={{ transformStyle: "preserve-3d" }}>
            <motion.div style={{ transform: "translateZ(40px)" }} className="mb-8 p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white shadow-inner inline-block relative overflow-hidden group/price">
              <span className={cn(
                "relative z-10 text-[1.1rem] font-black tracking-widest uppercase font-nav flex items-center gap-2",
                isFeatured ? "text-[#d98b0a]" : "text-[#1a3fa8]"
              )}>
                Contact for Pricing
              </span>
            </motion.div>
            
            <ul className="space-y-6" style={{ transformStyle: "preserve-3d" }}>
              {course.curriculum.map((item: string, i: number) => (
                <motion.li key={i} style={{ transform: `translateZ(${20 + i * 10}px)` }} className="flex items-start group/item">
                  <div className={cn(
                    "mt-0.5 mr-4 p-1.5 rounded-[12px] shadow-sm transition-all duration-500 group-hover/item:scale-125 group-hover/item:rotate-[20deg]",
                    isFeatured ? "bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5" : "bg-gradient-to-br from-[#1a3fa8]/15 to-[#1a3fa8]/5"
                  )}>
                    <CheckCircle2 className={cn(
                      "w-5 h-5",
                      isFeatured ? "text-[#f59e0b]" : "text-[#1a3fa8]"
                    )} />
                  </div>
                  <span className="text-[16px] font-body text-charcoal/90 leading-relaxed font-semibold">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="pt-2 pb-8">
            <Link href="/demo" className="w-full h-full block">
              <motion.div style={{ transform: "translateZ(70px)" }} className="w-full">
                <Button 
                  className={cn(
                    "w-full h-16 rounded-full uppercase tracking-[0.25em] font-black font-nav transition-all duration-500 shadow-xl relative overflow-hidden group/btn",
                    isFeatured 
                      ? "bg-gradient-to-r from-[#d98b0a] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d98b0a] text-white shadow-[#f59e0b]/40 ring-1 ring-white/50" 
                      : "bg-gradient-to-r from-[#15348c] to-[#1a3fa8] hover:from-[#1a3fa8] hover:to-[#15348c] text-white shadow-[#1a3fa8]/40 ring-1 ring-white/50"
                  )} 
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover/btn:scale-105 transition-transform duration-300">
                    Enroll Now
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Sparkles className="w-5 h-5 text-white/90" />
                    </motion.div>
                  </span>
                  
                  {/* Button sweeping light beam */}
                  <motion.div 
                    animate={{ left: ["-100%", "200%"] }} 
                    transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }} 
                    className="absolute top-0 bottom-0 w-1/3 z-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[45deg]" 
                  />
                </Button>
              </motion.div>
            </Link>
          </CardFooter>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CoursesPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const courses = [
    {
      title: "Beginner",
      duration: "3 Months",
      icon: <Castle className="w-10 h-10 text-[#1a3fa8]/60 mb-2 drop-shadow-lg" />,
      curriculum: [
        "2 sessions/week, 45 mins each",
        "3–5 kids per group",
        "Modules: Board Setup, Piece Movements, Basic Checkmates, Opening Principles",
        "Practice tournaments included"
      ]
    },
    {
      title: "Intermediate",
      duration: "6 Months",
      icon: <Sparkles className="w-10 h-10 text-[#1a3fa8]/60 mb-2 drop-shadow-lg" />,
      curriculum: [
        "3 sessions/week, 45 mins each",
        "3–5 kids per group",
        "Modules: Tactics, Middle-game Strategy, Endgame Techniques",
        "Practice tournaments included"
      ]
    },
    {
      title: "Advanced",
      duration: "12 Months",
      icon: <Award className="w-10 h-10 text-[#f59e0b]/80 mb-2 drop-shadow-lg" />,
      curriculum: [
        "3 sessions/week, 60 mins each",
        "Up to 5 kids per group",
        "Modules: Opening Preparation, Advanced Calculation, Master Games Analysis",
        "Practice tournaments included"
      ]
    }
  ];

  return (
    <div className="bg-offwhite min-h-screen pt-20 pb-40 relative overflow-hidden">
      
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
              animate={{
                y: [0, -60, 0],
                rotate: [0, 15, -15, 0],
                x: [0, 30, -30, 0]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              className="absolute opacity-[0.04] text-navy select-none"
              style={{
                top: `${((i * 15) + Math.random() * 20) % 100}%`,
                left: `${((i * 12) + Math.random() * 20) % 100}%`,
                fontSize: `${Math.random() * 8 + 6}rem`,
                filter: "blur(2px)"
              }}
            >
              {piece}
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO BANNER WITH EXTREME PARALLAX */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ perspective: "1500px" }}
          className="relative w-full h-[450px] md:h-[600px] mb-28 rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] ring-1 ring-white group"
        >
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src="/watercolor_chess_pieces.png" 
              alt="Watercolor Chess Pieces" 
              fill 
              className="object-cover transition-transform duration-[15s] ease-out group-hover:scale-125 group-hover:rotate-1"
              priority
            />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[rgba(250,248,244,1)] via-[rgba(250,248,244,0.6)] to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[rgba(250,248,244,0.9)] via-[rgba(250,248,244,0.4)] to-transparent z-0 pointer-events-none" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-4">
               <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-navy/40" />
               <span className="font-nav text-sm uppercase tracking-[0.5em] text-navy/70 font-black">Elite Training</span>
               <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-navy/40" />
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-6xl md:text-[7.5rem] font-hero text-transparent bg-clip-text bg-gradient-to-br from-[#0f1e4a] via-[#1a3fa8] to-[#0f1e4a] uppercase tracking-[0.05em] font-black drop-shadow-[0_20px_40px_rgba(26,63,168,0.2)] mb-8 flex items-center justify-center leading-[1.1]"
            >
              Our Courses
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl md:text-3xl text-navy/80 font-quote italic max-w-4xl font-semibold tracking-[1.5px] leading-relaxed drop-shadow-md"
            >
              Structured learning paths designed by experts to take you from absolute beginner to tournament champion.
            </motion.p>
          </motion.div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-white/20 blur-[50px] rounded-[100%] z-0" />
        </motion.div>

        {/* 3D TILT COURSE CARDS */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-14"
        >
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} isFeatured={index === 2} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
