"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  href?: string;
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  children,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-6 transition-all duration-500",
        "hover:bg-accent/50 hover:border-accent",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-transparent" style={{ padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      </div>

      <div className="relative z-10">
        {icon && (
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-accent-foreground group-hover:text-foreground transition-colors">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 auto-rows-fr",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

// Feature card with image/preview
interface FeatureCardProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  gradient?: string;
}

export function FeatureCard({
  title,
  description,
  className,
  children,
  gradient = "from-purple-500/20 to-blue-500/20",
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border transition-all duration-500",
        "hover:bg-accent/50 hover:border-accent hover:shadow-2xl hover:shadow-black/20",
        className
      )}
    >
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", gradient)} />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

// Showcase/Preview card
interface ShowcaseCardProps {
  title: string;
  description?: string;
  image?: string;
  className?: string;
  tags?: string[];
}

export function ShowcaseCard({
  title,
  description,
  image,
  className,
  tags,
}: ShowcaseCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border transition-all duration-500",
        "hover:bg-accent/50 hover:border-accent",
        className
      )}
    >
      {/* Image preview area */}
      {image ? (
        <div className="aspect-video w-full bg-muted overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
