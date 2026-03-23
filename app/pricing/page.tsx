import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Novice",
      price: "$49",
      period: "/month",
      description: "Ideal for beginners learning the fundamentals.",
      features: [
        "4 group classes per month",
        "Access to beginner puzzles",
        "Monthly progress report",
        "Email support",
      ],
      highlight: false,
    },
    {
      name: "Competitor",
      price: "$99",
      period: "/month",
      description: "For players looking to rapidly increase their rating.",
      features: [
        "8 group classes per month",
        "1 private coaching session",
        "Unlimited puzzle database",
        "Weekly game analysis",
        "Tournament preparation",
      ],
      highlight: true,
    },
    {
      name: "Masterclass",
      price: "$199",
      period: "/month",
      description: "Intensive training for aspiring masters.",
      features: [
        "Unlimited group classes",
        "4 private coaching sessions",
        "Grandmaster opening repertoire",
        "In-depth tournament analysis",
        "24/7 priority support",
      ],
      highlight: false,
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 bg-slate-50/50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Invest in your child&apos;s cognitive development. Choose the perfect plan for their chess journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <Card key={i} className={`relative overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300 ${plan.highlight ? 'border-primary shadow-2xl scale-105 z-10' : 'border-border shadow-md mt-4 mb-4 md:mt-8 md:mb-8'}`}>
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />
            )}
            <CardHeader className="text-center pb-8 pt-10">
              {plan.highlight && <span className="text-sm font-bold text-primary tracking-widest uppercase mb-4 block">Most Popular</span>}
              <CardTitle className="text-3xl font-bold text-foreground mb-4">{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>
              <CardDescription className="mt-4 text-base">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-foreground/80">
                    <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-8 pb-10">
              <Link href="/demo" className="w-full">
                <Button variant={plan.highlight ? "default" : "outline"} className="w-full h-12 text-lg rounded-xl">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
