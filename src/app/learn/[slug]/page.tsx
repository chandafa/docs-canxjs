"use client";

import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { tutorialData } from "../data";
import { CodeBlock } from "@/components/ui/code-block";
import { PageTransition } from "@/components/layout/PageTransition";
import ReactMarkdown from "react-markdown";

import { use } from "react";

export default function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tutorial = tutorialData[slug as keyof typeof tutorialData];

  if (!tutorial) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link 
          href="/learn"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Center
        </Link>
        
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {tutorial.level}
                </Badge>
                <div className="flex items-center text-sm text-zinc-500">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {tutorial.duration}
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {tutorial.title}
            </h1>
            <p className="text-xl text-zinc-400">
                {tutorial.description}
            </p>
        </div>

        <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-pre:p-0 prose-pre:bg-transparent">
            {/* 
               We are rendering the content manually to apply our custom CodeBlock component.
               In a real CMS we might use a markdown parser that supports custom components.
               For this static data, we simple splitting is sufficient or just direct rendering.
            */}
             {tutorial.content.split('```').map((part, index) => {
                if (index % 2 === 0) {
                    // Regular text (markdown)
                    return (
                        <div key={index} className="whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed child-p:mb-4 child-h2:text-2xl child-h2:font-bold child-h2:mt-8 child-h2:mb-4 child-h2:text-white">
                           <ReactMarkdown components={{
                               h1: ({node, ...props}) => <h1 hidden {...props as any} />,
                               h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props as any} />,
                               p: ({node, ...props}) => <p className="mb-4 text-zinc-300" {...props as any} />,
                               ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-300" {...props as any} />,
                               li: ({node, ...props}) => <li className="ml-4" {...props as any} />,
                           }}>
                               {part}
                           </ReactMarkdown>
                        </div>
                    );
                } else {
                    // Code block
                    // The part string usually starts with language name, e.g. "typescript\ncode..."
                    const [lang, ...codeLines] = part.split('\n');
                    const code = codeLines.join('\n');
                    return (
                        <div key={index} className="my-6 not-prose">
                             <CodeBlock language={lang.trim() || 'typescript'} code={code.trim()} />
                        </div>
                    );
                }
            })}
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex justify-between items-center">
             <div>
                 <p className="text-muted-foreground text-sm">Have questions?</p>
                 <Link href="https://github.com/canxjs/canxjs/discussions" className="text-primary hover:underline">
                     Join the discussion on GitHub
                 </Link>
             </div>
             <Button variant="outline" className="gap-2">
                 <CheckCircle className="w-4 h-4" />
                 Mark as Completed
             </Button>
        </div>
      </div>
    </PageTransition>
  );
}
