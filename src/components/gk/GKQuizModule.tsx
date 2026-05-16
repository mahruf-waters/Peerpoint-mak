"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  Sparkles,
  Info,
  Loader2,
  AlertCircle,
  RefreshCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateGKQuestions, type GKQuestion } from "@/ai/flows/ai-gk-generator";
import { useToast } from "@/hooks/use-toast";

type GKQuizModuleProps = {
  category: string;
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
};

export function GKQuizModule({ category, onComplete, onClose }: GKQuizModuleProps) {
  const [questions, setQuestions] = useState<GKQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateGKQuestions(category);
      if (result.questions && result.questions.length > 0) {
        setQuestions(result.questions);
      } else {
        throw new Error("No questions returned");
      }
    } catch (err: any) {
      console.error(err);
      const isQuotaError = err.message?.includes('429') || err.message?.includes('quota');
      setError(isQuotaError ? "The AI tutor is currently busy handling many students. Please wait a moment and try again." : "Failed to load questions. Please check your connection.");
      
      toast({
        variant: "destructive",
        title: isQuotaError ? "AI Busy" : "Load Error",
        description: isQuotaError ? "Service quota reached. Please retry in a few seconds." : "Could not generate questions.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [category, toast]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  useEffect(() => {
    if (questions.length === 0 || isFinished || isAnswered || isLoading) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswer(null);
    }
  }, [timeLeft, isAnswered, isFinished, questions.length, isLoading]);

  const handleAnswer = (option: string | null) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === questions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
      onComplete(score, questions.length);
    }
  };

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto border-none shadow-lg">
        <CardContent className="pt-20 pb-20 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">
            AI is crafting unique questions for {category}...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto border-none shadow-lg bg-destructive/5">
        <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center space-y-6 text-center">
          <AlertCircle className="w-16 h-16 text-destructive" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Training Interrupted</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">{error}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="rounded-xl">Exit Hub</Button>
            <Button onClick={loadQuestions} className="rounded-xl gap-2">
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-md mx-auto border-none shadow-2xl animate-in zoom-in-95">
        <CardContent className="pt-12 text-center space-y-6">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold text-primary">Quiz Complete!</h2>
            <p className="text-muted-foreground">You scored {score} out of {questions.length}</p>
          </div>
          <div className="text-5xl font-bold text-accent">{percentage}%</div>
          <div className="bg-secondary/30 p-4 rounded-xl text-sm leading-relaxed">
            {percentage >= 70 
              ? "Excellent work! You're showing great mastery of this category." 
              : "Good effort! A little more revision on these topics will go a long way."}
          </div>
          <Button onClick={onClose} className="w-full h-12 rounded-xl">Back to Training</Button>
        </CardContent>
      </Card>
    );
  }

  const q = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground">Exit</Button>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-secondary rounded-full text-xs font-bold">
          <Timer className={cn("w-4 h-4", timeLeft < 10 && "text-destructive animate-pulse")} />
          {timeLeft}s
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-xl font-headline leading-relaxed">
            {q.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-3">
            {q.options.map((opt) => {
              const isCorrect = opt === q.correctAnswer;
              const isSelected = opt === selectedOption;
              
              let variantClasses = "border-2 bg-background hover:border-primary/50 text-foreground";
              if (isAnswered) {
                if (isCorrect) variantClasses = "border-green-500 bg-green-50 text-green-700 shadow-[0_0_10px_rgba(34,197,94,0.2)]";
                else if (isSelected) variantClasses = "border-red-500 bg-red-50 text-red-700";
                else variantClasses = "opacity-50 grayscale-[0.5]";
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(opt)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left font-medium transition-all flex justify-between items-center group",
                    variantClasses
                  )}
                >
                  <span className="flex-1 pr-4">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="animate-in slide-in-from-top-4 mt-6">
              <div className="p-4 bg-accent/5 rounded-xl border border-accent/20 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Info className="w-4 h-4" />
                  Explanation
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {q.explanation}
                </p>
              </div>
              <Button onClick={handleNext} className="w-full mt-6 h-12 rounded-xl group bg-primary text-white hover:bg-primary/90">
                {currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
