"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { InfiniteMarquee } from "@/components/shared/marquee";
import { TextRevealScroll } from "@/components/shared/text-reveal";
import { LuxuryButton } from "@/components/shared/luxury-button";
import { 
  ArrowRight, Shield, Globe, TrendingUp, Award, Users, CheckCircle, 
  Phone, Mail, Clock, Send 
} from "lucide-react";

/* PREMIUM ACCORDION COMPONENT */
function AnimatedAccordion({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5 max-w-[900px] mx-auto">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="bg-white/60 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white hover:border-[#1a3fa8]/30 transition-all duration-300 relative z-20">
            <motion.button 
              className="w-full flex justify-between items-center p-6 md:p-8 text-left outline-none group"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-hero text-[1.2rem] md:text-[1.4rem] font-bold text-[#0f1e4a] group-hover:text-[#1a3fa8] transition-colors pr-6">
                {item.question}
              </span>
              <motion.span 
                animate={{ rotate: isOpen ? 45 : 0 }} 
                className="w-12 h-12 rounded-full bg-[#1a3fa8]/10 text-[#1a3fa8] flex items-center justify-center flex-shrink-0 text-3xl font-light leading-none group-hover:bg-[#1a3fa8] group-hover:text-white transition-colors"
               >
                +
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="font-body text-[1.1rem] font-medium text-gray-600 pb-8 px-6 md:px-8 leading-[1.8]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const AnimatedHomeCard = ({ children, className }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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

  const spotlightBg = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(26,63,168,0.08), transparent 50%)`;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
      }}
      style={{ perspective: "2500px" }}
      className={`relative h-full w-full group ${className || ""}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col h-full bg-white/60 backdrop-blur-3xl rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-shadow duration-500 relative border border-white/80 group-hover:border-white group-hover:shadow-[0_40px_80px_rgba(26,63,168,0.12)] p-10 md:p-14"
      >
        <motion.div className="pointer-events-none absolute -inset-px transition opacity-0 group-hover:opacity-100 z-0 mix-blend-multiply" style={{ background: spotlightBg }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20" />
        
        <div className="relative z-20 h-full w-full flex flex-col" style={{ transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const faqs = [
    { question: "Why Online Chess is better?", answer: "Kids can play anytime, anywhere, against opponents from all over the world. Play more games in less time, analyze instantly, and track progress." },
    { question: "Why Chaturangveda for my kid?", answer: "Safety and security, affordable pricing, flexible schedules, and progress tracking for parents. Our curriculum is specifically designed for each age group with structured learning." },
    { question: "What is the role of parents?", answer: "Parents must involve themselves equally to ensure exponential growth. Parents ensure the child implements what they learn and finishes tasks." },
    { question: "Do you have international students?", answer: "Yes, 200+ kids across 10 countries." },
    { question: "What is the right age to start?", answer: "5–15 years is ideal. Young kids adapt patterns and habits faster." },
    { question: "Are coaches FIDE rated?", answer: "Yes, all coaches are FIDE rated and undergo 1 month of rigorous training. Many have 5+ years of experience." },
    { question: "Is there a completion certificate?", answer: "Yes, kids earn a professional Chaturangveda level completion certificate." }
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
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛'].map((piece, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -60, 0], rotate: [0, 15, -15, 0], x: [0, 30, -30, 0] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="absolute opacity-[0.04] text-[#1a3fa8] select-none"
              style={{ top: `${((i * 15) + Math.random() * 20) % 100}%`, left: `${((i * 12) + Math.random() * 20) % 100}%`, fontSize: `${Math.random() * 8 + 6}rem`, filter: "blur(2px)" }}
            >
              {piece}
            </motion.div>
          ))}
        </div>
      )}

      {/* 1. HERO SECTION */}
      <motion.section 
        className="relative min-h-[100svh] flex items-center pt-28 pb-20 justify-center overflow-hidden z-10"
      >
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1450]/90 to-[#0a1450]/70 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 z-0 bg-[url('/watercolor_chess_pieces.png')] bg-cover bg-center" />
        </motion.div>
        
        <div className="container relative z-20 mx-[24px] md:mx-[48px] lg:mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between">
            
            {/* LEFT COLUMN */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full lg:w-[55%] flex flex-col items-start"
            >
               <motion.div variants={fadeUp} className="flex items-center gap-6 mb-6">
                 <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#f59e0b]/80" />
                 <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#f59e0b] font-black drop-shadow-md">Premium Chess Academy</span>
               </motion.div>
               <motion.h1 
                 className="font-hero font-[800] text-white text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.95] mb-6 drop-shadow-2xl"
               >
                 {"Master the Art of Chess".split(" ").map((word, i) => (
                   <motion.span key={i} variants={fadeUp} className="inline-block mr-[0.25em]">{word}</motion.span>
                 ))}
               </motion.h1>

               <motion.p 
                 variants={fadeUp}
                 className="font-body text-[#f59e0b] text-[1.6rem] md:text-[2.2rem] mb-6 font-semibold italic drop-shadow-md"
               >
                 Holistic Development Through Chess!
               </motion.p>
               
               <motion.p 
                 variants={fadeUp}
                 className="font-body text-gray-200 text-[1.2rem] md:text-[1.3rem] mb-12 max-w-[500px] leading-[1.8] font-medium"
               >
                 Specialized courses for ages 5–15.<br/>Join 200+ kids across 10 countries.
               </motion.p>

               <motion.div 
                 variants={fadeUp}
                 className="flex flex-wrap gap-4 mb-12"
               >
                 {["Beginner", "Intermediate", "Advanced"].map((pill, i) => (
                   <span key={i} className="px-6 py-2.5 font-nav text-[0.8rem] uppercase font-black tracking-widest text-[#f59e0b] border-2 border-[#f59e0b]/30 bg-white/5 backdrop-blur-sm rounded-full shadow-sm">
                     {pill}
                   </span>
                 ))}
               </motion.div>

               <motion.div 
                 variants={fadeUp}
                 className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto mt-4"
               >
                 <LuxuryButton href="#trial" dark={false}>
                   Get Started <ArrowRight className="w-5 h-5"/>
                 </LuxuryButton>
                 
                 <LuxuryButton href="#programs" dark={true}>
                   View Curriculum
                 </LuxuryButton>
               </motion.div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="w-full lg:w-[45%] lg:pl-10 relative z-20"
              id="trial"
              style={{ perspective: "2000px" }}
            >
              <motion.div 
                whileHover={{ rotateY: -2, rotateX: 2, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-3xl rounded-[32px] p-10 md:p-14 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/20 w-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a3fa8]/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f59e0b]/10 rounded-full blur-[80px]" />

                <div className="flex items-center gap-4 mb-10 relative z-10">
                   <div className="w-16 h-16 rounded-full bg-[#1a3fa8]/10 flex items-center justify-center shrink-0 border border-[#1a3fa8]/20">
                     <span className="text-[#1a3fa8] text-3xl">♟</span>
                   </div>
                   <h3 className="font-hero text-[2.5rem] font-bold text-[#0f1e4a] leading-tight flex-1">Book a Free Trial Class</h3>
                </div>
                
                <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input type="text" placeholder="Child's Name" className="w-full bg-offwhite/50 border-2 border-transparent rounded-[16px] px-6 py-5 font-body font-semibold text-[#0f1e4a] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] transition-all" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <input type="number" placeholder="Age" className="w-full bg-offwhite/50 border-2 border-transparent rounded-[16px] px-6 py-5 font-body font-semibold text-[#0f1e4a] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] transition-all" />
                    </div>
                    <div className="flex-1">
                      <select className="w-full bg-offwhite/50 border-2 border-transparent rounded-[16px] px-6 py-5 font-body font-semibold text-gray-400 outline-none focus:bg-white focus:text-[#0f1e4a] focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] transition-all appearance-none cursor-pointer">
                        <option value="" disabled selected>Select Level</option>
                        <option value="beginner" className="text-[#0f1e4a]">Beginner</option>
                        <option value="intermediate" className="text-[#0f1e4a]">Intermediate</option>
                        <option value="advanced" className="text-[#0f1e4a]">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <input type="tel" placeholder="Phone Number" className="w-full bg-offwhite/50 border-2 border-transparent rounded-[16px] px-6 py-5 font-body font-semibold text-[#0f1e4a] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] transition-all" />
                  </div>
                  <div className="mt-4">
                    <LuxuryButton className="w-full">
                      Book Now <ArrowRight className="w-5 h-5" />
                    </LuxuryButton>
                  </div>
                </form>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 2. OUR MISSION */}
      <section className="py-[160px] px-[24px] md:px-[48px] text-center relative z-10 flex items-center justify-center min-h-screen border-b border-[#0f1e4a] overflow-hidden">
        {/* Enormous Background Marquee */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-center z-0">
          <InfiniteMarquee text="THINK LIKE A GRANDMASTER • " speed={80} />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1000px] mx-auto flex flex-col items-center relative z-10"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-6 mb-8">
             <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#1a3fa8]/40" />
             <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#1a3fa8] font-black bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white">Our Vision</span>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#1a3fa8]/40" />
          </motion.div>
          <div className="mb-8">
            <TextRevealScroll text="Our Mission" />
          </div>
          <motion.p variants={fadeUp} className="font-body text-[1.4rem] md:text-[1.8rem] leading-[1.8] text-gray-700 font-medium">
            Our mission at Chaturangveda is to foster a <span className="text-[#f59e0b] font-bold italic">deep love for chess</span> and to nurture the intellectual and strategic skills it develops. Through our specialized courses for all age groups, from young toddlers to advanced players, we aim to make chess accessible to everyone in our community.
          </motion.p>
        </motion.div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-[120px] px-[24px] md:px-[48px] w-full relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-[100px] flex flex-col items-center">
            <div className="flex items-center gap-6 mb-4">
               <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#1a3fa8]/40" />
               <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#1a3fa8] font-black">Excellence</span>
               <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#1a3fa8]/40" />
            </div>
            <TextRevealScroll text="Why Choose Us" />
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-[40px]"
          >
            {[
              { icon: <Award/>, title: "FIDE Rated Coaches", desc: "All coaches FIDE rated, 5+ years experience" },
              { icon: <Globe/>, title: "200+ Kids, 10 Countries", desc: "Global community of young chess learners" },
              { icon: <Shield/>, title: "Safe & Secure Learning", desc: "Protected privacy, safe environment" },
              { icon: <TrendingUp/>, title: "Progress Tracking", desc: "Parents receive regular feedback" },
              { icon: <CheckCircle/>, title: "Completion Certificate", desc: "Professional Chaturangveda certificate" },
              { icon: <Users/>, title: "Parent Involvement", desc: "Structured participation for growth" }
            ].map((feature, i) => (
              <AnimatedHomeCard key={i}>
                <motion.div style={{ transform: "translateZ(30px)" }} className="flex 1 h-full flex-col">
                  <div className="w-[80px] h-[80px] rounded-2xl bg-gradient-to-br from-[#1a3fa8]/10 to-[#1a3fa8]/5 flex items-center justify-center mb-8 border border-[#1a3fa8]/20 shadow-inner text-[#1a3fa8]">
                    {React.cloneElement(feature.icon as React.ReactElement, { className: "w-10 h-10 drop-shadow-md" })}
                  </div>
                  <h3 className="font-hero text-[1.8rem] font-bold text-[#0f1e4a] mb-4">{feature.title}</h3>
                  <p className="font-body text-[1.15rem] font-medium leading-[1.7] text-gray-600">{feature.desc}</p>
                </motion.div>
              </AnimatedHomeCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. COURSES */}
      <section id="programs" className="py-[160px] px-[24px] md:px-[48px] w-full relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-[100px] flex flex-col items-center">
             <div className="flex items-center gap-6 mb-4">
               <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#1a3fa8]/40" />
               <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#1a3fa8] font-black">Our Programs</span>
               <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#1a3fa8]/40" />
             </div>
             <TextRevealScroll text="Premium Courses" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-center">
            {[
              { 
                level: "Beginner", 
                sessions: "2 sessions/week, 45 mins", 
                group: "3–5 kids per group",
                topics: ["Board Setup", "Piece Movements", "Basic Checkmates", "Opening Principles"],
                active: false
              },
              { 
                level: "Intermediate", 
                sessions: "3 sessions/week, 45 mins", 
                group: "3–5 kids per group",
                topics: ["Tactics", "Middle-game", "Endgame"],
                active: true 
              },
              { 
                level: "Advanced", 
                sessions: "3 sessions/week, 60 mins", 
                group: "Up to 5 kids",
                topics: ["Opening Prep", "Master Games Analysis"],
                active: false
              }
            ].map((course, i) => (
              <AnimatedHomeCard key={i} className={course.active ? "lg:-mx-4 lg:-my-8 z-20" : "z-10"}>
                <motion.div style={{ transform: "translateZ(40px)" }} className="flex flex-col h-full w-full">
                  
                  {course.active && (
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#1a3fa8]/10 to-[#f59e0b]/10 blur-[50px] -z-10 rounded-full" />
                  )}

                  <h3 className="font-hero text-[3rem] font-bold mb-10 text-center text-[#0f1e4a]">
                    {course.level}
                  </h3>
                  
                  <div className="space-y-6 mb-12 flex-1 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 bg-[#1a3fa8]/10 text-[#1a3fa8] border border-[#1a3fa8]/20">
                         <Clock className="w-6 h-6" />
                      </div>
                      <span className="font-body text-[1.1rem] font-bold text-gray-700">{course.sessions}</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 bg-[#1a3fa8]/10 text-[#1a3fa8] border border-[#1a3fa8]/20">
                         <Users className="w-6 h-6" />
                      </div>
                      <span className="font-body text-[1.1rem] font-bold text-gray-700">{course.group}</span>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 mt-1 bg-[#f59e0b]/20 text-[#d98b0a] border border-[#f59e0b]/30">
                         <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="font-body text-[1.1rem] font-medium text-gray-600 mt-3 leading-[1.6]">
                        {course.topics.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 w-full">
                    <LuxuryButton href="#trial" dark={false} className="w-full text-[1rem]">
                      Enroll Now <ArrowRight className="w-5 h-5"/>
                    </LuxuryButton>
                  </div>

                </motion.div>
              </AnimatedHomeCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="py-[120px] px-[24px] md:px-[48px] w-full relative z-10">
        <div className="max-w-[1400px] mx-auto">
           <div className="text-center mb-[100px] flex flex-col items-center">
             <div className="flex items-center gap-6 mb-4">
               <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#1a3fa8]/40" />
               <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#1a3fa8] font-black">Offerings</span>
               <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#1a3fa8]/40" />
             </div>
             <TextRevealScroll text="Our Services" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-[40px]">
              {[
                { title: "Free Trial Class", desc: "Free session + trainer feedback" },
                { title: "Group Chess Class", desc: "Live interactive, max 5 kids" },
                { title: "Private 1:1 Chess Class", desc: "Fully tailored coaching" }
              ].map((service, i) => (
                <AnimatedHomeCard key={i}>
                   <motion.div style={{ transform: "translateZ(30px)" }} className="flex flex-col items-center text-center w-full h-full justify-center">
                     <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#1a3fa8]/10 to-[#1a3fa8]/5 text-[#1a3fa8] border border-[#1a3fa8]/20 flex items-center justify-center mb-10 shadow-inner font-hero text-[3rem] font-bold drop-shadow-md">
                       {i+1}
                     </div>
                     <h3 className="font-hero text-[2rem] font-bold text-[#0f1e4a] mb-4 leading-tight">{service.title}</h3>
                     <p className="font-body text-[1.2rem] font-medium text-gray-600">{service.desc}</p>
                   </motion.div>
                </AnimatedHomeCard>
              ))}
           </div>
        </div>
      </section>

      {/* 6. HALL OF FAME CAROUSEL */}
      <section className="py-[160px] px-[24px] md:px-[48px] bg-gradient-to-b from-[#0a1450] to-[#0f1e4a] relative z-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('/watercolor_chess_pieces.png')] bg-cover bg-center opacity-[0.05]" />
        <div className="max-w-[1400px] mx-auto text-center overflow-visible relative z-10">
          <div className="flex flex-col items-center gap-6 mb-16">
            <div className="flex items-center gap-6 mb-2">
               <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#f59e0b]/40" />
               <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#f59e0b] font-black drop-shadow-md">Excellence</span>
               <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#f59e0b]/40" />
            </div>
            <h2 className="text-[clamp(3.5rem,6vw,5rem)] font-[800] text-white font-hero drop-shadow-xl">
              Hall of Fame
            </h2>
          </div>
          
          <div className="flex gap-10 overflow-x-auto pb-12 pt-8 snap-x scrollbar-hide px-4 justify-start lg:justify-center items-center">
            {["Advaith", "Srinika", "Manish", "Shourya", "Sri Samanvith"].map((name, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15, scale: 1.05 }}
                className="min-w-[240px] flex flex-col items-center text-center snap-center p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all"
              >
                <div className="w-[160px] h-[160px] rounded-full overflow-hidden mb-8 border-4 border-[#f59e0b]/80 outline outline-[4px] outline-white/10 shadow-[0_0_40px_rgba(245,158,11,0.3)] relative">
                  <Image src={`https://i.pravatar.cc/300?img=${i + 40}`} alt={name} fill className="object-cover" />
                </div>
                <h4 className="font-hero text-[1.8rem] font-bold text-white mb-4 drop-shadow-md">{name}</h4>
                <div className="flex items-center gap-3 justify-center bg-white/10 px-5 py-2 rounded-full border border-white/20">
                  <span className="text-[1.2rem]">🇮🇳</span>
                  <span className="font-nav text-[0.8rem] font-black tracking-widest uppercase text-[#f59e0b]">India</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-[160px] px-[24px] md:px-[48px] w-full relative z-10">
        <div className="text-center mb-[100px] flex flex-col items-center">
          <div className="flex items-center gap-6 mb-4">
             <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#1a3fa8]/40" />
             <span className="font-nav text-sm uppercase tracking-[0.5em] text-[#1a3fa8] font-black">Support</span>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#1a3fa8]/40" />
          </div>
          <TextRevealScroll text="Frequently Asked Questions" />
        </div>
        <AnimatedAccordion items={faqs} />
      </section>

      {/* 8. BECOME A COACH & 9. CONTACT */}
      <section className="py-[120px] px-[24px] md:px-[48px] relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
           
           {/* CONTACT INFO */}
           <AnimatedHomeCard>
             <motion.div style={{ transform: "translateZ(30px)" }} className="flex flex-col w-full h-full">
               <h3 className="font-hero text-[3rem] font-[800] text-[#0f1e4a] mb-12 leading-[1.1]">Contact Info</h3>
               
               <div className="flex flex-col gap-10 mb-14 border-b border-gray-200/50 pb-12">
                 <div className="flex items-start gap-6">
                   <div className="w-[60px] h-[60px] rounded-full bg-[#1a3fa8]/10 flex items-center justify-center shrink-0 border border-[#1a3fa8]/20">
                     <Phone className="w-7 h-7 text-[#1a3fa8]" />
                   </div>
                   <div>
                     <h4 className="font-nav text-[0.8rem] font-black text-[#1a3fa8] uppercase tracking-widest mb-3">Phone</h4>
                     <p className="font-hero text-[1.4rem] text-[#0f1e4a] font-bold">+91 7569194709<br/>+91 8919174512</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-6">
                   <div className="w-[60px] h-[60px] rounded-full bg-[#1a3fa8]/10 flex items-center justify-center shrink-0 border border-[#1a3fa8]/20">
                     <Mail className="w-7 h-7 text-[#1a3fa8]" />
                   </div>
                   <div>
                     <h4 className="font-nav text-[0.8rem] font-black text-[#1a3fa8] uppercase tracking-widest mb-3">Email</h4>
                     <p className="font-hero text-[1.4rem] text-[#0f1e4a] font-bold">chaturangveda@gmail.com</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-6">
                   <div className="w-[60px] h-[60px] rounded-full bg-[#1a3fa8]/10 flex items-center justify-center shrink-0 border border-[#1a3fa8]/20">
                     <Clock className="w-7 h-7 text-[#1a3fa8]" />
                   </div>
                   <div>
                     <h4 className="font-nav text-[0.8rem] font-black text-[#1a3fa8] uppercase tracking-widest mb-3">Hours</h4>
                     <p className="font-hero text-[1.2rem] text-gray-700 font-medium leading-[1.6]">
                       Mon–Fri 4–8 PM<br/>Sat 10 AM–6 PM<br/>Sun: Closed
                     </p>
                   </div>
                 </div>
               </div>

               <div className="pt-4">
                  <h4 className="font-hero text-[2rem] font-bold text-[#0f1e4a] mb-8">Send a Message</h4>
                  <form className="flex flex-col gap-5">
                    <input type="text" placeholder="Full Name" className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all placeholder:text-gray-400" />
                    <input type="email" placeholder="Email Address" className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all placeholder:text-gray-400" />
                    <textarea placeholder="Message" rows={4} className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all resize-none placeholder:text-gray-400" />
                    <div className="mt-4 w-full">
                      <LuxuryButton className="w-full">
                        Send <Send className="w-5 h-5" />
                      </LuxuryButton>
                    </div>
                  </form>
               </div>
             </motion.div>
           </AnimatedHomeCard>

           {/* BECOME A COACH */}
           <AnimatedHomeCard>
             <motion.div style={{ transform: "translateZ(30px)" }} className="flex flex-col w-full h-full">
               <h3 className="font-hero text-[3rem] font-[800] text-[#0f1e4a] mb-6 leading-[1.1]">Become a Coach</h3>
               <p className="font-body text-[1.2rem] font-medium text-gray-600 mb-12 pb-10 border-b border-gray-200/50 leading-[1.7]">
                 Passionate about teaching? Join our global team of professionals. Requirements: FIDE rating, passion for teaching.
               </p>
               
               <form className="flex flex-col gap-6">
                 <input type="text" placeholder="Full Name" className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all placeholder:text-gray-400" />
                 <input type="email" placeholder="Email Address" className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all placeholder:text-gray-400" />
                 <input type="text" placeholder="Experience" className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all placeholder:text-gray-400" />
                 <input type="text" placeholder="FIDE ID (Optional)" className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all placeholder:text-gray-400" />
                 <textarea placeholder="Brief Bio" rows={4} className="w-full bg-white/60 border-2 border-transparent focus:border-[#1a3fa8]/50 focus:shadow-[0_10px_30px_rgba(26,63,168,0.1)] rounded-2xl px-6 py-5 font-body font-bold text-[#0f1e4a] outline-none transition-all resize-none mb-4 placeholder:text-gray-400" />
                 <div className="mt-4 w-full">
                    <LuxuryButton className="w-full">
                      Submit Application <ArrowRight className="w-5 h-5" />
                    </LuxuryButton>
                 </div>
               </form>
             </motion.div>
           </AnimatedHomeCard>

        </div>
      </section>

    </div>
  );
}
