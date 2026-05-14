
"use client";

import { useState, useRef, useEffect } from "react";
import { academicQuestionAssistant } from "@/ai/flows/ai-academic-question-assistant";
import { aiPastPaperExplanation } from "@/ai/flows/ai-past-paper-explanation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Send, Loader2, User, Sparkles, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [complexAnswer, setComplexAnswer] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAskQuestion = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await academicQuestionAssistant({ question: input });
      setMessages(prev => [...prev, { role: "assistant", content: result.answer }]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainAnswer = async () => {
    if (!input.trim() || !complexAnswer.trim()) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please provide both the question and the answer you want explained.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await aiPastPaperExplanation({ question: input, complexAnswer });
      setMessages(prev => [...prev, { role: "user", content: `Explain this answer: ${complexAnswer.substring(0, 50)}...` }]);
      setMessages(prev => [...prev, { role: "assistant", content: result.detailedExplanation }]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate explanation.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
          <BrainCircuit className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">AI Study Companion</h1>
          <p className="text-muted-foreground">Get instant help with complex concepts and exam reasoning.</p>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto h-12 rounded-xl">
          <TabsTrigger value="chat" className="rounded-lg">Q&A Chat</TabsTrigger>
          <TabsTrigger value="explain" className="rounded-lg">Answer Decoder</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="min-h-[500px] flex flex-col border-none shadow-md overflow-hidden">
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Sparkles className="w-12 h-12 text-primary" />
                  <div>
                    <p className="font-bold">Ask me anything!</p>
                    <p className="text-sm">E.g., "Explain quadratic equations" or "How is Makerere's aptitude marked?"</p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-secondary text-foreground rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 animate-pulse">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <div className="bg-secondary p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm italic">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </CardContent>
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your question here..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[60px] max-h-[200px] rounded-xl resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAskQuestion();
                    }
                  }}
                />
                <Button 
                  onClick={handleAskQuestion} 
                  disabled={isLoading || !input.trim()}
                  className="h-auto w-12 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="explain" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                Step-by-Step Reasoner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">The Question</label>
                <Textarea 
                  placeholder="Paste the original past paper question here..." 
                  className="rounded-xl"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">The Answer (or Marking Guide snippet)</label>
                <Textarea 
                  placeholder="Paste the complex answer you want explained..." 
                  className="rounded-xl min-h-[150px]"
                  value={complexAnswer}
                  onChange={(e) => setComplexAnswer(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleExplainAnswer} 
                className="w-full h-12 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-4 h-4" />}
                Break Down This Answer
              </Button>
            </CardContent>
          </Card>
          
          {messages.length > 0 && messages[messages.length-1].role === 'assistant' && (
            <Card className="border-none shadow-md bg-primary text-primary-foreground animate-in zoom-in-95">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-headline font-bold">Detailed Explanation</h3>
                <p className="text-sm leading-relaxed opacity-90 whitespace-pre-wrap">
                  {messages[messages.length-1].content}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
