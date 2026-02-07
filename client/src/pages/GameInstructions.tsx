import { GameButton } from "@/components/GameButton";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Move, Cloud, Clock, Heart } from "lucide-react";

export default function GameInstructions() {
  const [_, setLocation] = useLocation();

  const instructions = [
    {
      icon: <Move size={40} className="text-sky-500" />,
      title: "Control the Bird",
      desc: "Use WASD or Arrow Keys to fly up, down, left, and right."
    },
    {
      icon: <Cloud size={40} className="text-slate-400" />,
      title: "Catch Answers",
      desc: "Fly into the cloud that has the CORRECT answer."
    },
    {
      icon: <Clock size={40} className="text-amber-500" />,
      title: "Beat the Clock",
      desc: "You have 20 seconds for each question."
    },
    {
      icon: <Heart size={40} className="text-pink-500" />,
      title: "Watch Your Lives",
      desc: "Wrong answers or running out of time costs you a life!"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl text-center text-white text-shadow-lg mb-12">
          How to Play
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {instructions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl flex items-start gap-4"
            >
              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-display text-slate-800 mb-1">{item.title}</h3>
                <p className="text-slate-600 leading-snug">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <GameButton 
            onClick={() => setLocation("/game")} 
            size="lg" 
            className="animate-pulse shadow-2xl"
          >
            Start Quiz!
          </GameButton>
        </div>
      </div>
    </div>
  );
}
