
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Calendar, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { label: "Study Streak", value: "12 Days", icon: Flame, color: "text-orange-500", bg: "bg-orange-100" },
    { label: "Mock Exam Score", value: "78%", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Papers Completed", value: "14", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { label: "Reputation Points", value: "450", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" },
  ];

  const recentPapers = [
    { name: "Makerere Aptitude 2023", subject: "Aptitude", date: "2 days ago", progress: 100 },
    { name: "MUBS English 2022", subject: "English", date: "5 days ago", progress: 45 },
    { name: "MUST Mathematics 2021", subject: "Math", date: "1 week ago", progress: 10 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Good Morning, Ivan!</h1>
          <p className="text-muted-foreground">Ready to tackle today's Makerere Entrance mock?</p>
        </div>
        <div className="bg-accent/10 px-4 py-2 rounded-lg border border-accent/20 flex items-center gap-3">
          <Calendar className="text-accent w-5 h-5" />
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wider">Exam Countdown</p>
            <p className="text-sm font-bold">42 Days to Makerere Mature Entry</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Progress Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-headline">Overall Readiness</CardTitle>
                  <CardDescription className="text-primary-foreground/70">Based on your recent quiz and paper performance</CardDescription>
                </div>
                <div className="text-4xl font-bold">68%</div>
              </div>
            </CardHeader>
            <CardContent className="-mt-4 bg-white rounded-t-3xl pt-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>General Aptitude</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="h-2 bg-secondary" />
                
                <div className="flex justify-between text-sm font-medium">
                  <span>English Proficiency</span>
                  <span>54%</span>
                </div>
                <Progress value={54} className="h-2 bg-secondary" />
                
                <div className="flex justify-between text-sm font-medium">
                  <span>Mathematics Reasoning</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2 bg-secondary" />
              </div>
              <Button className="w-full h-12 rounded-xl group">
                Review Personalized Recommendations
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Recent Study Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPapers.map((paper, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold">{paper.name}</p>
                        <p className="text-xs text-muted-foreground">{paper.date}</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-secondary">{paper.subject}</span>
                    </div>
                    <Progress value={paper.progress} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-accent text-accent-foreground">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">Solve 5 Logic Reasoning questions today to maintain your 12-day streak and earn 50 bonus points!</p>
                <Button variant="secondary" className="w-full">Start Challenge</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Components */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center p-3 rounded-lg border bg-background/50">
                <div className="w-12 h-12 rounded bg-primary/10 flex flex-col items-center justify-center text-primary">
                  <span className="text-xs font-bold uppercase">Oct</span>
                  <span className="text-lg font-bold">12</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Maths Live Discussion</p>
                  <p className="text-xs text-muted-foreground">Kyambogo Entry Group</p>
                </div>
              </div>
              <div className="flex gap-4 items-center p-3 rounded-lg border bg-background/50">
                <div className="w-12 h-12 rounded bg-primary/10 flex flex-col items-center justify-center text-primary">
                  <span className="text-xs font-bold uppercase">Oct</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div>
                  <p className="text-sm font-bold">English Mock Review</p>
                  <p className="text-xs text-muted-foreground">General Study Circle</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">View Calendar</Button>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-lg">Target Institutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center border shadow-sm text-xs font-bold">MAK</div>
                  <span className="text-sm font-medium">Makerere University</span>
                </div>
                <span className="text-xs font-bold text-accent">PRIMARY</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center border shadow-sm text-xs font-bold">KYU</div>
                  <span className="text-sm font-medium">Kyambogo University</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">Edit Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
