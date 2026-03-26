import { useState } from "react";
import { getQuizForSkill, QuizQuestion } from "@/lib/quizData";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Award } from "lucide-react";

interface Props {
  skillCategory: string;
  onPass: () => void;
  onClose: () => void;
}

const SkillQuizModal = ({ skillCategory, onPass, onClose }: Props) => {
  const questions = getQuizForSkill(skillCategory);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[currentQ].correctIndex;
    setAnswers((prev) => [...prev, correct]);

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ((p) => p + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const correctCount = answers.filter(Boolean).length;
  const passed = finished && correctCount / questions.length >= 0.6;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border shadow-card-hover w-full max-w-md p-6 animate-fade-in">
        {!finished ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-card-foreground">
                Skill Verification: {skillCategory}
              </h3>
              <span className="text-sm text-muted-foreground">
                {currentQ + 1}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-5">
              <div
                className="h-2 rounded-full gradient-warm transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
            <p className="font-medium text-card-foreground mb-4">{questions[currentQ].question}</p>
            <div className="space-y-2">
              {questions[currentQ].options.map((opt, idx) => {
                let cls = "w-full text-left p-3 rounded-lg border transition-colors ";
                if (selected !== null) {
                  if (idx === questions[currentQ].correctIndex) cls += "border-accent bg-accent/10 text-accent";
                  else if (idx === selected) cls += "border-destructive bg-destructive/10 text-destructive";
                  else cls += "border-border text-muted-foreground";
                } else {
                  cls += "border-border hover:border-primary hover:bg-primary/5 text-card-foreground";
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={selected !== null}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className={`flex justify-center`}>
              {passed ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-10 w-10 text-accent" />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
              )}
            </div>
            <h3 className="font-heading text-xl font-bold text-card-foreground">
              {passed ? "Congratulations! You passed!" : "Not quite there yet"}
            </h3>
            <p className="text-muted-foreground">
              You scored {correctCount}/{questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
            </p>
            {passed ? (
              <Button onClick={onPass} className="gap-2">
                <Award className="h-4 w-4" /> Get My Certificate
              </Button>
            ) : (
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={() => { setCurrentQ(0); setSelected(null); setAnswers([]); setFinished(false); }}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillQuizModal;
