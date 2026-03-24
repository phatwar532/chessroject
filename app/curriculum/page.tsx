"use client";
import React from "react";
import Link from "next/link";

export default function CurriculumPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND SVG */}
      <svg viewBox="0 0 24 24" className="chess-engraving h-[100vh] w-[100vh] right-[10%] top-[5%] opacity-[0.05] z-0">
        <path d="M12 2C11.5 2 11 2.5 11 3V5C11 5.5 11.5 6 12 6C12.5 6 13 5.5 13 5V3C13 2.5 12.5 2 12 2ZM9 6L8 8C7 10 7.5 13 12 15C16.5 13 17 10 16 8L15 6L14 7L12 5L10 7L9 6ZM8 16V18H16V16H8ZM6 19V22H18V19H6Z" />
      </svg>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center pt-[160px] pb-[80px] px-[24px] z-10 w-full text-center">
        <h1 className="font-hero font-[600] text-[color:var(--text-1)] uppercase tracking-[0.1em] text-[clamp(2.5rem,6vw,4rem)]">
          CURRICULUM
        </h1>
      </section>

      {/* TRACKS SECTION */}
      <section className="pb-[120px] px-[24px] md:px-[48px] max-w-[1400px] mx-auto w-full relative z-10">
        <div className="text-center mb-[64px]">
          <span className="label">LEARNING TRACKS</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-[500] text-[color:var(--text-1)] mb-12">Curriculum Tracks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          
          <div className="glass-card flex flex-col p-[32px]" style={{ borderLeft: "2px solid rgba(201,168,76,0.45)" }}>
            <div className="inline-block rounded-full px-4 py-1 font-body text-[0.65rem] tracking-[0.2em] font-[600] uppercase mb-[24px] bg-[rgba(255,255,255,0.06)] text-[color:var(--text-1)] w-max">
              BEGINNER
            </div>
            <h3 className="font-hero text-[1.4rem] font-[500] text-[color:var(--text-1)] mb-[24px]">Chess Foundations</h3>
            <ul className="flex flex-col gap-[16px] text-left mb-[48px] flex-1">
              {["Piece movement & values", "Basic checkmates (K+Q vs K, etc)", "Opening principles", "Tactical motifs (Pins, forks)", "Recording games (Notation)"].map((topic, j) => (
                <li key={j} className="font-body text-[0.88rem] text-[color:var(--text-2)] flex items-start gap-3">
                    <span className="text-[color:var(--gold)] text-[0.8rem] mt-1">✦</span> {topic}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary w-full text-center">ENROLL NOW</Link>
          </div>

          <div className="glass-card flex flex-col p-[32px]" style={{ borderLeft: "2px solid rgba(201,168,76,0.45)" }}>
            <div className="inline-block rounded-full px-4 py-1 font-body text-[0.65rem] tracking-[0.2em] font-[600] uppercase mb-[24px] bg-[rgba(255,255,255,0.06)] text-[color:var(--text-1)] w-max">
              INTERMEDIATE
            </div>
            <h3 className="font-hero text-[1.4rem] font-[500] text-[color:var(--text-1)] mb-[24px]">Tactical Mastery</h3>
            <ul className="flex flex-col gap-[16px] text-left mb-[48px] flex-1">
              {["Advanced tactics & calculations", "Pawn structures", "Essential endgame strategy", "Positional evaluation", "Building opening repertoires"].map((topic, j) => (
                <li key={j} className="font-body text-[0.88rem] text-[color:var(--text-2)] flex items-start gap-3">
                    <span className="text-[color:var(--gold)] text-[0.8rem] mt-1">✦</span> {topic}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary w-full text-center">ENROLL NOW</Link>
          </div>

          <div className="glass-card flex flex-col p-[32px]" style={{ borderLeft: "2px solid rgba(201,168,76,0.45)" }}>
            <div className="inline-block rounded-full px-4 py-1 font-body text-[0.65rem] tracking-[0.2em] font-[600] uppercase mb-[24px] bg-[rgba(201,168,76,0.15)] text-[color:var(--gold)] w-max">
              ADVANCED
            </div>
            <h3 className="font-hero text-[1.4rem] font-[500] text-[color:var(--text-1)] mb-[24px]">Competitive Excellence</h3>
            <ul className="flex flex-col gap-[16px] text-left mb-[48px] flex-1">
              {["Complex endgame studies", "Deep preparation & novelties", "Psychology in competition", "Grandmaster game analysis", "Time management techniques"].map((topic, j) => (
                <li key={j} className="font-body text-[0.88rem] text-[color:var(--text-2)] flex items-start gap-3">
                    <span className="text-[color:var(--gold)] text-[0.8rem] mt-1">✦</span> {topic}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary w-full text-center">ENROLL NOW</Link>
          </div>

        </div>
      </section>

    </div>
  );
}
