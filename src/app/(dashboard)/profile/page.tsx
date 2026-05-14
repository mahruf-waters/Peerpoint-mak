
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Target, 
  GraduationCap, 
  Award,
  BookMarked,
  Clock,
  Mail,
  MapPin
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Ivan Kato",
    email: "ivan.kato@example.com",
    university: "Makerere University",
    course: "Bachelor of Medicine and Surgery",
    joined: "September 2024",
    reputation: 450,
    location: "Kampala, Uganda"
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column: Avatar & Basic Info */}
        <Card className="w-full md:w-80 shrink-0 border-none shadow-sm bg-white">
          <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32 ring-4 ring-primary/10">
                <AvatarImage src="https://picsum.photos/seed/ivan/200" />
                <AvatarFallback className="text-2xl font-bold bg-primary text-white">IK</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-full border-4 border-white">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold text-primary">{user.name}</h2>
              <div className="flex flex-col items-center gap-1 mt-1 text-muted-foreground text-sm">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {user.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 font-bold">
                {user.reputation} RP
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-accent text-accent font-bold">Gold Rank</Badge>
            </div>
            <div className="w-full pt-4 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-muted-foreground uppercase tracking-wider">Profile Strength</span>
                <span className="text-primary">85%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%] transition-all duration-1000" />
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl mt-4">Edit Profile Photo</Button>
          </CardContent>
        </Card>

        {/* Right Column: Settings & Details */}
        <div className="flex-1 space-y-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none px-0 gap-8 mb-6 overflow-x-auto no-scrollbar">
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-12 shadow-none font-bold text-muted-foreground data-[state=active]:text-primary"
              >
                Account Settings
              </TabsTrigger>
              <TabsTrigger 
                value="academic" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-12 shadow-none font-bold text-muted-foreground data-[state=active]:text-primary"
              >
                Academic Goals
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-12 shadow-none font-bold text-muted-foreground data-[state=active]:text-primary"
              >
                Study Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 font-headline text-primary">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your public profile and contact details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-bold">Full Name</Label>
                      <Input id="name" defaultValue={user.name} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-bold">Email Address</Label>
                      <Input id="email" defaultValue={user.email} className="rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-bold">Location</Label>
                    <Input id="location" defaultValue={user.location} className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="font-bold">Short Bio</Label>
                    <textarea 
                      id="bio" 
                      placeholder="Tell us about your academic journey..." 
                      className="w-full min-h-[100px] rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="pt-2">
                    <Button className="rounded-xl h-11 px-8 font-bold">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 font-headline text-primary">
                    <Shield className="w-5 h-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-secondary/50">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Password</p>
                      <p className="text-xs text-muted-foreground">Last changed October 2024</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg h-9 font-bold border-primary text-primary hover:bg-primary/5">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-secondary/50">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Keep your account secure</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg h-9 font-bold">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 font-headline text-accent">
                    <Target className="w-5 h-5" />
                    Target Institutions
                  </CardTitle>
                  <CardDescription>We'll tailor your revision based on these targets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold">Primary Choice</Label>
                      <Input defaultValue={user.university} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">Target Course</Label>
                      <Input defaultValue={user.course} className="rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-bold">Other Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer h-8 px-4 text-xs font-bold">MUBS: B.Com</Badge>
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer h-8 px-4 text-xs font-bold">MUST: Civil Eng</Badge>
                      <Badge variant="outline" className="h-8 px-4 text-xs font-bold border-dashed">+ Add Institution</Badge>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button className="rounded-xl h-11 px-8 font-bold bg-accent hover:bg-accent/90">Update Academic Goals</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 font-headline text-accent">
                    <GraduationCap className="w-5 h-5" />
                    Study Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Peer Discussion Mode</p>
                      <p className="text-xs text-muted-foreground">Allow others to message you for study circles</p>
                    </div>
                    <div className="h-6 w-11 bg-accent rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Weekly Performance Report</p>
                      <p className="text-xs text-muted-foreground">Receive AI-generated study recommendations via email</p>
                    </div>
                    <div className="h-6 w-11 bg-accent rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="border-none shadow-sm bg-primary/5">
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">124h</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Study Time</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-accent/5">
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <BookMarked className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">42</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Papers Read</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-orange-50 col-span-2 md:col-span-1">
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">12</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Badges Earned</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Early Bird", desc: "Studied for 5 consecutive days before 6 AM", date: "Oct 10, 2024", color: "bg-orange-500" },
                    { title: "Quiz Master", desc: "Achieved perfect score on 3 Aptitude mocks", date: "Oct 12, 2024", color: "bg-blue-500" },
                    { title: "Helper", desc: "Your answer in the forum received 10+ likes", date: "Oct 15, 2024", color: "bg-green-500" },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-4 items-center p-4 border rounded-2xl hover:bg-secondary/20 transition-colors">
                      <div className={`w-3 h-3 rounded-full ${a.color} shrink-0`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.desc}</p>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{a.date}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
