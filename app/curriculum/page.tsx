"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CurriculumPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const luxuryEase = "cubic-bezier(0.76, 0, 0.24, 1)";
    
    gsap.fromTo(".page-title", 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: luxuryEase, delay: 1.4 }
    );

    const fadeUpElements = gsap.utils.toArray<HTMLElement>(".fade-up");
    fadeUpElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 80, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 0, opacity: 1, duration: 1.5, ease: luxuryEase,
        }
      );
    });
  }, { scope: container });

  const curriculum = [
    {
      label: "LEVEL 01 · BEGINNER",
      level: "Beginner Level",
      desc: "We cover the basics from how pieces move to fundamental openings.",
      specs: [
        { label: "Frequency", val: "2 sessions / week" },
        { label: "Duration", val: "45 mins" },
        { label: "Batch Size", val: "3–5 kids" },
        { label: "Bonus", val: "Practice tournaments" }
      ],
      modules: ["Board Setup", "Piece Movements", "Basic Checkmates", "Opening Principles"]
    },
    {
      label: "LEVEL 02 · INTERMEDIATE",
      level: "Intermediate Level",
      desc: "Immersing into the mechanics of positional logic and tactics.",
      specs: [
        { label: "Frequency", val: "3 sessions / week" },
        { label: "Duration", val: "45 mins" },
        { label: "Batch Size", val: "3–5 kids" },
        { label: "Bonus", val: "Practice tournaments" }
      ],
      modules: ["Tactics", "Middle-Game Strategy", "Endgame Techniques"]
    },
    {
      label: "LEVEL 03 · ADVANCED",
      level: "Advanced Level",
      desc: "Professional training for competitive players with grandmaster-level deep dives.",
      specs: [
        { label: "Frequency", val: "3 sessions / week" },
        { label: "Duration", val: "60 mins" },
        { label: "Batch Size", val: "Up to 5 kids" },
        { label: "Bonus", val: "Tournament preparation" }
      ],
      modules: ["Opening Preparation", "Advanced Calculation", "Prophylaxis", "Master Games Analysis"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background" ref={container}>
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center border-b border-divider">
        <h1 className="page-title opacity-0 text-text font-hero text-[60px] md:text-[100px] uppercase tracking-[0.1em] text-center px-4">The Curriculum</h1>
      </section>

      <section className="py-40">
        <div className="container mx-auto px-4 max-w-7xl pb-32">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {curriculum.map((level, idx) => (
              <div 
                key={idx} 
                className="fade-up relative p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-divider border-l-[4px] border-l-primary group hover:bg-[#111] transition-colors duration-[0.7s] ease-[cubic-bezier(0.76,0,0.24,1)] h-full flex flex-col"
              >
                <div className="flex-1">
                  <span className="font-label text-primary text-[12px] uppercase tracking-[0.4em] mb-8 block">{level.label}</span>
                  <h2 className="text-[48px] font-cormorant italic mb-6 text-primary">{level.level}</h2>
                  <p className="font-quote text-[18px] text-text/80 mb-12 italic leading-[1.8]">{level.desc}</p>
                  
                  <div className="mb-16 space-y-6">
                    <span className="font-nav text-[12px] uppercase tracking-[0.25em] text-primary/60 border-b border-divider pb-4 block w-full">Structure</span>
                    <ul className="space-y-4">
                      {level.specs.map((s, i) => (
                        <li key={i} className="flex flex-col font-body">
                          <span className="text-[#a3a3a3] text-[13px] uppercase tracking-widest">{s.label}</span>
                          <span className="font-light text-text text-[15px] mt-1">{s.val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <span className="font-nav text-[12px] uppercase tracking-[0.25em] text-primary/60 border-b border-divider pb-4 block w-full">Modules</span>
                    <ul className="space-y-4">
                      {level.modules.map((mod, i) => (
                        <li key={i} className="flex items-start text-[15px] font-body text-[#a3a3a3] font-light leading-[1.8]">
                          <span className="w-[1px] h-3 bg-primary mt-2 mr-4 shrink-0" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center fade-up">
            <Link href="/contact">
              <Button size="lg" className="btn-luxury btn-filled w-full sm:w-[500px] border-primary font-nav text-[12px] uppercase tracking-[0.25em] h-16">
                 Review Process <MoveRight className="ml-4 w-4 h-4 opacity-50" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
