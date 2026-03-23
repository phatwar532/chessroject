"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CoachesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const luxuryEase = "cubic-bezier(0.76, 0, 0.24, 1)";
    
    gsap.fromTo(".page-title", 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: luxuryEase, delay: 1.4 }
    );

    gsap.fromTo(".fade-up", 
      { y: 80, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: "top 85%" },
        y: 0, opacity: 1, duration: 1.5, ease: luxuryEase, stagger: 0.15, delay: 1.4
      }
    );
  }, { scope: container });

  return (
    <div className="flex flex-col min-h-screen bg-background" ref={container}>
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center border-b border-divider">
        <h1 className="page-title opacity-0 text-text font-hero text-[60px] md:text-[100px] uppercase tracking-[0.1em] text-center px-4">Join Our Faculty</h1>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          <div className="fade-up relative">
            <h2 className="font-label text-primary text-[14px] tracking-[0.4em] uppercase mb-10">Carrers</h2>
            <h3 className="font-cormorant italic text-[56px] text-text mb-12">The Academy Standard</h3>
            
            <p className="font-body text-[#a3a3a3] font-light text-[16px] leading-[1.9] mb-16 max-w-lg">
              Chaturangveda Academy seeks exceptional minds. If you possess a profound understanding of chess pedagogy and a refined tournament history, we invite you to join our elite roster.
            </p>

            <span className="font-label text-[12px] tracking-[0.4em] text-primary mb-8 border-b border-divider pb-2 inline-block">Requirements</span>
            <ul className="space-y-8">
              {[
                { title: "FIDE Rated (Preferred)", desc: "A verifiable international rating signifying mastery." },
                { title: "Teaching Passion", desc: "A natural ability to nurture logic, strategy, and confidence in young minds." },
                { title: "Tournament Experience", desc: "Proven track record in national or international competitive play." },
                { title: "Academy Onboarding", desc: "Will undergo 1 month of rigorous Chaturangveda training." },
              ].map((req, i) => (
                <li key={i} className="flex flex-col border-l border-primary/20 pl-6 hover:border-primary transition-colors duration-500">
                  <span className="font-cormorant italic text-[24px] mb-2 text-primary">{req.title}</span>
                  <span className="font-body text-[#a3a3a3] font-light text-[15px]">{req.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-up bg-[#111] p-12 lg:p-16 relative">
            <div className="gold-line gold-line-anim absolute top-0 left-0 w-full" />
            <h3 className="font-cormorant italic text-[40px] mb-12 text-primary">Application Form</h3>
            
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <label className="font-label text-text/50 text-[11px] uppercase tracking-[0.3em]">Full Name</label>
                <input type="text" className="w-full bg-transparent border-b border-divider pb-2 focus:outline-none focus:border-primary transition-colors text-text font-cormorant text-[24px] tracking-wide placeholder-text/20" placeholder="Your full legal name" />
              </div>

              <div className="space-y-4">
                <label className="font-label text-text/50 text-[11px] uppercase tracking-[0.3em]">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-divider pb-2 focus:outline-none focus:border-primary transition-colors text-text font-cormorant text-[24px] tracking-wide placeholder-text/20" placeholder="professional@example.com" />
              </div>

              <div className="space-y-4">
                <label className="font-label text-text/50 text-[11px] uppercase tracking-[0.3em]">Experience Level</label>
                <select className="w-full bg-transparent border-b border-divider pb-4 focus:outline-none focus:border-primary transition-colors text-text/80 font-cormorant text-[24px] cursor-none tracking-wide">
                  <option value="" disabled selected>Select Your Rank</option>
                  <option value="Beginner" className="bg-[#111]">Beginner Coach</option>
                  <option value="Intermediate" className="bg-[#111]">Intermediate Coach</option>
                  <option value="Advanced" className="bg-[#111]">Advanced Coach</option>
                  <option value="FIDE" className="bg-[#111]">FIDE Rated</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="font-label text-text/50 text-[11px] uppercase tracking-[0.3em]">FIDE ID (Optional)</label>
                <input type="text" className="w-full bg-transparent border-b border-divider pb-2 focus:outline-none focus:border-primary transition-colors text-text font-cormorant text-[24px] tracking-wide placeholder-text/20" placeholder="e.g. 1503014" />
              </div>

              <div className="space-y-4 pt-4">
                <label className="font-label text-text/50 text-[11px] uppercase tracking-[0.3em]">Brief Bio</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-divider py-2 focus:outline-none focus:border-primary transition-colors text-text font-body font-light text-[15px] resize-none leading-[1.8] placeholder-text/20" placeholder="Detail your pedagogical approach and achievements..." />
              </div>

              <Button type="button" size="lg" className="btn-luxury w-full border-primary font-nav text-[12px] uppercase tracking-[0.25em] h-16 mt-8">
                Submit Application
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
