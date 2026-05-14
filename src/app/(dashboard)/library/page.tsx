
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  University,
  CalendarDays
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const papers = [
  { id: 1, title: "Aptitude General Paper", university: "Makerere University", year: "2023", category: "Aptitude", size: "1.2 MB" },
  { id: 2, title: "English Language Proficiency", university: "Kyambogo University", year: "2022", category: "English", size: "850 KB" },
  { id: 3, title: "Mathematics for Science Courses", university: "MUST", year: "2023", category: "Math", size: "2.1 MB" },
  { id: 4, title: "Business Aptitude Test", university: "MUBS", year: "2021", category: "Aptitude", size: "1.5 MB" },
  { id: 5, title: "Quantitative Reasoning Paper 1", university: "Makerere University", year: "2022", category: "Math", size: "1.8 MB" },
  { id: 6, title: "Comprehension & Essay Writing", university: "Kyambogo University", year: "2023", category: "English", size: "920 KB" },
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Paper Repository</h1>
          <p className="text-muted-foreground">Access categorized past papers from top Ugandan universities.</p>
        </div>
        <Button className="rounded-full">
          <Download className="w-4 h-4 mr-2" />
          Offline Library
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by topic, university, or year..." 
            className="pl-10 h-12 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px] h-12 rounded-xl">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mak">Makerere</SelectItem>
              <SelectItem value="kyu">Kyambogo</SelectItem>
              <SelectItem value="mubs">MUBS</SelectItem>
              <SelectItem value="must">MUST</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px] h-12 rounded-xl">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <Card key={paper.id} className="group hover:shadow-lg transition-all border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="rounded-full">{paper.category}</Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{paper.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <University className="w-3 h-3" />
                    {paper.university}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {paper.year}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-xs text-muted-foreground">{paper.size}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 rounded-full">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="h-8 rounded-full">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
