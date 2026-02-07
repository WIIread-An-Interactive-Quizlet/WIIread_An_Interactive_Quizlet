import { GameButton } from "@/components/GameButton";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Database, RotateCcw, LogOut } from "lucide-react";

export default function MainMenu() {
  const [_, setLocation] = useLocation();

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      window.close(); // Only works if opened via script, otherwise redirects
      setLocation("/");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl text-white text-shadow-lg mb-12"
        >
          Main Menu
        </motion.h1>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.div variants={item}>
            <GameButton 
              onClick={() => setLocation("/data")} 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-3"
            >
              <Database /> See Data
            </GameButton>
          </motion.div>

          <motion.div variants={item}>
            <GameButton 
              onClick={() => setLocation("/")} 
              variant="primary" 
              className="w-full flex items-center justify-center gap-3"
            >
              <RotateCcw /> Play Again
            </GameButton>
          </motion.div>

          <motion.div variants={item}>
            <GameButton 
              onClick={handleExit} 
              variant="danger" 
              className="w-full flex items-center justify-center gap-3"
            >
              <LogOut /> Exit
            </GameButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
