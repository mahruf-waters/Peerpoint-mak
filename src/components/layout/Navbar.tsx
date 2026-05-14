
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  User, 
  BrainCircuit,
  LogOut,
  Menu,
  X,
  Lightbulb,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Library", href: "/library", icon: BookOpen },
  { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "Quizzes", href: "/quizzes", icon: Trophy },
  { name: "General Knowledge", href: "/gk", icon: Lightbulb },
  { name: "News & Events", href: "/news-and-events", icon: Globe },
  { name: "AI Tutor", href: "/ai-tutor", icon: BrainCircuit },
  { name: "Profile", href: "/profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-headline font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-headline font-bold text-primary hidden sm:block">PeerPoint</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <Button variant="ghost" size="sm" className="ml-2 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-base font-medium flex items-center gap-3",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <hr className="my-2" />
            <button className="px-4 py-3 rounded-md text-base font-medium flex items-center gap-3 text-destructive">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
