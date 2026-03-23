"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const luxuryEase = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    
    gsap.fromTo(".page-title", 
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: luxuryEase, delay: 0.2 }
    );

    gsap.fromTo(".fade-up", 
      { y: 28, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: "top 85%" },
        y: 0, opacity: 1, duration: 0.8, ease: luxuryEase, stagger: 0.1, delay: 0.2
      }
    );
  }, { scope: container });

  return (
    <div className="flex flex-col min-h-screen bg-[#0D1B2A] pt-[80px]" ref={container}>
      
      {/* Hero */}
      <section className="relative h-[30vh] md:h-[40vh] flex flex-col items-center justify-center border-b border-[#C9A84C]/20 bg-[#0D1B2A] overflow-hidden">
        <h1 className="page-title text-white font-cormorant text-[56px] md:text-[80px] uppercase tracking-[0.15em] text-center px-4 relative z-10 font-[300]">
          CONTACT
        </h1>
        <div className="w-[120px] h-[1px] bg-[#C9A84C] mt-8" />
      </section>

      <div className="container mx-auto px-[24px] md:px-[48px] max-w-7xl py-[60px] md:py-[120px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] md:gap-[64px] overflow-hidden">
          
          {/* Layout Left: Client Services */}
          <div className="fade-up relative flex flex-col justify-center">
            
            <h2 className="font-nav text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase mb-[24px]">CLIENT SERVICES</h2>
            <h3 className="font-cormorant italic text-[40px] md:text-[48px] text-white mb-[48px] leading-[1.2]">Get In Touch</h3>

            <div className="space-y-[48px]">
              <div>
                <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-white/50 border-b border-white/10 pb-[16px] block mb-[24px] w-[180px]">Telephone</span>
                <p className="font-cormorant text-[28px] text-white cursor-none tracking-wide font-[400] hover:text-[#C9A84C] transition-colors duration-300">
                  +91 7569194709 <br/> 
                  <span className="inline-block mt-[8px]">+91 8919174512</span>
                </p>
              </div>

              <div>
                <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-white/50 border-b border-white/10 pb-[16px] block mb-[24px] w-[180px]">Electronic Mail</span>
                <p className="font-body font-[300] text-[20px] text-white cursor-none tracking-widest hover:text-[#C9A84C] transition-colors duration-300">
                  chaturangveda@gmail.com
                </p>
              </div>

              <div>
                <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-white/50 border-b border-white/10 pb-[16px] block mb-[24px] w-[180px]">Hours of Operation</span>
                <ul className="space-y-[16px] font-body font-[300] text-[15px] text-white/80">
                  <li className="flex justify-between max-w-sm">
                    <span className="tracking-wide">Monday - Friday</span>
                    <span className="text-white font-[400]">4:00 PM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between max-w-sm">
                    <span className="tracking-wide">Saturday</span>
                    <span className="text-white font-[400]">10:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between max-w-sm pt-[16px] border-t border-white/10">
                    <span className="tracking-wide">Sunday</span>
                    <span className="font-quote italic text-[#C9A84C]">Closed (Tournament Days)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Layout Right: Direct Inquiry Form */}
          <div className="fade-up relative flex flex-col justify-center">
            <h2 className="font-nav text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase mb-[24px]">DIRECT INQUIRY</h2>
            <h3 className="font-cormorant italic text-[40px] md:text-[48px] text-white mb-[48px]">Send a Message</h3>
            
            <form className="space-y-[24px]" onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted systematically."); }}>
              <div className="space-y-2">
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,76,0.3)] px-[24px] py-[16px] focus:outline-none focus:border-[#C9A84C] transition-colors text-white font-body font-[300] tracking-wide text-[16px] placeholder-white/40" 
                  placeholder="Name" 
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,76,0.3)] px-[24px] py-[16px] focus:outline-none focus:border-[#C9A84C] transition-colors text-white font-body font-[300] tracking-wide text-[16px] placeholder-white/40" 
                  placeholder="Email" 
                />
              </div>

              <div className="space-y-2">
                <input 
                  type="text" 
                  id="subject" 
                  required 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,76,0.3)] px-[24px] py-[16px] focus:outline-none focus:border-[#C9A84C] transition-colors text-white font-body font-[300] tracking-wide text-[16px] placeholder-white/40" 
                  placeholder="Subject" 
                />
              </div>

              <div className="space-y-2 pt-[16px]">
                <textarea 
                  id="msg" 
                  required 
                  rows={4} 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,76,0.3)] px-[24px] py-[16px] focus:outline-none focus:border-[#C9A84C] transition-colors text-white font-body font-[300] text-[16px] leading-[1.8] resize-none placeholder-white/40" 
                  placeholder="Message" 
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-[#C9A84C] text-[#0D1B2A] border-none font-nav text-[12px] uppercase tracking-[0.2em] h-[56px] mt-[16px] rounded-none hover:bg-white transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
