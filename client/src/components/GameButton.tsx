import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
}

export function GameButton({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  disabled,
  ...props 
}: GameButtonProps) {
  
  const variants = {
    primary: "bg-sky-500 text-white shadow-sky-700/30 border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 hover:bg-sky-400",
    secondary: "bg-amber-400 text-amber-950 shadow-amber-600/30 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 hover:bg-amber-300",
    accent: "bg-pink-400 text-white shadow-pink-600/30 border-b-4 border-pink-600 active:border-b-0 active:translate-y-1 hover:bg-pink-300",
    danger: "bg-red-400 text-white shadow-red-600/30 border-b-4 border-red-600 active:border-b-0 active:translate-y-1 hover:bg-red-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-8 py-4 text-xl rounded-2xl",
    lg: "px-12 py-6 text-2xl rounded-3xl",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(
        "font-bold font-display uppercase tracking-wider transition-colors relative outline-none focus:ring-4 focus:ring-white/50",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed grayscale",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
