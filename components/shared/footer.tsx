"use client";
import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[color:var(--navy)] pt-[80px] pb-[40px] px-[24px] md:px-[48px] mt-auto relative z-10 border-t border-[rgba(37,99,235,0.2)]">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[48px] mb-[64px]">
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link href="/" className="mb-6 bg-white/5 p-4 rounded-xl backdrop-blur-md">
              <img src="/logo.png" alt="Chaturangveda Academy" className="w-[150px] h-auto object-contain mix-blend-multiply" />
            </Link>
            <p className="font-body text-[0.95rem] text-blue-100/70 leading-[1.7] mb-4">
              Where Strategy Meets Excellence. Fostering a deep love for chess and nurturing intellectual growth globally.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-body text-[0.8rem] text-[color:var(--gold)] font-bold tracking-[0.1em] uppercase mb-[24px]">Quick Links</h4>
            <div className="flex flex-col gap-[16px]">
              <Link href="/services" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">Services</Link>
              <Link href="/coaches" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">Coaches</Link>
              <Link href="/blog" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">Blog</Link>
              <Link href="/#faq" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">FAQ</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-body text-[0.8rem] text-[color:var(--gold)] font-bold tracking-[0.1em] uppercase mb-[24px]">Courses</h4>
            <div className="flex flex-col gap-[16px]">
              <Link href="/#programs" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">Beginner</Link>
              <Link href="/#programs" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">Intermediate</Link>
              <Link href="/#programs" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">Advanced</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-body text-[0.8rem] text-[color:var(--gold)] font-bold tracking-[0.1em] uppercase mb-[24px]">Contact</h4>
            <div className="flex flex-col gap-[16px]">
              <a href="mailto:chaturangveda@gmail.com" className="font-body text-[0.95rem] text-white hover:text-[color:var(--gold)] transition-colors">chaturangveda@gmail.com</a>
              <span className="font-body text-[0.95rem] text-white">+91 75691 94709<br/>+91 89191 74512</span>
              
              <div className="flex gap-4 mt-2">
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-blue-900/40 flex items-center justify-center text-white hover:bg-[color:var(--primary-blue)] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-blue-900/40 flex items-center justify-center text-white hover:bg-[color:var(--primary-blue)] transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-blue-900/40 flex items-center justify-center text-white hover:bg-[color:var(--primary-blue)] transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900/50 pt-[32px] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[0.9rem] text-blue-200/50">
            &copy; 2025 Chaturangveda Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-body text-[0.85rem] text-blue-200/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-body text-[0.85rem] text-blue-200/50 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
