import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { GameButton } from "@/components/GameButton";
import { Cloud } from "@/components/Cloud";
import { Heart, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- GAME CONFIG ---
const QUESTIONS = [
  // PART I (20s)
  {
    part: 1,
    time: 20,
    question: "What is considered a crucial step that requires a good decision for senior high school learners?",
    answers: [
      { text: "Choosing the curricular exit", isCorrect: false },
      { text: "Deciding on the course to take", isCorrect: false },
      { text: "Planning one's ambition", isCorrect: false },
      { text: "Selecting the track or strand", isCorrect: true },
    ]
  },
  {
    part: 1,
    time: 20,
    question: "What can learners expect as they move to the next level?",
    answers: [
      { text: "A hectic schedule", isCorrect: false },
      { text: "A new environment", isCorrect: false },
      { text: "More difficult subjects", isCorrect: false },
      { text: "More critical decisions", isCorrect: true },
    ]
  },
  {
    part: 1,
    time: 20,
    question: "For whom is the paragraph written?",
    answers: [
      { text: "Parents", isCorrect: false },
      { text: "Teachers", isCorrect: false },
      { text: "College students", isCorrect: false },
      { text: "Senior high school students", isCorrect: true },
    ]
  },
  {
    part: 1,
    time: 20,
    question: "After senior high school, what are learners expected to become as implied in the paragraph?",
    answers: [
      { text: "Decisive learners", isCorrect: true },
      { text: "Mature individuals", isCorrect: false },
      { text: "Students with awareness", isCorrect: false },
      { text: "Prepared college students", isCorrect: false },
    ]
  },
  {
    part: 1,
    time: 20,
    question: "What is the best title for the paragraph?",
    answers: [
      { text: "Realities about Life in College", isCorrect: false },
      { text: "Decision-Making in Senior High School", isCorrect: false },
      { text: "Decisions and Choices in Junior High School", isCorrect: false },
      { text: "Senior High School: Transitioning to Crucial Decisions", isCorrect: true },
    ]
  },
  // PART II (15s)
  {
    part: 2,
    time: 15,
    question: "Students today spend increasing amounts of time using digital __________.",
    answers: [
      { text: "Notebooks", isCorrect: false },
      { text: "Devices", isCorrect: true },
      { text: "Posters", isCorrect: false },
      { text: "Newspapers", isCorrect: false },
    ]
  },
  {
    part: 2,
    time: 15,
    question: "Excessive screen time can affect how often students engage in __________ reading.",
    answers: [
      { text: "Traditional", isCorrect: true },
      { text: "Scientific", isCorrect: false },
      { text: "Competitive", isCorrect: false },
      { text: "Creative", isCorrect: false },
    ]
  },
  {
    part: 2,
    time: 15,
    question: "Many students struggle to __________ on printed texts after long hours online.",
    answers: [
      { text: "Laugh", isCorrect: false },
      { text: "Agree", isCorrect: false },
      { text: "Focus", isCorrect: true },
      { text: "Repeat", isCorrect: false },
    ]
  },
  {
    part: 2,
    time: 15,
    question: "Fast-moving content may reduce their ability to understand more __________ materials.",
    answers: [
      { text: "Complex", isCorrect: true },
      { text: "Colorful", isCorrect: false },
      { text: "Simple", isCorrect: false },
      { text: "Short", isCorrect: false },
    ]
  },
  {
    part: 2,
    time: 15,
    question: "Students must balance screen use with meaningful reading __________.",
    answers: [
      { text: "Devices", isCorrect: false },
      { text: "Routines", isCorrect: true },
      { text: "Experiments", isCorrect: false },
      { text: "Answers", isCorrect: false },
    ]
  },
  // PART III (10s)
  {
    part: 3,
    time: 10,
    question: "If she _______ earlier, she wouldn’t have missed the train.",
    answers: [
      { text: "Leaves", isCorrect: false },
      { text: "Left", isCorrect: false },
      { text: "Had left", isCorrect: true },
      { text: "Will leave", isCorrect: false },
    ]
  },
  {
    part: 3,
    time: 10,
    question: "Identify the correct sentence:",
    answers: [
      { text: "Neither of the boys are going to the library.", isCorrect: false },
      { text: "Neither of the boys is going to the library.", isCorrect: true },
      { text: "Neither of the boys were going to the library.", isCorrect: false },
      { text: "Neither of the boys be going to the library.", isCorrect: false },
    ]
  },
  {
    part: 3,
    time: 10,
    question: "He is very good ______ solving complex math problems.",
    answers: [
      { text: "In", isCorrect: false },
      { text: "At", isCorrect: true },
      { text: "On", isCorrect: false },
      { text: "For", isCorrect: false },
    ]
  },
  {
    part: 3,
    time: 10,
    question: "Choose the sentence with correct subject-verb agreement.",
    answers: [
      { text: "The group of students are meeting in the auditorium.", isCorrect: false },
      { text: "The group of students is meeting in the auditorium.", isCorrect: true },
      { text: "The group of students be meeting in the auditorium.", isCorrect: false },
      { text: "The group of students were meeting in the auditorium.", isCorrect: false },
    ]
  },
  {
    part: 3,
    time: 10,
    question: "Choose the correct answer: This is the ______ movie I have ever seen.",
    answers: [
      { text: "More interesting", isCorrect: false },
      { text: "Most interesting", isCorrect: true },
      { text: "Interestinger", isCorrect: false },
      { text: "Interestingest", isCorrect: false },
    ]
  }
];

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 40;
const CLOUD_WIDTH = 200;
const CLOUD_HEIGHT = 100;
const PLAYER_SPEED = 5;
const CLOUD_SPEED = 2;
const MAX_LIVES = 3;

export default function GameEngine() {
  const [_, setLocation] = useLocation();
  const [gameState, setGameState] = useState<"PLAYING" | "TRANSITION" | "GAME_OVER">("PLAYING");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(QUESTIONS[0].time);
  const [score, setScore] = useState(0);
  
  // Player Position
  const [playerPos, setPlayerPos] = useState({ x: 50, y: GAME_HEIGHT / 2 });
  
  // Cloud Positions (Spawned per question)
  const [clouds, setClouds] = useState<Array<{ id: number, x: number, y: number, text: string, isCorrect: boolean }>>([]);

  const requestRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const playerPosRef = useRef({ x: 50, y: GAME_HEIGHT / 2 });
  const hasAnsweredRef = useRef(false);
  const gameStartTimeRef = useRef<number>(0);
  const questionIdxRef = useRef(0);

  // --- CONTROLS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keysPressed.current.add(e.code);
    const handleKeyUp = (e: KeyboardEvent) => keysPressed.current.delete(e.code);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // --- SPAWN CLOUDS ---
  const spawnCloudsForQuestion = (questionIdx: number) => {
    const currentQ = QUESTIONS[questionIdx];
    const spacing = GAME_HEIGHT / (currentQ.answers.length + 1);
    
    const newClouds = currentQ.answers.map((ans, idx) => ({
      id: idx,
      x: GAME_WIDTH + 50,
      y: spacing * (idx + 1) - (CLOUD_HEIGHT / 2),
      text: ans.text,
      isCorrect: ans.isCorrect
    }));
    setClouds(newClouds);
    setTimeLeft(currentQ.time);
    setPlayerPos({ x: 50, y: GAME_HEIGHT / 2 });
    playerPosRef.current = { x: 50, y: GAME_HEIGHT / 2 };
    hasAnsweredRef.current = false;
    gameStartTimeRef.current = performance.now();
  };

  // Initial spawn on mount
  useEffect(() => {
    if (gameState === "PLAYING") {
      spawnCloudsForQuestion(currentQuestionIdx);
      questionIdxRef.current = currentQuestionIdx;
    }
  }, []);

  // --- TIMER ---
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    const timer = setInterval(() => {
      if (hasAnsweredRef.current) return;
      setTimeLeft(prev => {
        if (prev <= 1 && !hasAnsweredRef.current) {
          hasAnsweredRef.current = true;
          setTimeout(() => handleAnswer(false), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, currentQuestionIdx]);


  // Separate Effect for loop to manage frame updates with smooth cloud movement
  useEffect(() => {
    const loop = () => {
      if (gameState === "PLAYING") {
        // Update player position
        setPlayerPos(currPlayer => {
          let { x, y } = currPlayer;
          if (keysPressed.current.has("ArrowUp") || keysPressed.current.has("KeyW")) y -= PLAYER_SPEED;
          if (keysPressed.current.has("ArrowDown") || keysPressed.current.has("KeyS")) y += PLAYER_SPEED;
          if (keysPressed.current.has("ArrowLeft") || keysPressed.current.has("KeyA")) x -= PLAYER_SPEED;
          if (keysPressed.current.has("ArrowRight") || keysPressed.current.has("KeyD")) x += PLAYER_SPEED;
          
          x = Math.max(0, Math.min(GAME_WIDTH - BIRD_SIZE, x));
          y = Math.max(0, Math.min(GAME_HEIGHT - BIRD_SIZE, y));
          
          playerPosRef.current = { x, y };
          return { x, y };
        });

        // Smooth cloud movement based on elapsed time
        const elapsed = (performance.now() - gameStartTimeRef.current) / 1000;
        const currentQ = QUESTIONS[questionIdxRef.current];
        const totalDistance = GAME_WIDTH + 100 + CLOUD_WIDTH;
        const progress = Math.min(elapsed / currentQ.time, 1);
        const targetX = (GAME_WIDTH + 100) - (progress * totalDistance);

        setClouds(currClouds => {
          const newClouds = currClouds.map(c => ({ ...c, x: targetX }));
          
          // Fly-over detection: if ALL clouds have passed the bird
          const allCloudsPassedBird = newClouds.length > 0 && 
            newClouds.every(c => (c.x + CLOUD_WIDTH) < playerPosRef.current.x);
          
          if (allCloudsPassedBird && !hasAnsweredRef.current) {
            setTimeout(() => handleAnswer(false), 0);
          }
          
          return newClouds;
        });

        requestRef.current = requestAnimationFrame(loop);
      }
    };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [gameState]);

  // Collision Check Effect (runs on every render/state update)
  useEffect(() => {
    if (gameState !== "PLAYING" || hasAnsweredRef.current) return;

    const playerRect = { 
      l: playerPos.x, 
      r: playerPos.x + BIRD_SIZE, 
      t: playerPos.y, 
      b: playerPos.y + BIRD_SIZE 
    };

    for (const cloud of clouds) {
      const cloudRect = {
        l: cloud.x + 20,
        r: cloud.x + CLOUD_WIDTH - 20,
        t: cloud.y + 20,
        b: cloud.y + CLOUD_HEIGHT - 20
      };

      if (
        playerRect.l < cloudRect.r &&
        playerRect.r > cloudRect.l &&
        playerRect.t < cloudRect.b &&
        playerRect.b > cloudRect.t
      ) {
        handleAnswer(cloud.isCorrect);
        break;
      }
    }
  }, [playerPos, clouds, gameState]);


  const handleAnswer = (isCorrect: boolean) => {
    if (gameState !== "PLAYING" || hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    setGameState("TRANSITION");
    
    const newScore = isCorrect ? score + 1 : score;
    const newLives = isCorrect ? Math.min(lives + 1, MAX_LIVES) : lives - 1;
    
    setScore(newScore);
    setLives(newLives);

    const nextQuestionIdx = questionIdxRef.current + 1;

    setTimeout(() => {
      if (newLives <= 0) {
        finishGame(false, newScore);
      } else if (nextQuestionIdx >= QUESTIONS.length) {
        finishGame(true, newScore);
      } else {
        questionIdxRef.current = nextQuestionIdx;
        setCurrentQuestionIdx(nextQuestionIdx);
        spawnCloudsForQuestion(nextQuestionIdx);
        setGameState("PLAYING");
      }
    }, 1500);
  };

  const finishGame = (completed: boolean, finalScore: number) => {
    setGameState("GAME_OVER");
    setTimeout(() => {
      setLocation(`/results?score=${finalScore}&total=${QUESTIONS.length}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
      
      {/* HUD */}
      <div className="w-full max-w-[800px] flex justify-between items-center mb-4 text-white">
        <div className="flex flex-col gap-1">
          <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
            Part {QUESTIONS[currentQuestionIdx].part}
          </div>
          <div className="flex gap-2">
            {[...Array(MAX_LIVES)].map((_, i) => (
              <Heart 
                key={i} 
                fill={i < lives ? "#ef4444" : "none"} 
                className={i < lives ? "text-red-500" : "text-slate-600"} 
                size={20}
              />
            ))}
          </div>
        </div>
        <div className="text-xl font-bold bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
          Q: {currentQuestionIdx + 1}/{QUESTIONS.length}
        </div>
        <div className="flex items-center gap-2 text-xl font-bold">
          <Clock className={timeLeft < 5 ? "text-red-400 animate-pulse" : "text-white"} />
          <span className={timeLeft < 5 ? "text-red-400" : "text-white"}>{timeLeft}s</span>
        </div>
      </div>

      {/* QUESTION BANNER */}
      <div className="w-full max-w-[800px] bg-white rounded-t-2xl p-6 text-center border-b-4 border-slate-100 min-h-[120px] flex items-center justify-center relative z-20">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
          {QUESTIONS[currentQuestionIdx].question}
        </h2>
      </div>

      {/* GAME AREA */}
      <div 
        ref={gameAreaRef}
        className="relative bg-gradient-to-b from-sky-300 to-sky-100 overflow-hidden shadow-2xl rounded-b-2xl"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, maxWidth: '100%' }}
      >
        {gameState === "TRANSITION" && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white text-shadow-lg">
              Next Question...
            </h2>
          </div>
        )}

        {/* Player */}
        <div
          className="absolute z-20 transition-transform duration-75"
          style={{ 
            left: playerPos.x, 
            top: playerPos.y,
            width: BIRD_SIZE,
            height: BIRD_SIZE,
            transform: `rotate(${keysPressed.current.has("ArrowUp") ? -20 : keysPressed.current.has("ArrowDown") ? 20 : 0}deg)`
          }}
        >
          {/* Bird SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="50" r="45" fill="#FCD34D" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#D97706" strokeWidth="5" />
            <circle cx="70" cy="40" r="8" fill="black" />
            <path d="M 75 55 Q 85 65 75 75" stroke="#D97706" strokeWidth="3" fill="none" />
            <path d="M 10 50 Q -10 30 10 10" fill="#F59E0B" /> {/* Wing */}
            <polygon points="90,50 100,55 90,60" fill="#F97316" /> {/* Beak */}
          </svg>
        </div>

        {/* Clouds */}
        <AnimatePresence>
          {clouds.map(cloud => (
            <Cloud
              key={`${currentQuestionIdx}-${cloud.id}`}
              {...cloud}
              width={CLOUD_WIDTH}
              height={CLOUD_HEIGHT}
            />
          ))}
        </AnimatePresence>

        {/* Instructions Overlay (Mobile) */}
        <div className="absolute bottom-4 left-4 text-white/50 text-xs pointer-events-none md:hidden">
          Tap areas to move? (This needs touch controls for mobile really, but requirements specified WASD/Keys)
        </div>
      </div>
      
      {/* Mobile Controls Hint */}
      <div className="mt-4 text-slate-400 text-sm md:hidden">
        * Keyboard required for this game version
      </div>

    </div>
  );
}
