import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const courses = [
    {
      title: "Beginner",
      duration: "3 Months",
      pricing: "$49/mo",
      description: "Perfect for kids who are just starting out. Learn the rules, board vision, and basic checkmates.",
      curriculum: [
        "Piece movements & values",
        "Rules: Castling, En Passant",
        "Basic opening principles",
        "Simple checkmate patterns",
      ]
    },
    {
      title: "Intermediate",
      duration: "6 Months",
      pricing: "$79/mo",
      description: "For players with basic knowledge ready to learn strategy, tactics, and middle-game planning.",
      curriculum: [
        "Advanced tactics (pins, forks, skewers)",
        "Opening repertoire fundamentals",
        "Middle-game planning",
        "Basic endgame concepts",
      ]
    },
    {
      title: "Advanced",
      duration: "12 Months",
      pricing: "$129/mo",
      description: "Intensive training for serious players looking to compete in national tournaments.",
      curriculum: [
        "Positional evaluation",
        "Complex endgame theory",
        "Tournament psychology",
        "Grandmaster game analysis",
      ]
    },
    {
      title: "Group Classes",
      duration: "Ongoing",
      pricing: "$39/mo",
      description: "Regular sessions focusing on collaborative learning, practice games, and puzzle solving.",
      curriculum: [
        "Weekly thematic lessons",
        "Supervised practice games",
        "Group puzzle solving",
        "Monthly internal tournaments",
      ]
    },
    {
      title: "1-on-1 Coaching",
      duration: "Flexible",
      pricing: "$50/hour",
      description: "Personalized attention from titled coaches designed to target specific weaknesses.",
      curriculum: [
        "Customized study plan",
        "Deep game analysis",
        "Opening repertoire tailored to style",
        "Direct access to coach",
      ]
    }
  ];

  return (
    <div className="bg-offwhite min-h-screen pt-20 pb-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[400px] md:h-[500px] mb-16 rounded-sm overflow-hidden shadow-2xl">
          <Image 
            src="/watercolor_chess_pieces.png" 
            alt="Watercolor Chess Pieces" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(250,248,244,0.3)] to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[rgba(250,248,244,0.3)] to-transparent z-0 pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            <h1 className="text-5xl md:text-7xl font-hero text-navy uppercase tracking-[0.08em] font-light drop-shadow-[0_0_40px_rgba(201,168,76,0.3)] mb-6">
              Our Courses
            </h1>
            <p className="text-xl md:text-2xl text-navy/70 font-quote italic max-w-3xl font-medium tracking-[1px]">
              Structured learning paths designed by experts to take you from absolute beginner to tournament champion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const isFeatured = index === 2; // Make Advanced course featured
            return (
              <Card key={index} className={cn("flex flex-col bg-white rounded-sm border transition-all duration-300 card-hover-lift relative overflow-hidden", isFeatured ? "border-gold border-[2px]" : "border-divider")}>
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-gold text-white font-nav text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                    Featured
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl font-cormorant font-normal text-navy">{course.title}</CardTitle>
                    <Badge variant="outline" className="text-navy border-divider font-nav text-[10px] uppercase tracking-wider rounded-sm">{course.duration}</Badge>
                  </div>
                  <CardDescription className="text-base h-16 font-body text-charcoal/70">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-3xl font-cormorant italic text-gold">{course.pricing}</span>
                  </div>
                  <h4 className="font-nav text-[11px] uppercase tracking-[0.18em] text-navy/70 mb-4">Curriculum</h4>
                  <ul className="space-y-3">
                    {course.curriculum.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-gold mr-3 shrink-0" />
                        <span className="text-[15px] font-body text-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/demo" className="w-full">
                    <Button className="w-full rounded-sm btn-luxury hover:bg-navy hover:text-white border-navy text-navy font-nav uppercase tracking-[2px] transition-colors" size="lg">Book Free Demo</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
