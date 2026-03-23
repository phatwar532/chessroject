import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      title: "Why Chess is the Ultimate Mental Workout for Kids",
      excerpt: "Discover the specific cognitive benefits of chess, from improved memory retention to enhanced spatial reasoning skills.",
      date: "May 15, 2024",
      category: "Education",
      readTime: "5 min read"
    },
    {
      title: "Mastering the Middle Game: Top 3 Principles",
      excerpt: "The middle game is where the true battle happens. Learn the foundational principles that top players use to gain an advantage.",
      date: "May 02, 2024",
      category: "Strategy",
      readTime: "8 min read"
    },
    {
      title: "How to Recover from a Blunder Over the Board",
      excerpt: "Every player blunders. The difference between a master and an amateur is how quickly they recover psychologically.",
      date: "April 20, 2024",
      category: "Psychology",
      readTime: "6 min read"
    },
    {
      title: "Choosing Your First Chess Opening Repertoire",
      excerpt: "A practical guide for beginners on selecting solid, understandable openings that foster long-term improvement.",
      date: "April 05, 2024",
      category: "Openings",
      readTime: "10 min read"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Insights & Strategies</h1>
        <p className="text-xl text-muted-foreground">
          Articles, guides, and updates from the Chaturangveda coaching team to help you improve on and off the board.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <Link href="#" key={index} className="group">
            <Card className="h-full border-border/50 shadow-sm transition-all hover:shadow-lg hover:border-primary/50 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-primary border-primary/20">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-2">{post.date}</div>
              </CardHeader>
              <CardContent className="mt-auto">
                <CardDescription className="text-base text-foreground/70 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
                <div className="mt-6 font-semibold text-primary group-hover:underline">
                  Read Full Article →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
