import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GameButton } from "@/components/GameButton";
import { insertQuizSubmissionSchema } from "@shared/schema";
import { useCreateSubmission } from "@/hooks/use-submissions";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, Save, Home } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

// Extend schema for form validation
const formSchema = insertQuizSubmissionSchema.extend({
  score: z.coerce.number(),
  totalQuestions: z.coerce.number(),
  age: z.coerce.number().min(10, "Age must be realistic").max(100),
  fullName: z.string().min(2, "Name required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Results() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [params] = useState(() => new URLSearchParams(window.location.search));
  
  const score = parseInt(params.get("score") || "0");
  const total = parseInt(params.get("total") || "5");
  
  const createSubmission = useCreateSubmission();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score,
      totalQuestions: total,
      fullName: "",
      age: undefined,
      grade: 11,
      section: "",
    },
  });

  useEffect(() => {
    // Fire confetti if they got a good score
    if (score > total / 2) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [score, total]);

  const onSubmit = (data: FormData) => {
    console.log("Submitting data:", data);
    createSubmission.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Score Saved!",
          description: "Your result has been recorded locally in your browser.",
        });
        setLocation("/menu");
      },
      onError: (err) => {
        console.error("Submission error details:", err);
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* SCORE CARD */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 border-8 border-sky-100 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-yellow-100 p-6 rounded-full mb-6 relative">
            <Trophy size={64} className="text-yellow-600" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg"
            >
              {Math.round((score/total)*100)}%
            </motion.div>
          </div>
          
          <h1 className="text-4xl text-slate-800 mb-2">Quiz Complete!</h1>
          <p className="text-slate-500 mb-8">Great effort on your flight.</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 w-full border border-slate-100">
            <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Final Score</div>
            <div className="text-6xl font-display text-sky-600">
              {score}<span className="text-3xl text-slate-300">/{total}</span>
            </div>
          </div>
        </motion.div>

        {/* DATA FORM */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 border-4 border-white relative"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-sky-500" />
          
          <h2 className="text-2xl text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle className="text-green-500" /> Save Your Record
          </h2>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
              <input
                {...form.register("fullName")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                placeholder="Juan Dela Cruz"
              />
              {form.formState.errors.fullName && (
                <p className="text-red-500 text-xs">{form.formState.errors.fullName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Age</label>
                <input
                  type="number"
                  {...form.register("age")}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="17"
                />
                {form.formState.errors.age && (
                  <p className="text-red-500 text-xs">{form.formState.errors.age.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Grade</label>
                <select
                  {...form.register("grade", { valueAsNumber: true })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                >
                  <option value={11}>Grade 11</option>
                  <option value={12}>Grade 12</option>
                </select>
                {form.formState.errors.grade && (
                  <p className="text-red-500 text-xs">{form.formState.errors.grade.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Section</label>
              <input
                {...form.register("section")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                placeholder="STEM - A"
              />
              {form.formState.errors.section && (
                <p className="text-red-500 text-xs">{form.formState.errors.section.message}</p>
              )}
            </div>

            <GameButton 
              type="submit" 
              className="w-full flex justify-center items-center gap-2" 
              disabled={createSubmission.isPending}
            >
              {createSubmission.isPending ? "Saving..." : <><Save size={20} /> Submit Record</>}
            </GameButton>

            <GameButton 
              type="button"
              variant="secondary"
              className="w-full flex justify-center items-center gap-2 mt-4" 
              onClick={() => setLocation("/")}
            >
              <Home size={20} /> Back to Main Menu
            </GameButton>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
