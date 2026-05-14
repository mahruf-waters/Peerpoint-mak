
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Bookmark, 
  Search,
  Plus,
  MessageCircle,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

const discussions = [
  {
    id: 1,
    author: { name: "Sarah Nakato", avatar: "https://picsum.photos/seed/sarah/100", reputation: 120 },
    title: "Tips for tackling the English Comprehension section in MUBS papers?",
    content: "I've been struggling with the MUBS 2022 English paper. The comprehension questions seem much harder than previous years. Any advice on timing?",
    tags: ["English", "MUBS", "Exam Tips"],
    likes: 24,
    replies: 8,
    time: "2 hours ago"
  },
  {
    id: 2,
    author: { name: "Ondoga Brian", avatar: "https://picsum.photos/seed/brian/100", reputation: 350 },
    title: "Makerere Aptitude Mock Group Study Session",
    content: "Hosting a virtual session this Saturday to go through Quantitative Reasoning. We'll be using the 2023 official mock paper. Who's in?",
    tags: ["Aptitude", "Makerere", "Study Group"],
    likes: 45,
    replies: 32,
    time: "5 hours ago"
  },
  {
    id: 3,
    author: { name: "Agaba Julius", avatar: "https://picsum.photos/seed/julius/100", reputation: 80 },
    title: "Does Kyambogo require a specific format for the Science Essay?",
    content: "I am applying for B.Eng in Civil Engineering. Are there specific headers we must use for the mature entry science essay?",
    tags: ["Kyambogo", "Engineering", "Essays"],
    likes: 12,
    replies: 3,
    time: "1 day ago"
  }
];

export default function Forum() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Academic Forum</h1>
          <p className="text-muted-foreground">Collaborate with peers, ask questions, and share insights.</p>
        </div>
        <Button className="rounded-full h-12 px-6">
          <Plus className="w-4 h-4 mr-2" />
          Ask a Question
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10 h-12 rounded-xl" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {["All", "Popular", "Unanswered", "Makerere", "Kyambogo", "MUBS", "MUST"].map((tab) => (
              <Button 
                key={tab} 
                variant={activeTab === tab.toLowerCase() ? "default" : "secondary"}
                className="rounded-full h-9 px-6 shrink-0"
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {discussions.map((d) => (
              <Card key={d.id} className="hover:border-primary/50 transition-all border-none shadow-sm">
                <CardHeader className="flex-row items-start gap-4 space-y-0 p-6">
                  <Avatar className="w-10 h-10 ring-2 ring-background">
                    <AvatarImage src={d.author.avatar} />
                    <AvatarFallback>{d.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{d.author.name}</span>
                      <Badge variant="outline" className="text-[10px] font-bold text-accent border-accent/30">{d.author.reputation} RP</Badge>
                      <span className="text-xs text-muted-foreground">• {d.time}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight hover:text-primary cursor-pointer">{d.title}</h3>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {d.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="rounded-full px-3 bg-secondary text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {d.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {d.replies} Replies
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Trending Topics
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "#Makerere2024", posts: 420 },
                { name: "#AptitudeTips", posts: 156 },
                { name: "#MUBSResults", posts: 98 },
                { name: "#KyambogoEntry", posts: 84 },
              ].map((topic, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{topic.name}</span>
                  <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <h3 className="text-lg font-bold">Top Contributors</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "John Bosco", points: 1250 },
                { name: "Mariam K.", points: 980 },
                { name: "Davis L.", points: 870 },
              ].map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">{i+1}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{person.name}</p>
                    <p className="text-xs opacity-70">{person.points} Reputation</p>
                  </div>
                </div>
              ))}
              <Button variant="secondary" className="w-full mt-2">View Leaderboard</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
