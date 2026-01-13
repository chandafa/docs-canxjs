"use client";

import { useState } from "react";
import { DocsSidebar, MobileDocsSidebar } from "@/components/layout/DocsSidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <DocsSidebar />

          {/* Mobile Sidebar Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="fixed bottom-6 right-6 z-50 p-4 bg-white text-black rounded-full shadow-xl hover:bg-zinc-200 transition-all hover:scale-105">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-zinc-950 border-white/[0.08] p-0 overflow-y-auto">
              <SheetTitle className="sr-only">Documentation Menu</SheetTitle>
              <MobileDocsSidebar onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
