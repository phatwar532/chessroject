import { Trophy, TrendingUp, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AchievementsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Our Legacy of Success</h1>
        <p className="text-xl text-muted-foreground">
          We measure our success by the growth of our students. From first local tournaments to national championships.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Card className="bg-primary text-primary-foreground border-none shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Trophy className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="text-4xl font-bold mb-2">50+</h3>
            <p className="text-lg opacity-90">Tournament Wins</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 text-white border-none shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <TrendingUp className="w-12 h-12 mb-4 text-accent" />
            <h3 className="text-4xl font-bold mb-2">250+</h3>
            <p className="text-lg opacity-90">Avg Elo Rating Increase</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center text-foreground">
            <Medal className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-4xl font-bold mb-2">10</h3>
            <p className="text-lg text-muted-foreground">Titled Students Produced</p>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Placeholder */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Tournament Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center border border-dashed border-slate-300">
              <span className="text-sm text-slate-400">Gallery Image {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">What Parents Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { quote: "My son's focus in school improved dramatically after just 3 months of chess classes here. Highly recommended!", author: "Sarah P." },
            { quote: "The coaches are incredibly patient and skilled. My daughter won her first local tournament last week!", author: "Michael T." }
          ].map((testimonial, i) => (
            <Card key={i} className="bg-slate-50 border-none">
              <CardContent className="p-8">
                <p className="text-lg italic text-muted-foreground mb-6">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold text-foreground">- {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
