
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  Newspaper, 
  Calendar, 
  Search, 
  TrendingUp, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Bell,
  MapPin
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const newsItems = [
  {
    id: 1,
    title: "Global Education Summit 2024: Bridging the Digital Divide",
    category: "Education",
    time: "3 hours ago",
    source: "UN News",
    summary: "World leaders gather in Nairobi to discuss the future of digital literacy and access to higher education in developing nations.",
    image: "https://picsum.photos/seed/news1/400/250"
  },
  {
    id: 2,
    title: "Makerere University Announces New AI Research Hub",
    category: "Science",
    time: "5 hours ago",
    source: "Daily Monitor",
    summary: "The institution has secured a $5M grant to lead East African research in agricultural AI solutions.",
    image: "https://picsum.photos/seed/news2/400/250"
  },
  {
    id: 3,
    title: "East African Community Discusses Single University Entrance",
    category: "Region",
    time: "1 day ago",
    source: "East African",
    summary: "Proposals for a unified mature entry examination across Uganda, Kenya, and Tanzania gain momentum.",
    image: "https://picsum.photos/seed/news3/400/250"
  }
];

const events = [
  {
    id: 1,
    title: "World Science Forum",
    date: "Nov 15, 2024",
    status: "Upcoming",
    location: "Cape Town, SA",
    type: "Academic"
  },
  {
    id: 2,
    title: "Makerere Mature Entry Exams",
    date: "Dec 12, 2024",
    status: "Upcoming",
    location: "Main Campus, Kla",
    type: "Exam"
  },
  {
    id: 3,
    title: "Kyambogo Open Day",
    date: "Oct 20, 2024",
    status: "Recent",
    location: "Kyambogo, Uganda",
    type: "Event"
  },
  {
    id: 4,
    title: "Global Tech Expo",
    date: "Jan 05, 2025",
    status: "Upcoming",
    location: "Online",
    type: "Tech"
  }
];

export default function NewsAndEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const newsHeaderImg = PlaceHolderImages.find(img => img.id === "global-news");

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Global News & Academic Events</h1>
          <p className="text-muted-foreground">Stay updated with world affairs and university schedules.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search news..." 
              className="pl-10 h-11 rounded-xl w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl h-11 w-11">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-headline font-bold">Latest Headlines</h2>
          </div>

          <div className="space-y-6">
            {newsItems.map((news) => (
              <Card key={news.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                  <div className="relative w-full md:w-48 h-48 shrink-0 overflow-hidden">
                    <Image 
                      src={news.image} 
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-wider">
                          {news.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {news.time}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-bold text-accent">{news.source}</span>
                      <Button variant="ghost" size="sm" className="text-xs font-bold text-primary p-0 h-auto hover:bg-transparent">
                        Read Story <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full h-12 rounded-xl border-dashed">
            Load More Global News
          </Button>
        </div>

        {/* Sidebar: Events & Calendar */}
        <div className="space-y-8">
          {/* Timeline Section */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-secondary/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                World Public Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="relative pl-6 border-l-2 border-primary/20 last:border-0 pb-6 last:pb-0">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground">{event.date}</span>
                        <Badge 
                          variant={event.status === "Upcoming" ? "default" : "secondary"}
                          className="text-[9px] h-4 rounded-full"
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold leading-tight">{event.title}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Newsletter */}
          <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Globe className="w-24 h-24" />
            </div>
            <CardContent className="p-6 space-y-4 relative z-10">
              <h3 className="text-lg font-bold">Weekly Roundup</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Get a curated list of global current affairs questions for your upcoming aptitude exam.
              </p>
              <div className="space-y-2">
                <Input placeholder="Your email..." className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10 rounded-lg" />
                <Button variant="secondary" className="w-full font-bold">Subscribe</Button>
              </div>
            </CardContent>
          </Card>

          {/* External Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Trusted Sources</h4>
            <div className="grid grid-cols-1 gap-2">
              {["BBC World News", "Al Jazeera", "Makerere News Portal", "Daily Monitor"].map((site) => (
                <Button 
                  key={site} 
                  variant="ghost" 
                  className="justify-between h-10 px-3 hover:bg-secondary text-sm font-medium"
                >
                  {site}
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
