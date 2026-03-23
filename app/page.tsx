"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Accordion } from "@/components/ui/accordion";
import Image from "next/image";
import { CustomCursor } from "@/components/shared/cursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AnimatedCounter = ({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime: number;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const current = Math.min(Math.floor((progress / (duration * 1000)) * end), end);
          setCount(current);
          if (current < end) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const luxuryEase = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    // Hero Reveal
    gsap.fromTo(".hero-word", 
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: luxuryEase, delay: 0.2 }
    );
    gsap.fromTo(".hero-sub", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: luxuryEase, delay: 0.8, stagger: 0.1 }
    );

    // Fade Up Scroll
    const fadeUpElements = gsap.utils.toArray<HTMLElement>(".fade-up");
    fadeUpElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 28, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          y: 0, opacity: 1, duration: 0.6, ease: luxuryEase,
        }
      );
    });

    const staggerGrids = gsap.utils.toArray<HTMLElement>(".stagger-grid");
    staggerGrids.forEach((grid) => {
      gsap.fromTo(grid.children, 
        { y: 28, opacity: 0 },
        {
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
          y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: luxuryEase,
        }
      );
    });
  }, { scope: container });

  const faqs = [
    { question: "Why is Online Chess better?", answer: "Accessibility anytime anywhere, play against world opponents, analyze and track progress instantly." },
    { question: "Why Chaturangveda for my kid?", answer: "Safety, affordable pricing, flexible schedules, progress tracking, age-appropriate structured curriculum." },
    { question: "What is the role of parents?", answer: "Equal involvement ensures exponential growth, help child implement learnings and finish tasks." },
    { question: "Does Chaturangveda have international students?", answer: "Yes, 200+ kids across 10 countries." },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-[80px]" ref={container}>
      
      {/* MARQUEE BAR */}
      <div className="w-full h-[40px] bg-ivory border-y border-divider overflow-hidden flex items-center relative z-20">
        <div className="flex w-max animate-marquee">
          {Array(4).fill("RATED INDIA'S #1 CHESS ACADEMY ♟ FIDE CERTIFIED COACHES ♟ 10,000+ STUDENTS TRAINED ♟ EST. 2023 IN INDIA ♟").map((text, i) => (
            <span key={i} className="font-nav text-[10px] font-[400] text-gold tracking-[0.2em] uppercase px-4 whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden border-b border-divider">
        <div className="absolute inset-0 z-0 bg-navy">
          <Image 
            src="/watercolor_chess_pieces.png" 
            alt="Watercolor Chess background" 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,20,50,0.45)] to-[rgba(10,20,50,0.65)] z-0 pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-[24px] md:px-[48px] text-center flex flex-col items-center">
          
          <div className="hero-sub mb-8 mt-24 md:mt-0">
            <h2 className="inline-flex items-center gap-4 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 font-nav text-white text-[11px] tracking-[0.22em] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              <span className="w-[20px] h-[1px] bg-gold block"></span>
              EST. IN INDIA SINCE 2023
              <span className="w-[20px] h-[1px] bg-gold block"></span>
            </h2>
          </div>
          
          <h1 className="font-hero font-[300] text-white uppercase leading-[1.1] max-w-[1400px] mb-6 flex flex-wrap justify-center" style={{ fontSize: "clamp(48px, 8vw, 120px)", textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)" }}>
            {"MASTER THE ART OF CHESS".split(" ").map((word, i) => (
              <span key={i} className="hero-word block mr-[0.3em]">{word}</span>
            ))}
          </h1>

          <p className="hero-sub font-quote text-white/95 text-[24px] italic mb-12 capitalize" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
            "Where Strategy Meets Excellence"
          </p>

          <div className="hero-sub flex flex-col sm:flex-row gap-[20px] w-full sm:w-auto items-center mt-[48px]">
            <Link href="/curriculum" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full px-[32px] py-[14px] text-white border-[2px] border-white bg-transparent font-hero text-[13px] uppercase tracking-[0.14em] h-auto rounded-none hover:bg-white hover:text-navy transition-colors duration-300 ease-out backdrop-blur-sm">
                Curriculum & Schedule
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <Button size="lg" className="w-full px-[32px] py-[14px] bg-[#C9A84C] font-hero text-[#0D1B2A] text-[13px] uppercase tracking-[0.14em] h-auto rounded-none border-none hover:bg-white transition-colors duration-300 ease-out">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-nav text-[10px] text-white tracking-[0.2em] uppercase" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>Scroll</span>
          <div className="w-[1px] h-[48px] bg-white/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[50%] bg-white animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* GAP REMOVED: STATISTICS SECTION COMPLETELY REMOVED */}

      {/* FEATURES SECTION */}
      <section className="py-[60px] md:py-[120px] px-[24px] md:px-[48px] bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-[64px] fade-up">
            <h2 className="font-nav text-[#C9A84C] text-[11px] tracking-[0.18em] uppercase mb-6">Our Philosophy</h2>
            <h3 className="font-hero text-4xl md:text-[48px] font-[300] text-white">Why Join Our Academy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] stagger-grid">
            {[
              { title: "Expert Coaches", desc: "Learn from FIDE-rated professionals with years of tournament experience." },
              { title: "Structured Curriculum", desc: "Systematically build strategic thinking from beginner to advanced level." },
              { title: "Proven Results", desc: "Students consistently perform at district, state, and national competitions." }
            ].map((feature, i) => (
              <div key={i} className="group bg-white rounded-none p-[32px] border-t-[3px] border-t-[#C9A84C] shadow-[0_4px_24px_rgba(11,26,46,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(11,26,46,0.1)]">
                <h4 className="font-serif font-bold text-[#0D1B2A] text-[24px] mb-[16px]">{feature.title}</h4>
                <p className="font-body text-[#444] text-[0.95rem] leading-[1.7]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="py-[60px] md:py-[120px] px-[24px] md:px-[48px] bg-[#0D1B2A] border-y border-divider">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-[64px] fade-up">
            <h2 className="font-nav text-gold text-[11px] tracking-[0.18em] uppercase mb-6">Structured Learning</h2>
            <h3 className="font-hero text-4xl md:text-[48px] font-[300] text-white">Curriculum Tracks</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] stagger-grid">
            {[
              { level: "BEGINNER", name: "Starter Plan", price: "₹999/month", features: ["4 classes/month", "Group sessions", "Basics & openings", "Progress tracking"], recommended: false },
              { level: "MOST POPULAR", name: "Growth Plan", price: "₹1,799/month", features: ["8 classes/month", "Group + 1 private session", "Tactics & middlegame", "Tournament prep"], recommended: true },
              { level: "ADVANCED", name: "Elite Plan", price: "₹2,499/month", features: ["12 classes/month", "3 private sessions", "Full curriculum access", "Competition coaching"], recommended: false }
            ].map((course, i) => (
              <div key={i} className={`group bg-[#1A2F4A] p-[40px_32px] rounded-none relative transition-all duration-300 ${course.recommended ? 'border-[1px] border-[#C9A84C] shadow-[0_16px_48px_rgba(201,168,76,0.15)]' : 'border-none shadow-[0_4px_24px_rgba(11,26,46,0.05)]'}`}>
                <div className="inline-block bg-[rgba(201,168,76,0.1)] text-[#C9A84C] font-nav text-[10px] tracking-[0.14em] uppercase px-[12px] py-[4px] rounded-sm mb-[24px]">
                  {course.level}
                </div>
                <h4 className="font-hero text-[1.4rem] text-white mb-[12px]">{course.name}</h4>
                <ul className="mb-[24px] space-y-2 min-h-[120px] mt-[16px]">
                  {course.features.map((feat, j) => (
                    <li key={j} className="text-[rgba(245,240,232,0.75)] text-[0.9rem] flex items-center gap-2 font-body font-[300]">
                       <span className="text-[#C9A84C] text-[0.8rem]">✦</span> {feat}
                    </li>
                  ))}
                </ul>
                <div className="font-cormorant italic text-[28px] text-[#C9A84C] mb-[32px]">
                  {course.price}
                </div>
                <Button className={`w-full font-nav text-[12px] tracking-[0.14em] uppercase rounded-none transition-colors duration-300 h-auto py-[16px] ${course.recommended ? 'bg-[#C9A84C] text-[#0D1B2A] border-none hover:bg-white hover:text-[#0D1B2A]' : 'bg-transparent border-[1.5px] border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A]'}`}>
                  Enroll Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center py-[24px] bg-white">
        <div className="inline-flex items-center gap-[4px] mx-auto">
          <span className="w-[120px] h-[1px] bg-divider"></span>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`w-[8px] h-[8px] ${i % 2 === 0 ? 'bg-navy' : 'bg-gold'}`} />
          ))}
          <span className="w-[120px] h-[1px] bg-divider"></span>
        </div>
      </div>

      {/* COACHES SECTION */}
      <section className="py-[60px] md:py-[120px] px-[24px] md:px-[48px] bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-[64px] fade-up">
            <h2 className="font-nav text-gold text-[11px] tracking-[0.18em] uppercase mb-6">Our Masters</h2>
            <h3 className="font-hero text-4xl md:text-[48px] font-[300] text-navy">FIDE Certified Coaches</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] stagger-grid">
            {[
              { name: "GM Aryan Kapoor", title: "FIDE Master", bio: "10+ years of coaching experience. National-level tournament player specializing in classical openings." },
              { name: "WFM Divya Nair", title: "Women's FIDE Master", bio: "State champion and certified coach with expertise in endgame technique and youth development." },
              { name: "IM Suresh Rao", title: "International Master", bio: "Over 15 years of competitive chess. Specializes in positional play and strategic planning." },
              { name: "FM Karan Desai", title: "FIDE Master", bio: "Tactical specialist and youth coach with multiple state-level tournament victories." }
            ].map((coach, i) => (
              <div key={i} className="bg-[#1A2F4A] border-t-[3px] border-t-[#C9A84C] p-[40px_24px] text-center rounded-none shadow-[0_4px_24px_rgba(11,26,46,0.05)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_16px_40px_rgba(11,26,46,0.1)] border-x-0 border-b-0">
                <div className="relative w-[96px] h-[96px] mx-auto rounded-full border-[2px] border-[#C9A84C] p-1">
                  <div className="w-full h-full rounded-full bg-divider overflow-hidden relative z-0">
                    <img src={`https://i.pravatar.cc/150?img=${i + 15}`} alt="Coach" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80" />
                  </div>
                </div>
                <h4 className="font-hero text-[20px] font-bold text-white mt-[20px]">{coach.name}</h4>
                <p className="font-nav text-[10px] tracking-[0.14em] uppercase text-[#C9A84C] mt-[6px]">{coach.title}</p>
                <p className="font-body text-[rgba(245,240,232,0.70)] text-[0.85rem] mt-[16px] leading-[1.6] px-2">{coach.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-[60px] md:py-[120px] px-[24px] md:px-[48px] bg-[#0D1B2A] relative overflow-hidden">
        
        {/* Decorative Quote Mark (Option B) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 font-hero text-[#C9A84C] opacity-15 pointer-events-none leading-none select-none text-[8rem]">
          "
        </div>

        <div className="max-w-7xl mx-auto relative z-10 pt-[24px]">
          <div className="text-center mb-[64px] fade-up">
            <h2 className="font-nav text-[#C9A84C] text-[11px] tracking-[0.18em] uppercase mb-6">Hall of Fame</h2>
            <h3 className="font-hero text-4xl md:text-[48px] font-[300] text-white">Student Outcomes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] stagger-grid">
            {[
              { name: "Arjun Mehta", role: "Parent of student", quote: "My son improved drastically within 3 months. The coaches are incredibly patient and structured." },
              { name: "Priya Sharma", role: "Student, Age 14", quote: "I went from knowing basic rules to winning my first district tournament. Chaturangveda changed everything." },
              { name: "Rohit Kulkarni", role: "Parent of student", quote: "Excellent curriculum, dedicated coaches, and a real passion for chess. Highly recommended." }
            ].map((kid, i) => (
              <div key={i} className="bg-[#1A2F4A] border-t-[3px] border-t-[#C9A84C] p-[40px] rounded-none shadow-[0_4px_24px_rgba(11,26,46,0.05)] text-center flex flex-col items-center justify-between border-x-0 border-b-0">
                <p className="font-cormorant italic text-[18px] text-[#F5F0E8] leading-[1.6] font-[300]">
                  "{kid.quote}"
                </p>
                <div className="mt-[32px] flex flex-col items-center">
                  <div className="text-[#C9A84C] text-[16px] mb-[16px] tracking-widest leading-none">
                    ★★★★★
                  </div>
                  <div className="w-[48px] h-[48px] rounded-full border border-gold overflow-hidden mb-[16px]">
                    <img src={`https://i.pravatar.cc/150?img=${i + 40}`} alt="Student" className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                  <h4 className="font-hero text-[16px] font-bold text-white uppercase tracking-wider">{kid.name}</h4>
                  <span className="font-nav text-[10px] text-[#C9A84C] tracking-[0.16em] uppercase mt-[4px]">{kid.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center py-[24px] bg-white">
        <div className="inline-flex items-center gap-[4px] mx-auto">
          <span className="w-[120px] h-[1px] bg-divider"></span>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`w-[8px] h-[8px] ${i % 2 === 0 ? 'bg-navy' : 'bg-gold'}`} />
          ))}
          <span className="w-[120px] h-[1px] bg-divider"></span>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="py-[60px] md:py-[120px] px-[24px] md:px-[48px] bg-ivory pb-[160px]">
        <div className="max-w-4xl mx-auto">
          <div className="fade-up flex flex-col items-center justify-center mb-16 text-center">
             <h2 className="font-nav text-gold text-[11px] tracking-[0.18em] uppercase mb-6">Knowledge Base</h2>
             <h3 className="font-hero font-[300] text-4xl md:text-[48px] text-navy mb-8">Questions & Answers</h3>
          </div>
          <div className="fade-up border-y border-divider py-10">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
