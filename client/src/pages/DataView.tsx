import { GameButton } from "@/components/GameButton";
import { useLocation } from "wouter";
import { useSubmissions } from "@/hooks/use-submissions";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { useState } from "react";

export default function DataView() {
  const [_, setLocation] = useLocation();
  const { data: submissions, isLoading, isError } = useSubmissions();
  const [filter, setFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState<number | null>(null);

  const filteredData = submissions?.filter(sub => {
    const matchesGrade = gradeFilter === null || sub.grade === gradeFilter;
    const matchesSearch = filter === "" || 
      sub.fullName.toLowerCase().includes(filter.toLowerCase()) || 
      sub.section.toLowerCase().includes(filter.toLowerCase()) ||
      sub.grade.toString().includes(filter);
    return matchesGrade && matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <GameButton onClick={() => setLocation("/menu")} size="sm" variant="secondary" className="flex items-center gap-2 self-start">
            <ArrowLeft size={16} /> Back to Menu
          </GameButton>
          
          <h1 className="text-3xl text-white text-shadow font-display">Student Records</h1>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white min-h-[600px] flex flex-col"
        >
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, grade or section..." 
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradeFilter(gradeFilter === 11 ? null : 11)}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    gradeFilter === 11 
                      ? 'bg-sky-500 text-white ring-2 ring-sky-300' 
                      : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                  }`}
                >
                  G11: {submissions?.filter(s => s.grade === 11).length || 0}
                </button>
                <button
                  onClick={() => setGradeFilter(gradeFilter === 12 ? null : 12)}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    gradeFilter === 12 
                      ? 'bg-indigo-500 text-white ring-2 ring-indigo-300' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  G12: {submissions?.filter(s => s.grade === 12).length || 0}
                </button>
                {gradeFilter !== null && (
                  <button
                    onClick={() => setGradeFilter(null)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600 hover:bg-slate-300 cursor-pointer transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="text-sm text-slate-500 font-bold whitespace-nowrap">
              Total Records: {filteredData.length}
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sky-50 text-sky-900 font-display">
                  <th className="p-4 border-b border-sky-100">ID</th>
                  <th className="p-4 border-b border-sky-100">Full Name</th>
                  <th className="p-4 border-b border-sky-100">Age</th>
                  <th className="p-4 border-b border-sky-100">Grade</th>
                  <th className="p-4 border-b border-sky-100">Section</th>
                  <th className="p-4 border-b border-sky-100 text-center">Score</th>
                  <th className="p-4 border-b border-sky-100 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      <div className="flex justify-center mb-2"><Loader2 className="animate-spin" /></div>
                      Loading records...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-red-400">
                      Failed to load data. Please try again.
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((sub, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={sub.id} 
                      className="hover:bg-slate-50 transition-colors border-b border-slate-50 text-slate-600"
                    >
                      <td className="p-4 font-mono text-xs text-slate-400">#{sub.id}</td>
                      <td className="p-4 font-bold text-slate-700">{sub.fullName}</td>
                      <td className="p-4">{sub.age}</td>
                      <td className="p-4"><span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-md text-xs font-bold uppercase">Grade {sub.grade}</span></td>
                      <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-bold uppercase">{sub.section}</span></td>
                      <td className="p-4 text-center">
                        <span className={`font-bold ${sub.score >= sub.totalQuestions / 2 ? "text-green-500" : "text-amber-500"}`}>
                          {sub.score}/{sub.totalQuestions}
                        </span>
                      </td>
                      <td className="p-4 text-center text-sm text-slate-400">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "-"}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
