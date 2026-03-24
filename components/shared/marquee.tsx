"use client";
import React from "react";
import { motion } from "framer-motion";

export function InfiniteMarquee({ text, direction = "left", speed = 40 }: { text: string; direction?: "left" | "right"; speed?: number }) {
  const xValues = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden flex w-full pointer-events-none select-none absolute z-0 opacity-[0.03]">
      <motion.div
        animate={{ x: xValues }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex whitespace-nowrap min-w-[200vw]"
      >
        <div className="flex-[0_0_auto]">
          <span className="text-[clamp(8rem,20vw,25rem)] font-hero font-[800] tracking-tighter uppercase mr-[5vw] text-[#0f1e4a]">
            {text}
          </span>
          <span className="text-[clamp(8rem,20vw,25rem)] font-hero font-[800] tracking-tighter uppercase mr-[5vw] text-[#0f1e4a]">
            {text}
          </span>
          {/* Third copy ensuring seamless loop */}
          <span className="text-[clamp(8rem,20vw,25rem)] font-hero font-[800] tracking-tighter uppercase mr-[5vw] text-[#0f1e4a]">
            {text}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
