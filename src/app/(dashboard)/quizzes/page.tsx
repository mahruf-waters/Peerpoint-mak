
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Timer, 
  BookOpen, 
  BrainCircuit, 
  Star,
  Play,
  History,
  TrendingUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const quizCategories = [
  {
    title: "General Aptitude",
    icon: BrainCircuit,
    count: 24,
    color: "bg-purple-100 text-purple-600",
    description: "Numerical, logical, and abstract reasoning tests."
  },
  {
    title: "English Proficiency",
    icon: BookOpen,
    count: 18,
    color: "bg-blue-100 text-blue-600",
    description: "Grammar, comprehension, and vocabulary challenges."
  },
  {
    title: "Mathematics",
    icon: Trophy,
    count: 12,
    color: "bg-green-100 text-green-600",
    description: "Algebra, geometry, and arithmetic for science applicants."
  }
];

const availableQuizzes = [
  { id: 1, name: "Makerere Aptitude Mock #1", category: "Aptitude", duration: "45 mins", difficulty: "High", questions: 50 },
  { id: 2, name: "Daily English Warm-up", category: "English", duration: "10 mins", difficulty: "Medium", questions: 15 },
  { id: 3, name: "Quantitative Reasoning 2023", category: "Aptitude", duration: "30 mins", difficulty: "Hard", questions: 40 },
  { id: 4, name: "Grammar & Punctuation Master", category: "English", duration: "15 mins", difficulty: "Easy", questions: 20 },
];

export default function Quizzes() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Revision Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and identify gaps with timed simulations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button className="rounded-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {quizCategories.map((cat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="rounded-full">{cat.count} Quizzes</Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              </div>
              <Button variant="ghost" className="w-full text-primary font-bold hover:bg-primary/5">Browse Category</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-headline font-bold">Recommended for You</h2>
          <div className="space-y-4">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:border-primary transition-colors border-none shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary fill-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{quiz.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {quiz.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {quiz.questions} Qs</span>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold">{quiz.difficulty}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full px-6">Start</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-accent text-accent-foreground overflow-hidden relative">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="w-5 h-5 fill-white" />
                Mastery Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Elite Candidate Badge</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2 bg-white/20" />
                <p className="text-xs opacity-80">Score 80%+ on 3 more Aptitude mocks to unlock!</p>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm font-bold mb-3">Strong Subjects</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">Logic</Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">Vocabulary</Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">Spatial</Badge>
                </div>
              </div>
            </CardContent>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
