
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Trophy, 
  Brain, 
  Newspaper, 
  Map, 
  Languages, 
  FlaskConical, 
  History as HistoryIcon, 
  Globe, 
  Sparkles,
  Clock,
  Lightbulb,
  TrendingUp,
  Target
} from "lucide-react";
import { GKQuizModule } from "@/components/gk/GKQuizModule";

const categories = [
  { id: "ca", title: "Current Affairs", icon: Newspaper, desc: "Global & local news highlights.", color: "bg-blue-100 text-blue-600", progress: 45 },
  { id: "uk", title: "Uganda Knowledge", icon: Map, desc: "History, culture, & geography of Uganda.", color: "bg-red-100 text-red-600", progress: 78 },
  { id: "lr", title: "Logical Reasoning", icon: Brain, desc: "Puzzles & aptitude challenges.", color: "bg-purple-100 text-purple-600", progress: 32 },
  { id: "ev", title: "English & Vocabulary", icon: Languages, desc: "Grammar & advanced vocabulary.", color: "bg-green-100 text-green-600", progress: 60 },
  { id: "st", title: "Science & Technology", icon: FlaskConical, desc: "Modern tech & basic sciences.", color: "bg-cyan-100 text-cyan-600", progress: 20 },
  { id: "hi", title: "History", icon: HistoryIcon, desc: "Significant events of the past.", color: "bg-orange-100 text-orange-600", progress: 55 },
  { id: "ge", title: "Geography", icon: Globe, desc: "Physical & human geography.", color: "bg-indigo-100 text-indigo-600", progress: 15 },
];

export default function GeneralKnowledgePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    streak: 12,
    totalScore: 1450,
    dailyChallengeDone: false
  });

  const handleQuizComplete = (score: number, total: number) => {
    // In a real app, update Firestore here
    setUserStats(prev => ({
      ...prev,
      totalScore: prev.totalScore + (score * 10)
    }));
  };

  if (activeCategory) {
    return (
      <div className="py-8">
        <GKQuizModule 
          category={activeCategory} 
          onComplete={handleQuizComplete} 
          onClose={() => setActiveCategory(null)} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Master General Knowledge</h1>
          <p className="text-muted-foreground">Sharpen your mind with daily training and aptitude challenges.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl border border-orange-200">
            <Flame className="w-5 h-5 fill-orange-500" />
            <span className="font-bold">{userStats.streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="font-bold">{userStats.totalScore} PTS</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Challenge Card */}
          <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-32 h-32" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-none">DAILY CHALLENGE</Badge>
                <h2 className="text-3xl font-headline font-bold">The Great Lakes Region Quest</h2>
                <p className="opacity-90 max-w-md">Answer 10 fast-paced questions about East African geography to earn double points today!</p>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-bold">Ends in 04:12:35</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-bold">10 Questions</span>
                </div>
                <Button 
                  onClick={() => setActiveCategory("Uganda Knowledge")}
                  className="bg-white text-primary hover:bg-secondary h-12 px-8 rounded-xl font-bold ml-auto"
                >
                  Start Challenge
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Categories Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-bold flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              Practice Categories
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Card 
                  key={cat.id} 
                  className="group hover:border-primary transition-all cursor-pointer border-none shadow-sm"
                  onClick={() => setActiveCategory(cat.title)}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${cat.color}`}>
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold group-hover:text-primary transition-colors">{cat.title}</h4>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{cat.progress}% DONE</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                      <Progress value={cat.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Did You Know Section */}
          <Card className="bg-secondary/30 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-200" />
                Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm italic leading-relaxed text-muted-foreground">
                "The Ugandan flag's colors represent the African people (black), Africa's sunshine (yellow), and African brotherhood (red)."
              </p>
              <Button variant="ghost" className="w-full text-xs font-bold text-primary">Next Fact</Button>
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Top Seekers</span>
                <TrendingUp className="w-4 h-4 text-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "John Bosco", score: 12500, rank: 1 },
                { name: "Mariam K.", score: 11200, rank: 2 },
                { name: "Davis L.", score: 10800, rank: 3 },
              ].map((user) => (
                <div key={user.name} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.score.toLocaleString()} pts</p>
                  </div>
                  {user.rank === 1 && <Trophy className="w-4 h-4 text-yellow-500" />}
                </div>
              ))}
              <Button variant="outline" className="w-full h-10 rounded-lg text-xs font-bold">View Full Rankings</Button>
            </CardContent>
          </Card>

          {/* Recent Performance */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Weak Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">Uganda Geography</span>
                <span className="text-destructive font-bold">Urgent</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">Current Affairs</span>
                <span className="text-orange-500 font-bold">Revision</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
