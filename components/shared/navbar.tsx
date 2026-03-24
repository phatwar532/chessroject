"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/services", label: "Services" },
    { href: "/coaches", label: "Coaches" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ];

  const isHome = pathname === "/";
  const isDarkBg = isHome && !scrolled;

  const navVariants = {
    top: {
      backgroundColor: isHome ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(12px)",
      borderColor: isHome ? "rgba(255, 255, 255, 0.15)" : "rgba(26, 63, 168, 0.08)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0)",
      y: 0,
      opacity: 1,
      x: "-50%"
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(24px)",
      borderColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0 20px 40px rgba(26, 63, 168, 0.1)",
      y: 0,
      opacity: 1,
      x: "-50%"
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0, x: "-50%" }}
        animate={scrolled ? "scrolled" : "top"}
        variants={navVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-1/2 z-50 w-[95%] max-w-[1200px] rounded-full border px-4 py-3 flex items-center justify-between"
      >
        <Link 
          href="/" 
          className={`flex-shrink-0 flex items-center pr-6 transition-all duration-300 ${isDarkBg ? "bg-white/95 rounded-full px-4 py-1.5 ml-1 shadow-[0_5px_20px_rgba(255,255,255,0.15)]" : "pl-2"}`}
        >
          <img 
            src="/logo.png" 
            alt="Chaturangveda Academy" 
            className="h-11 w-auto object-contain transition-all duration-300 mix-blend-multiply"
          />
        </Link>
        
        <div 
          className="hidden lg:flex items-center gap-1 flex-1 justify-center relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href || (pathname !== '/' && link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative px-6 py-2.5 rounded-full transition-colors font-nav text-[0.75rem] uppercase tracking-[0.15em] font-black outline-none"
              >
                {/* Hover Background Pill */}
                {hoveredIndex === i && !isActive && (
                  <motion.div
                    layoutId="navbar-hover"
                    className={`absolute inset-0 rounded-full z-0 ${isDarkBg ? "bg-white/10" : "bg-[#1a3fa8]/5"}`}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}

                {/* Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-[#0f1e4a] rounded-full z-0 shadow-[0_4px_12px_rgba(15,30,74,0.3)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                {/* Text Layer */}
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive 
                    ? "text-white" 
                    : (isDarkBg ? "text-white/80 hover:text-white drop-shadow-sm" : "text-[#0f1e4a] hover:text-[#1a3fa8]")
                }`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex flex-shrink-0 pl-6">
          <Link 
            href="#trial" 
            className="relative overflow-hidden bg-gradient-to-r from-[#f59e0b] to-[#d98b0a] text-[#0f1e4a] font-nav font-black uppercase tracking-widest text-[0.75rem] px-8 py-3.5 rounded-full transition-all shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.4)] hover:-translate-y-[1px] group/navbtn flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Trial <ArrowRight className="w-4 h-4 group-hover/navbtn:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/navbtn:animate-[shimmer_1.5s_infinite]" />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-2 rounded-full transition-colors ${isDarkBg ? "text-white hover:bg-white/20" : "text-[#0f1e4a] hover:bg-black/5"}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 left-0 w-full bg-white/95 backdrop-blur-3xl z-40 lg:hidden flex flex-col pt-32 px-6"
          >
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto relative z-10">
              {navLinks.map((link, i) => {
                 const isActive = pathname === link.href || (pathname !== '/' && link.href !== '/' && pathname.startsWith(link.href));
                 return (
                   <motion.div
                     key={link.href}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.1 + (i * 0.05), ease: "easeOut" }}
                   >
                     <Link
                       href={link.href}
                       onClick={() => setIsOpen(false)}
                       className={`font-hero text-[1.8rem] font-bold px-8 py-4 rounded-3xl w-full transition-all flex items-center justify-between border ${
                         isActive 
                           ? "bg-[#0f1e4a] text-white border-transparent shadow-[0_10px_30px_rgba(15,30,74,0.3)]" 
                           : "text-[#0f1e4a] bg-gray-50/50 hover:bg-[#1a3fa8]/5 border-gray-200 hover:border-[#1a3fa8]/20"
                       }`}
                     >
                       {link.label}
                       {isActive && <ArrowRight className="w-6 h-6" />}
                     </Link>
                   </motion.div>
                 )
              })}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: "easeOut" }}
                className="pt-8 mt-4 border-t border-gray-200"
              >
                <Link 
                  href="#trial" 
                  onClick={() => setIsOpen(false)}
                  className="relative overflow-hidden block w-full text-center bg-gradient-to-r from-[#f59e0b] to-[#d98b0a] text-[#0f1e4a] font-nav font-black uppercase tracking-widest text-[1rem] px-6 py-5 rounded-3xl shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all group/mobbtn flexjustify-center items-center"
                >
                  <span className="relative z-10">Book Free Trial</span>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/mobbtn:animate-[shimmer_1.5s_infinite]" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
