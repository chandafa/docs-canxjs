import { notFound } from "next/navigation";
import Link from "next/link";
import { learningPaths } from "@/lib/learning-paths";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, BookOpen, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LearningPathPage({ params }: PageProps) {
  const { slug } = await params;
  const path = learningPaths.find((p) => p.slug === slug);

  if (!path) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/learn" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Learning Center
          </Link>
          <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={cn(
                  "px-3 py-1",
                  path.difficulty === "Beginner" && "border-green-500/50 text-green-400 bg-green-500/10",
                  path.difficulty === "Intermediate" && "border-blue-500/50 text-blue-400 bg-blue-500/10",
                  path.difficulty === "Advanced" && "border-purple-500/50 text-purple-400 bg-purple-500/10"
                )}>
                  {path.difficulty}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {path.estimatedTime}
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">{path.title}</h1>
              <p className="text-lg text-muted-foreground">{path.description}</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-border -z-10" />

          <div className="space-y-12">
            {path.steps.map((step, index) => (
              <div key={step.title} className="relative pl-24 group">
                {/* Step Number Bubble */}
                <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-xl font-bold text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors shadow-sm">
                  {index + 1}
                </div>

                <div className="bg-card/50 border border-white/[0.05] rounded-xl p-6 hover:bg-card/80 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      <Link href={step.link}>
                        <Button variant="secondary" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Start Lesson
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    {step.duration && (
                      <Badge variant="secondary" className="bg-secondary/50">
                        {step.duration}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Completion */}
            <div className="relative pl-24">
              <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="py-4">
                <h3 className="text-xl font-semibold text-green-400">Path Completion</h3>
                <p className="text-muted-foreground">You'll have a production-ready application!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
