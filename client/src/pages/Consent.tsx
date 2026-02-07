import { GameButton } from "@/components/GameButton";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, XCircle } from "lucide-react";

export default function Consent() {
  const [_, setLocation] = useLocation();

  const handleAgree = () => {
    setLocation("/reading");
  };

  const handleDecline = () => {
    // In a real app, this might redirect externally or show a goodbye screen
    alert("You must agree to continue.");
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border-4 border-white"
      >
        <div className="bg-sky-100 p-6 border-b border-sky-200 flex items-center gap-4">
          <div className="bg-sky-500 p-3 rounded-xl text-white">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="text-2xl text-sky-900">User Consent Form</h2>
            <p className="text-sky-700 text-sm font-medium">Please read carefully before proceeding</p>
          </div>
        </div>

        <div className="p-8 h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="prose prose-sky max-w-none font-body text-slate-600">
            <p className="lead">By using this service, you agree to the following terms:</p>
            
            <h3 className="text-sky-800 font-display mt-6">1. Acceptance</h3>
            <p>By clicking 'I Agree', you consent to our collection and use of your data as described in this policy.</p>

            <h3 className="text-sky-800 font-display mt-6">2. Information We Collect</h3>
            <p>We collect your full name, age, and grade/section for the purpose of recording quiz scores.</p>

            <h3 className="text-sky-800 font-display mt-6">3. How We Use Your Information</h3>
            <p>We use this information to analyze trends in student performance and improve our educational materials.</p>

            <h3 className="text-sky-800 font-display mt-6">4. Data Storage & Security</h3>
            <p>Your data is stored securely in our database. We implement industry-standard security measures to protect against unauthorized access.</p>

            <h3 className="text-sky-800 font-display mt-6">5. Sharing Information</h3>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>

            <h3 className="text-sky-800 font-display mt-6">6. Data Retention</h3>
            <p>We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.</p>

            <h3 className="text-sky-800 font-display mt-6">7. Your Rights</h3>
            <p>You have the right to request access to the data we hold about you, or request correction or deletion of your data.</p>

            <h3 className="text-sky-800 font-display mt-6">8. Final Agreement</h3>
            <p>By clicking "I Agree" below, you confirm that you have read, understood, and voluntarily consent to these terms.</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-4">
          <GameButton variant="danger" onClick={handleDecline} className="flex items-center gap-2">
            <XCircle size={20} /> Decline
          </GameButton>
          <GameButton variant="primary" onClick={handleAgree} className="flex items-center gap-2">
            <ShieldCheck size={20} /> I Agree
          </GameButton>
        </div>
      </motion.div>
    </div>
  );
}
