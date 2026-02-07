import { GameButton } from "@/components/GameButton";
import { useLocation } from "wouter";
import { Cloud, Bird } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ x: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-20 left-10 text-white/40"
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ x: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute top-40 right-20 text-white/30"
      >
        <Cloud size={80} fill="currentColor" />
      </motion.div>

      <div className="z-10 text-center max-w-2xl w-full">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-yellow-400 p-6 rounded-full border-4 border-yellow-600 shadow-xl"
            >
              <Bird size={64} className="text-yellow-900" strokeWidth={2.5} />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl text-sky-600 text-shadow-lg mb-4 drop-shadow-sm">
            WIIread
          </h1>
          <p className="text-2xl md:text-3xl text-sky-800 font-display opacity-90">
            An Interactive Quizlet
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/60"
        >
          <GameButton 
            onClick={() => setLocation("/consent")} 
            size="lg" 
            className="w-full md:w-auto min-w-[250px]"
          >
            Start Adventure
          </GameButton>
          
          <div className="mt-8 text-sm text-slate-500 font-medium">
            <p>Use WASD or Arrow Keys to fly!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
