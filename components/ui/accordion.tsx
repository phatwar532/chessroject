"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-divider py-6">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left font-cormorant text-2xl focus:outline-none group hover:text-primary transition-colors"
      >
        <span className="italic text-primary/90">{question}</span>
        <Plus 
          className={cn(
            "h-6 w-6 text-primary transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]", 
            isOpen && "rotate-45"
          )} 
        />
      </button>
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] text-[#a3a3a3]",
          isOpen ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="pb-4 font-body text-[16px] font-light leading-[1.9]">{answer}</p>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
