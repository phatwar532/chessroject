"use client";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navy px-[24px] md:px-[48px] pt-[80px] pb-[40px] relative overflow-hidden flex-shrink-0 w-full z-10">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      <div className="w-full absolute top-0 left-0 h-[1px] bg-gold" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16">
          <div className="max-w-xs shrink-0 mx-auto text-center lg:mx-0 lg:text-left">
            <Link href="/" className="inline-block mb-6">
              <img src="/logo.png" alt="Chaturangveda Academy" className="w-[120px] h-auto object-contain mx-auto lg:mx-0" />
            </Link>
            <p className="font-body text-ivory/60 text-[14px] leading-[1.8]">
              Where Strategy Meets Excellence. Fostering a deep love for chess and nurturing intellectual growth globally.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 flex-1 lg:pl-16">
            <div className="flex flex-col text-center md:text-left">
              <h4 className="font-nav text-gold text-[11px] uppercase tracking-[0.16em] mb-[20px]">About</h4>
              <nav className="flex flex-col space-y-4 text-center md:text-left">
                <Link href="/brand" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Our Story</Link>
                <Link href="/coaches" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Coaches</Link>
                <Link href="/faq" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">FAQ</Link>
              </nav>
            </div>
            
            <div className="flex flex-col text-center md:text-left">
              <h4 className="font-nav text-gold text-[11px] uppercase tracking-[0.16em] mb-[20px]">Quick Links</h4>
              <nav className="flex flex-col space-y-4">
                <Link href="/services" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Services</Link>
                <Link href="/blog" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Blog</Link>
                <Link href="/privacy" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Privacy Policy</Link>
              </nav>
            </div>

            <div className="flex flex-col text-center md:text-left">
              <h4 className="font-nav text-gold text-[11px] uppercase tracking-[0.16em] mb-[20px]">Courses</h4>
              <nav className="flex flex-col space-y-4">
                <Link href="/curriculum" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Beginner</Link>
                <Link href="/curriculum" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Intermediate</Link>
                <Link href="/curriculum" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">Advanced</Link>
              </nav>
            </div>

            <div className="flex flex-col text-center md:text-left">
              <h4 className="font-nav text-gold text-[11px] uppercase tracking-[0.16em] mb-[20px]">Contact</h4>
              <nav className="flex flex-col space-y-4">
                <a href="mailto:chaturangveda@gmail.com" className="font-body text-platinum text-[14px] font-[300] hover:text-white transition-colors duration-200">chaturangveda@gmail.com</a>
                <span className="font-body text-platinum text-[14px] font-[300]">+91 7569194709</span>
              </nav>
            </div>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-platinum mb-8" />
        
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-full h-[1px] bg-[#C9A84C] mb-8" />
          <img src="/logo.png" alt="Chaturangveda Academy Logo" className="w-[80px] h-auto object-contain opacity-60" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-platinum text-[12px] font-[300]">
            &copy; {new Date().getFullYear()} Chaturangveda. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full border border-platinum flex items-center justify-center text-platinum hover:text-gold hover:border-gold transition-colors duration-200">
                <span className="sr-only">Social</span>
                <span className="text-[10px] block font-nav">in</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
