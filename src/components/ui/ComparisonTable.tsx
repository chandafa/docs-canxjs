"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonMetric {
  name: string;
  canx: string | boolean;
  express: string | boolean;
  laravel: string | boolean;
  nest: string | boolean;
}

const metrics: ComparisonMetric[] = [
  {
    name: "Requests / Second",
    canx: "250,000+",
    express: "~15,000",
    laravel: "~2,000",
    nest: "~12,000",
  },
  {
    name: "Startup Time",
    canx: "< 50ms",
    express: "~200ms",
    laravel: "~500ms",
    nest: "~1000ms",
  },
  {
    name: "Type Safety",
    canx: true,
    express: false,
    laravel: true,
    nest: true,
  },
  {
    name: "Native WebSocket",
    canx: true,
    express: false,
    laravel: false,
    nest: true,
  },
  {
    name: "HotWire Protocol",
    canx: true,
    express: false,
    laravel: false,
    nest: false,
  },
  {
    name: "Bundle Size",
    canx: "< 30MB",
    express: "Variable",
    laravel: "> 100MB",
    nest: "> 50MB",
  },
];

export function ComparisonTable() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-4 font-medium text-muted-foreground">Feature</th>
              <th className="p-4 font-bold text-foreground bg-primary/10 border-b-2 border-primary">
                CanxJS
              </th>
              <th className="p-4 font-medium text-muted-foreground">Express.js</th>
              <th className="p-4 font-medium text-muted-foreground">Laravel</th>
              <th className="p-4 font-medium text-muted-foreground">NestJS</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => (
              <tr
                key={metric.name}
                className={cn(
                  "border-b border-border transition-colors hover:bg-muted/50",
                  index === metrics.length - 1 && "border-0"
                )}
              >
                <td className="p-4 font-medium text-foreground">{metric.name}</td>
                <td className="p-4 font-bold text-foreground bg-primary/5">
                  <ValueDisplay value={metric.canx} isPrimary />
                </td>
                <td className="p-4 text-muted-foreground">
                  <ValueDisplay value={metric.express} />
                </td>
                <td className="p-4 text-muted-foreground">
                  <ValueDisplay value={metric.laravel} />
                </td>
                <td className="p-4 text-muted-foreground">
                  <ValueDisplay value={metric.nest} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ValueDisplay({
  value,
  isPrimary = false,
}: {
  value: string | boolean;
  isPrimary?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex items-center gap-2">
        <Check
          className={cn(
            "w-4 h-4",
            isPrimary ? "text-green-500" : "text-muted-foreground"
          )}
        />
        {isPrimary && <span className="text-green-500 text-xs">Included</span>}
      </div>
    ) : (
      <Minus className="w-4 h-4 text-muted-foreground" />
    );
  }
  return <span className={cn(isPrimary && "text-primary font-semibold")}>{value}</span>;
}
