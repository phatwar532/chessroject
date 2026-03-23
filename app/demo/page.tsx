"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";

const demoSchema = z.object({
  parentName: z.string().min(2, "Name is required"),
  childName: z.string().min(2, "Child's name is required"),
  age: z.string().min(1, "Age is required"),
  phone: z.string().min(10, "Valid phone number required"),
  skillLevel: z.string().min(1, "Skill level is required"),
});

type DemoFormData = z.infer<typeof demoSchema>;

export default function DemoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = (data: DemoFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const waMessage = `Hi Chaturangveda! I would like to book a free demo.\n*Parent:* ${data.parentName}\n*Child:* ${data.childName} (Age: ${data.age})\n*Level:* ${data.skillLevel}`;
      const waUrl = `https://wa.me/15551234567?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, "_blank");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Book Your Free Demo</h1>
          <p className="text-lg text-muted-foreground">
            Experience our world-class coaching firsthand. No commitment required.
          </p>
        </div>

        <Card className="border-border shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Student Details</CardTitle>
            <CardDescription>We&apos;ll reach out via WhatsApp to schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent&apos;s Name</Label>
                  <Input id="parentName" placeholder="John Doe" {...register("parentName")} className={errors.parentName ? "border-red-500" : ""} />
                  {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="childName">Student&apos;s Name</Label>
                  <Input id="childName" placeholder="Jane Doe" {...register("childName")} className={errors.childName ? "border-red-500" : ""} />
                  {errors.childName && <p className="text-red-500 text-xs">{errors.childName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Student&apos;s Age</Label>
                  <Input id="age" type="number" placeholder="8" min="4" max="18" {...register("age")} className={errors.age ? "border-red-500" : ""} />
                  {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Current Skill Level</Label>
                <select 
                  id="skillLevel" 
                  {...register("skillLevel")}
                  className={`flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.skillLevel ? "border-red-500" : ""}`}
                >
                  <option value="">Select level...</option>
                  <option value="Absolute Beginner">Absolute Beginner (Knows nothing)</option>
                  <option value="Beginner">Beginner (Knows piece movements)</option>
                  <option value="Intermediate">Intermediate (Plays regularly online)</option>
                  <option value="Advanced">Advanced (Has tournament experience)</option>
                </select>
                {errors.skillLevel && <p className="text-red-500 text-xs">{errors.skillLevel.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full rounded-xl text-lg h-14" disabled={isSubmitting}>
                {isSubmitting ? "Connecting..." : (
                  <span className="flex items-center">
                    Proceed to WhatsApp <ExternalLink className="ml-2 w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
