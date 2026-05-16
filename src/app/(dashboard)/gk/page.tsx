
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Target,
  Dices,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { GKQuizModule } from "@/components/gk/GKQuizModule";
import { cn } from "@/lib/utils";

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
  const [revealedNumber, setRevealedNumber] = useState<number | null>(null);
  const [isAnsweringDaily, setIsAnsweringDaily] = useState(false);
  const [userStats, setUserStats] = useState({
    streak: 12,
    totalScore: 1450,
    dailyChallengeDone: false
  });

  const handleQuizComplete = (score: number, total: number) => {
    setUserStats(prev => ({
      ...prev,
      totalScore: prev.totalScore + (score * 10)
    }));
  };

  const luckyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary">GK Mastery Hub</h1>
          <p className="text-muted-foreground">Gamified academic training for the curious mind.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-2xl border border-orange-200 shadow-sm">
            <Flame className="w-5 h-5 fill-orange-500" />
            <span className="font-bold">{userStats.streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-2xl border border-primary/20 shadow-sm">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="font-bold">{userStats.totalScore} XP</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="training" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-secondary/50 p-1 h-12 rounded-2xl">
            <TabsTrigger value="training" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <Brain className="w-4 h-4 mr-2" />
              Daily Training
            </TabsTrigger>
            <TabsTrigger value="challenges" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Grand Challenges
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Your Insights
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="training" className="space-y-12 animate-in slide-in-from-bottom-4">
          {/* Daily Lucky Numbers Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Dices className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-headline font-bold">Pick Your Lucky Number</h3>
                <p className="text-sm text-muted-foreground">Reveal today's randomized quick-fire questions.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
              {luckyNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setRevealedNumber(num);
                    setIsAnsweringDaily(true);
                  }}
                  className={cn(
                    "aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md border-2",
                    revealedNumber === num 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white border-secondary hover:border-primary/50 text-primary"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>

            {isAnsweringDaily && (
              <Card className="border-2 border-accent/20 bg-accent/5 animate-in zoom-in-95">
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white shadow-lg">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-accent border-accent font-bold">LUCKY QUESTION #{revealedNumber}</Badge>
                      <h4 className="text-xl font-bold">How many national parks are currently gazetted in Uganda?</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {["8", "10", "12", "15"].map((opt) => (
                        <Button 
                          key={opt} 
                          variant="secondary" 
                          className="px-6 rounded-xl hover:bg-primary hover:text-white transition-colors"
                          onClick={() => {
                            setIsAnsweringDaily(false);
                            setRevealedNumber(null);
                          }}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Practice Categories Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-accent" />
              Focus Areas
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Card 
                  key={cat.id} 
                  className="group hover:border-primary transition-all cursor-pointer border-none shadow-md overflow-hidden bg-white"
                  onClick={() => setActiveCategory(cat.title)}
                >
                  <CardContent className="p-0">
                    <div className={cn("h-2 w-full", cat.color)} />
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", cat.color)}>
                          <cat.icon className="w-7 h-7" />
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Progress</span>
                          <span className="text-lg font-bold text-primary">{cat.progress}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{cat.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{cat.desc}</p>
                      </div>
                      <Progress value={cat.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-8 animate-in slide-in-from-bottom-4">
          <Card className="relative overflow-hidden border-none shadow-2xl bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground min-h-[300px] flex items-center">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Trophy className="w-64 h-64" />
            </div>
            <CardContent className="p-12 space-y-8 relative z-10 w-full">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-none px-4 py-1">ULTIMATE QUEST</Badge>
                <h2 className="text-5xl font-headline font-bold leading-tight">The 2024 EAC <br />Regional Masterclass</h2>
                <p className="text-lg opacity-90 max-w-xl">A high-stakes 50-question marathon covering the latest East African Community policies and regional history.</p>
              </div>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><Clock className="w-6 h-6" /></div>
                  <div>
                    <p className="text-xs opacity-70 uppercase font-bold">Time Limit</p>
                    <p className="text-sm font-bold">45 Minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><Target className="w-6 h-6" /></div>
                  <div>
                    <p className="text-xs opacity-70 uppercase font-bold">Reward</p>
                    <p className="text-sm font-bold">500 XP + Gold Badge</p>
                  </div>
                </div>
                <Button 
                  className="bg-white text-primary hover:bg-secondary h-14 px-10 rounded-2xl font-bold text-lg ml-auto shadow-xl"
                  onClick={() => setActiveCategory("Uganda Knowledge")}
                >
                  Enter Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="animate-in slide-in-from-bottom-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Aptitude Score", value: 85, color: "bg-purple-500" },
                    { label: "Current Affairs", value: 42, color: "bg-blue-500" },
                    { label: "Vocabulary Mastery", value: 68, color: "bg-green-500" }
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{stat.label}</span>
                        <span>{stat.value}%</span>
                      </div>
                      <Progress value={stat.value} className="h-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="bg-destructive/5 border-destructive/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-destructive flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Weak Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">EAC Integration Policy</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Pre-Colonial Kingdoms</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/5 border-accent/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-accent flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Spatial Reasoning</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Global Economic Trends</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Top Scholars</span>
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "John Bosco", score: 12500, rank: 1 },
                    { name: "Mariam K.", score: 11200, rank: 2 },
                    { name: "Davis L.", score: 10800, rank: 3 },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.score.toLocaleString()} PTS</p>
                      </div>
                      {user.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-200" />}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full rounded-xl">View Leaderboard</Button>
                </CardContent>
              </Card>

              <Card className="bg-secondary/20 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-200" />
                    Trivia Fact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic leading-relaxed text-muted-foreground">
                    "The Pearl of Africa" title was popularized by Winston Churchill in his 1908 book 'My African Journey' after visiting Uganda."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
