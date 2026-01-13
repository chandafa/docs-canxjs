"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/code-block"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
}

export function ComponentPreview({
  children,
  className,
  code,
  ...props
}: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border bg-background/50 dark:bg-neutral-900/50 p-4 shadow-sm md:p-6",
        className
      )}
      {...props}
    >
      <div className="flex min-h-[150px] w-full items-center justify-center gap-4 rounded-md border border-dashed p-10">
        {children}
      </div>
      <div className="relative">
        <div className="absolute top-0 right-0 p-2">
            {/* TODO: Add copy button logic if needed */}
        </div>
        <CodeBlock language="tsx" code={code} />
      </div>
    </div>
  )
}
