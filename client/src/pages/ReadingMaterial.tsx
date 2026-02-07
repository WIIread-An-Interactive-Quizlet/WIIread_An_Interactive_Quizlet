import { GameButton } from "@/components/GameButton";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

export default function ReadingMaterial() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border-8 border-white relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300" />
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-amber-100 p-4 rounded-2xl text-amber-600">
              <BookOpen size={40} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl text-slate-800 mb-1">Study Time</h2>
              <p className="text-slate-500 font-medium">Read carefully! The quiz is based on this text.</p>
            </div>
          </div>

          <div className="bg-amber-50 p-8 rounded-2xl border-2 border-amber-100 shadow-inner">
            <h3 className="text-2xl font-display text-amber-900 mb-6 text-center">
              Senior High School: Transitioning to Crucial Decisions
            </h3>
            
            <div className="prose prose-lg prose-amber max-w-none font-body text-slate-700 leading-relaxed space-y-8">
              <section>
                <h4 className="text-xl font-display text-amber-800 mb-2">Part I: Decisions and Choices</h4>
                <p className="indent-8 text-justify">
                  Decisions and choices are the things that set senior high school apart from junior high school. 
                  Graduates have shared that deciding on the strand/track to take is just the beginning of creating choices. 
                  As we move to the next level, more critical choices are made.
                </p>
                <p className="indent-8 text-justify">
                  Entering Grade 12 marks the next crucial step in life—choosing the curricular exit. 
                  Curricular exits are the paths that learners take after they finish their senior high school. 
                  These exits include <strong className="text-amber-700">higher education</strong>, 
                  <strong className="text-amber-700">middle level skills development</strong>, 
                  <strong className="text-amber-700">entrepreneurship</strong>, and 
                  <strong className="text-amber-700">employment</strong>.
                </p>
              </section>

              <section>
                <h4 className="text-xl font-display text-amber-800 mb-2">Part II: Digital Impact on Reading</h4>
                <p className="indent-8 text-justify">
                  In recent years, students have been spending more time on digital devices, whether for school, entertainment, or social communication. 
                  While technology offers many benefits, excessive screen time can affect how often students engage in traditional reading. 
                  Some students find it difficult to focus on printed texts after long hours of scrolling through fast-moving content. 
                  This shift in habit may reduce their ability to understand more complex materials, especially those that require deeper concentration. 
                  Therefore, it is essential for students to balance their screen use with meaningful reading routines to maintain their cognitive and analytical skills.
                </p>
              </section>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <GameButton 
              onClick={() => setLocation("/game-intro")} 
              size="lg"
              variant="secondary"
              className="flex items-center gap-3"
            >
              Play Game <ArrowRight size={24} />
            </GameButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
