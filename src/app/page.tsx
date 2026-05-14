import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, BookOpen, Users, Trophy, GraduationCap, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-student");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative py-20 lg:py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Trophy className="w-4 h-4" />
              <span>Uganda's #1 Mature Entry Platform</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-headline font-bold text-primary leading-tight">
              Excel in Your <br />
              <span className="text-accent italic font-medium">Mature Age</span> <br />
              Entry Exams.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              The structured collaborative platform for Makerere, Kyambogo, MUBS, and MUST candidates. Revision, community, and AI-powered study help in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/library">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg">
                  Browse Past Papers
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative animate-in fade-in slide-in-from-right-4 duration-1000">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50 aspect-[4/3] bg-muted">
              {heroImg ? (
                <Image 
                  src={heroImg.imageUrl} 
                  alt={heroImg.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImg.imageHint}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <BookOpen className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-accent w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">94% Pass Rate</p>
                  <p className="text-sm text-muted-foreground">Community average score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      </header>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold text-primary">Everything you need to succeed</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've built tools specifically designed for the unique challenges of Ugandan mature entry exams.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: "Exam Repository", 
                desc: "Past papers from Makerere, MUBS, MUST, and Kyambogo categorized by year and course."
              },
              { 
                icon: Users, 
                title: "Study Circles", 
                desc: "Join groups of peers targeting the same university or course for collaborative revision."
              },
              { 
                icon: BrainCircuit, 
                title: "AI Study Tutor", 
                desc: "Get instant step-by-step reasoning for complex questions using our specialized AI model."
              },
              { 
                icon: Trophy, 
                title: "Weekly Quizzes", 
                desc: "Practice with timed Aptitude, English, and Mathematics tests to track your progress."
              }
            ].map((f, i) => (
              <Card key={i} className="hover:shadow-xl transition-all hover:-translate-y-1 border-none shadow-md bg-background/50">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-headline font-semibold">{f.title}</h3>
                  <p className="text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-headline font-bold">5,000+</p>
            <p className="text-primary-foreground/80">Active Candidates</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-headline font-bold">120</p>
            <p className="text-primary-foreground/80">Past Papers</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-headline font-bold">15,000</p>
            <p className="text-primary-foreground/80">Questions Answered</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-headline font-bold">6</p>
            <p className="text-primary-foreground/80">Universities</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary border-t">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-headline font-bold">P</span>
            </div>
            <span className="text-2xl font-headline font-bold text-primary">PeerPoint</span>
          </div>
          <p className="text-muted-foreground">© 2024 PeerPoint Education Uganda. All rights reserved.</p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
