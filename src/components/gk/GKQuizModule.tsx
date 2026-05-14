
"use client";

import { useState, useEffect } from "react";
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
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
};

type GKQuizModuleProps = {
  category: string;
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
};

const MOCK_QUESTIONS: Record<string, Question[]> = {
  "Uganda Knowledge": [
    {
      id: "1",
      question: "Which explorer is famously associated with 'discovering' the source of the Nile at Jinja?",
      options: ["John Speke", "Samuel Baker", "Henry Morton Stanley", "David Livingstone"],
      correctAnswer: "John Speke",
      explanation: "John Hanning Speke was the first European to reach Lake Victoria and identify it as the source of the Nile in 1858.",
      category: "Uganda Knowledge"
    },
    {
      id: "2",
      question: "In what year did Uganda gain independence from British colonial rule?",
      options: ["1960", "1962", "1964", "1958"],
      correctAnswer: "1962",
      explanation: "Uganda became an independent nation within the Commonwealth on October 9, 1962.",
      category: "Uganda Knowledge"
    }
  ],
  "Logical Reasoning": [
    {
      id: "3",
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "This is a transitive syllogism. If A=B and B=C, then A=C.",
      category: "Logical Reasoning"
    }
  ]
};

export function GKQuizModule({ category, onComplete, onClose }: GKQuizModuleProps) {
  const questions = MOCK_QUESTIONS[category] || MOCK_QUESTIONS["Uganda Knowledge"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(null);
    }
  }, [timeLeft, isAnswered, isFinished]);

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
          <div className="bg-secondary/30 p-4 rounded-xl text-sm">
            {percentage >= 70 ? "Excellent work! You're showing great mastery of this category." : "Good effort! A little more revision on these topics will go a long way."}
          </div>
          <Button onClick={onClose} className="w-full h-12 rounded-xl">Back to Dashboard</Button>
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
                if (isCorrect) variantClasses = "border-green-500 bg-green-50 text-green-700";
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
                  {opt}
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
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
              <Button onClick={handleNext} className="w-full mt-6 h-12 rounded-xl group">
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
