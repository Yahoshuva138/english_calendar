import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileSpreadsheet
} from 'lucide-react';
import Badge from '../common/Badge';
import { calculateStudentOverall } from '../../utils/gradeCalculations';
import { exportGradebookToCSV } from '../../utils/exportCsv';

export default function MasterGradebook({
  students,
  groups,
  groupSubmissions,
  batchInfo,
  onOpenGradingModal
}) {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all"); // "all" | "atRisk" | "passing"

  const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));

  const filteredStudents = students.filter(student => {
    const calc = calculateStudentOverall(student, groupSubmissions, batchInfo);

    if (groupFilter !== "all" && student.groupId !== groupFilter) return false;
    if (riskFilter === "atRisk" && !calc.isAtRisk) return false;
    if (riskFilter === "passing" && calc.isAtRisk) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        student.name.toLowerCase().includes(q) ||
        student.rollNo.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    exportGradebookToCSV(students, groups, groupSubmissions, batchInfo);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-brand-600" />
            Batch Master Gradebook & Transcripts
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official consolidated grades across all 4 mandatory English pillars. Ready for department submission.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export to Excel / CSV
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Group Filter */}
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          >
            <option value="all">All Groups (G1 - G6)</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          {/* At-Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          >
            <option value="all">All Students ({students.length})</option>
            <option value="atRisk">⚠️ At-Risk Only (&lt;75% Attendance or Missing 1:1)</option>
            <option value="passing">Good Academic Standing</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-3">Group</th>
                <th className="py-3.5 px-3 text-center">1:1 Feedback (/25)</th>
                <th className="py-3.5 px-3 text-center">30×30 Streak (/25)</th>
                <th className="py-3.5 px-3 text-center">Conditionals (/25)</th>
                <th className="py-3.5 px-3 text-center">Storytelling (/25)</th>
                <th className="py-3.5 px-3 text-center">Total (/100)</th>
                <th className="py-3.5 px-3 text-center">Grade</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map(student => {
                const calc = calculateStudentOverall(student, groupSubmissions, batchInfo);
                const condSub = groupSubmissions.conditionals?.[student.groupId];
                const storySub = groupSubmissions.storytelling?.[student.groupId];

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{student.name}</span>
                            {student.isCoordinator && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold">
                                CR/Lead
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">{student.rollNo}</span>
                          {calc.isAtRisk && (
                            <span className="ml-2 inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                              ⚠️ At-Risk
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Group */}
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {student.groupId}
                      </span>
                    </td>

                    {/* 1:1 Feedback */}
                    <td className="py-3.5 px-3 text-center">
                      {student.oneOnOne.status === 'graded' ? (
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {student.oneOnOne.totalScore}
                        </span>
                      ) : student.oneOnOne.status === 'scheduled' ? (
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          Booked
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                          Unbooked
                        </span>
                      )}
                    </td>

                    {/* 30x30 */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`font-bold ${calc.isThirtyThirtyPassing ? 'text-slate-800' : 'text-rose-600'}`}>
                          {calc.thirtyThirtyScore} / 25
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {student.thirtyThirtyDaysCompleted}d ({student.thirtyThirtyAttendancePct}%)
                        </span>
                      </div>
                    </td>

                    {/* Conditionals */}
                    <td className="py-3.5 px-3 text-center">
                      {condSub?.status === 'graded' ? (
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {condSub.totalScore}
                        </span>
                      ) : condSub?.status === 'submitted' ? (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Submitted
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Pending</span>
                      )}
                    </td>

                    {/* Storytelling */}
                    <td className="py-3.5 px-3 text-center">
                      {storySub?.status === 'graded' ? (
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {storySub.totalScore}
                        </span>
                      ) : storySub?.status === 'submitted' ? (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Submitted
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Pending</span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="text-sm font-black text-slate-900">
                        {calc.fullScoreEarned}
                      </span>
                    </td>

                    {/* Letter Grade */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="text-xs font-bold text-brand-700">
                        {calc.letterGrade.split(' ')[0]}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onOpenGradingModal("oneOnOne", student, `${student.rollNo} • ${student.name}`, student.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Grade 1:1
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
