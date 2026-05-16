"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  Calendar, 
  Search, 
  TrendingUp, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Bell,
  MapPin,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { getLiveNewsFeed, type NewsFeedOutput } from "@/ai/flows/ai-news-feed";
import { useToast } from "@/hooks/use-toast";

const trustedSources = [
  { name: "BBC World News", url: "https://www.bbc.com/news" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com" },
  { name: "Makerere News Portal", url: "https://news.mak.ac.ug" },
  { name: "Daily Monitor", url: "https://www.monitor.co.ug" },
];

export default function NewsAndEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<NewsFeedOutput | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
  const { toast } = useToast();

  const fetchNews = useCallback(async (isAuto = false) => {
    if (!data && !isAuto) {
      setIsLoading(true);
    }
    setIsRefreshing(true);
    
    try {
      const result = await getLiveNewsFeed();
      setData(result);
      setLastUpdated(new Date());
      setIsQuotaExhausted(false);
    } catch (error: any) {
      // Handle quota errors specifically
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        setIsQuotaExhausted(true);
        if (!isAuto) {
          toast({
            variant: "destructive",
            title: "AI Busy",
            description: "Sync limit reached. Please wait a few moments before trying again.",
          });
        }
      } else if (!isAuto) {
        toast({
          variant: "destructive",
          title: "Feed Error",
          description: "Could not fetch live updates. Using last known data.",
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [data, toast]);

  useEffect(() => {
    fetchNews();

    // Auto-sync every 5 minutes
    const interval = setInterval(() => {
      fetchNews(true);
    }, 300000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  const filteredNews = data?.news.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Live News & Academic Events</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">AI-curated world affairs and university schedules.</p>
            {lastUpdated && (
              <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            {isQuotaExhausted && (
              <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3 h-3" />
                Sync Paused (AI Busy)
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search feed..." 
              className="pl-10 h-11 rounded-xl w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl h-11 w-11 relative"
            onClick={() => fetchNews()}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl h-11 w-11">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium text-center max-w-xs">
            Aggregating latest global and academic updates...
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-headline font-bold">Latest Headlines</h2>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Auto-sync active (5m)
              </span>
            </div>

            <div className="space-y-6">
              {filteredNews?.map((news) => (
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
              {filteredNews?.length === 0 && !data && (
                <div className="text-center py-20 opacity-50">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p>Feed is temporarily unavailable due to high demand. Please refresh shortly.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-secondary/30">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Academic Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {data?.events.map((event) => (
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

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Trusted Sources</h4>
              <div className="grid grid-cols-1 gap-2">
                {trustedSources.map((site) => (
                  <Button 
                    key={site.name} 
                    variant="ghost" 
                    className="justify-between h-10 px-3 hover:bg-secondary text-sm font-medium"
                    asChild
                  >
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      {site.name}
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
