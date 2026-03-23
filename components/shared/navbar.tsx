"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60) {
        setIsScrolled(true);
        document.querySelector('header')?.classList.add('scrolled');
      } else {
        setIsScrolled(false);
        document.querySelector('header')?.classList.remove('scrolled');
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/curriculum", label: "Curriculum" },
    { href: "/coaches", label: "Coaches" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300 ease-out h-[80px] flex items-center shadow-[0_1px_24px_rgba(11,26,46,0.07)]",
        isHidden ? "-translate-y-full" : "translate-y-0",
        "bg-white"
      )}
    >
      <div className="w-full px-[48px] h-full flex items-center justify-between">
        
        {/* LOGO LEFT */}
        <Link href="/" className="flex items-center shrink-0 w-[200px]">
          <img
            src="/logo.png"
            alt="Chaturangveda Academy"
            className="h-[44px] md:h-[60px] w-auto object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
        </Link>

        {/* Desktop Navigation CENTER */}
        <nav className="hidden md:flex items-center justify-center gap-[40px] flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "nav-link-hover text-[13px] uppercase tracking-[0.14em] font-nav font-[400] transition-colors relative text-[#0B1A2E] hover:text-[#0B1A2E]",
                pathname === route.href ? "active" : ""
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Button RIGHT */}
        <div className="hidden md:flex items-center shrink-0 w-[200px] justify-end">
          <Link href="/contact">
            <Button className="btn-luxury btn-filled px-[28px] py-[14px] rounded-none uppercase tracking-[0.16em] text-[11px] font-nav h-auto bg-navy text-white hover:bg-gold hover:text-navy transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-navy hover:text-primary transition-colors">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed top-[80px] left-0 w-full bg-white border-b border-divider z-40 transition-all duration-300 origin-top flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      )}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "py-4 px-6 text-sm uppercase tracking-[2px] font-nav transition-colors border-b border-divider/50 hover:bg-ivory text-[#0B1A2E]",
              pathname === route.href ? "text-[#C9A84C] active" : "text-[#0B1A2E]"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
