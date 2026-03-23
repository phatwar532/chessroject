"use client";

import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#0B1A2E] text-white overflow-hidden pt-[80px] lg:pt-0">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInPanel {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* LEFT PANEL */}
      <div 
        className="relative w-full lg:w-[50vw] h-[200px] md:h-[400px] lg:h-[100vh] bg-[#0B1A2E] flex flex-col items-center justify-center p-[40px] md:p-[60px] lg:px-[5vw] overflow-hidden opacity-0 shrink-0"
        style={{ animation: 'fadeInPanel 0.8s ease forwards' }}
      >
        {/* Left Panel Background */}
        <div className="absolute inset-0 z-0 bg-[#0D1B2A]" />
        
        {/* Centered glowing Chess King/Rook SVG */}
        <div className="relative z-10 flex flex-col items-center">
          <svg 
            className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px]" 
            viewBox="0 0 40 40" 
            fill="none" 
            stroke="rgba(255,255,255,0.10)" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 2v6m-3-3h6" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 12v-3h3v3M18.5 12v-3h3v3M24 12v-3h3v3" strokeWidth="1.5" />
            <path d="M12 12h16v2H12z" strokeWidth="1.5" />
            <path d="M14 14C14 20 11 22 11 25H29C29 22 26 20 26 14Z" strokeWidth="1.5" />
            <path d="M10 25h20l2.5 7H7.5z" strokeWidth="1.5" />
            <path d="M6 32h28v4H6z" strokeWidth="1.5" />
          </svg>
          
          <div className="mt-8 w-24 h-[1px] bg-[#2D6BE4] opacity-30"></div>
          
          {/* Italic quote */}
          <p className="mt-6 text-[#7EB3F7] font-cormorant italic text-[16px] md:text-lg lg:text-xl text-center max-w-[80%]">
            "Every grandmaster was once a beginner."
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div 
        className="w-full lg:w-[50vw] min-h-[50vh] lg:h-[100vh] bg-[#0B1A2E] flex flex-col justify-center px-6 py-16 md:px-[6vw] lg:px-[8vw] z-10 opacity-0"
        style={{ animation: 'fadeInPanel 0.8s ease forwards', animationDelay: '0.2s' }}
      >
        <span className="font-hero text-[#7EB3F7] text-[12px] tracking-[4px] uppercase mb-6 block font-semibold drop-shadow-sm">
          BEGIN YOUR JOURNEY
        </span>
        
        <h1 
          className="font-hero italic text-[#FFFFFF] font-bold leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          Free Trial Class
        </h1>
        
        <p className="font-cormorant text-[#E8F0FF] text-[18px] leading-[1.8] max-w-xl mb-12 opacity-90 drop-shadow-sm">
          Before enrolling your child in regular classes, experience a free trial session. After completion, the trainer provides detailed personal feedback, identifying strengths and mapping out a customized strategic path to chess mastery.
        </p>

          <Link href="/contact" className="inline-block">
            <button className="bg-[#C9A84C] hover:bg-white text-[#0D1B2A] font-nav text-[13px] uppercase tracking-[2px] transition-colors duration-300 pointer-events-auto flex items-center justify-center rounded-sm font-semibold shadow-lg" style={{ padding: '16px 40px' }}>
              BOOK FREE TRIAL <MoveRight className="ml-3 w-4 h-4" />
            </button>
          </Link>
      </div>
      
    </div>
  );
}
