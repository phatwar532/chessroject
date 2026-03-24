"use client";
import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed', top: 0, left: 0,
        right: 0, height: '2px',
        background: '#C9A84C',
        transformOrigin: '0%',
        zIndex: 9999
      }}
    />
  );
}
