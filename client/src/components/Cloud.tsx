import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CloudProps {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  variant?: "white" | "stormy";
}

export function Cloud({ text, x, y, width, height, variant = "white" }: CloudProps) {
  return (
    <div
      className="absolute flex items-center justify-center p-4 text-center select-none"
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        zIndex: 10,
      }}
    >
      {/* Cloud Visual */}
      <div className={cn(
        "absolute inset-0 rounded-full shadow-lg border-b-4 border-black/5 transition-colors duration-300",
        variant === "white" ? "bg-white/95" : "bg-slate-200"
      )}>
        {/* Decorative puffs */}
        <div className={cn("absolute -top-4 left-4 w-12 h-12 rounded-full", variant === "white" ? "bg-white/95" : "bg-slate-200")} />
        <div className={cn("absolute -top-6 left-12 w-16 h-16 rounded-full", variant === "white" ? "bg-white/95" : "bg-slate-200")} />
        <div className={cn("absolute -top-4 right-4 w-14 h-14 rounded-full", variant === "white" ? "bg-white/95" : "bg-slate-200")} />
      </div>

      {/* Text Content */}
      <span className="relative z-10 font-bold text-slate-700 text-sm md:text-base leading-tight font-body pointer-events-none">
        {text}
      </span>
    </div>
  );
}
