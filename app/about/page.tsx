import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm bg-primary/10 text-primary">Our Story</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">The New Era in Teaching Chess</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Chaturangveda was born out of a passion to revolutionize how the ancient game of chess is taught to the modern mind. We believe chess is more than a game; it is a profound educational tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <Card className="border-none shadow-lg bg-primary text-primary-foreground">
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                To build a generation of logical thinkers, resilient competitors, and strategic leaders through the mastery of the 64 squares. We envision a world where every child has access to the cognitive benefits of structured chess training.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-md bg-white">
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide world-class, accessible, and highly engaging chess education. By combining traditional grandmaster techniques with modern pedagogical methodologies, we ensure every student unlocks their true intellectual potential.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Unique Methodology</h2>
          <div className="space-y-8">
            {[
              {
                title: "Pattern Recognition First",
                desc: "Instead of memorizing long variations, we teach students to identify underlying patterns. This builds intuition and speeds up calculation.",
                step: "01"
              },
              {
                title: "Active Learning & Scrimmage",
                desc: "Theory is immediately applied on the board. We limit lectures and maximize guided practice games, analyzing mistakes in real-time.",
                step: "02"
              },
              {
                title: "Psychological Resilience",
                desc: "Chess teaches that losing is learning. We actively coach students on how to manage emotions after a blunder, building grit that translates to real life.",
                step: "03"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start md:items-center bg-white p-8 rounded-3xl border border-border shadow-sm">
                <div className="text-6xl font-black text-primary/10 mr-8 mb-4 md:mb-0 select-none">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
