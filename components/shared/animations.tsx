"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const CUSTOM_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

gsap.registerPlugin(ScrollTrigger);

export function PageLoadAnimation({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");
    if (hasVisited) {
      setShowLoader(false);
      return;
    }

    const overlay = overlayRef.current;
    const line = lineRef.current;
    
    gsap.set(line, { scaleX: 0, transformOrigin: 'left' });
    
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("visited", "true");
        setTimeout(() => setShowLoader(false), 400); // Wait for fade out
      }
    });

    tl.to(line, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut",
    })
    .to(overlay, {
      opacity: 0,
      duration: 0.4,
      pointerEvents: "none",
    }, "+=0.2");

  }, []);

  return (
    <>
      {showLoader && (
        <div 
          ref={overlayRef} 
          className="fixed inset-0 bg-[#FAF8F4] z-[9999] flex flex-col items-center justify-center transition-opacity"
        >
          <div className="font-hero text-navy text-[48px] font-[300] mb-8">C</div>
          <div className="w-[200px] h-[1px] bg-divider relative overflow-hidden flex mb-4">
             <div ref={lineRef} className="absolute inset-0 bg-gold" />
          </div>
          <p className="font-cormorant italic text-navy/60">Loading...</p>
        </div>
      )}
      <div ref={wrapperRef} className="flex-1 flex flex-col w-full h-full">
        {children}
      </div>
    </>
  );
}
