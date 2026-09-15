import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Copy, 
  Check, 
  Send, 
  UserX, 
  Clock, 
  Mail,
  Flame
} from 'lucide-react';
import { calculateStudentOverall } from '../../utils/gradeCalculations';

export default function AtRiskStudentsList({
  students,
  groups,
  groupSubmissions,
  batchInfo,
  onOpenGradingModal
}) {
  const [copiedId, setCopiedId] = useState(null);
  const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));

  // Find at-risk students
  const atRiskStudents = students.map(s => ({
    student: s,
    calc: calculateStudentOverall(s, groupSubmissions, batchInfo)
  })).filter(item => item.calc.isAtRisk);

  const handleCopyNotice = (item) => {
    const s = item.student;
    const reasons = item.calc.atRiskReasons.join("\n- ");
    const text = `🚨 *ACADEMIC REMINDER - MANDATORY ENGLISH LAB (${batchInfo.courseCode})* 🚨\n\nDear ${s.name} (${s.rollNo}),\nYou have pending mandatory requirements:\n- ${reasons}\n\nPlease immediately log in to the English CR Hub or contact ${batchInfo.crName} to avoid grade forfeiture.`;

    navigator.clipboard.writeText(text);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-200 text-rose-800">
              Academic Intervention
            </span>
            <span className="text-xs font-bold text-rose-700">
              {atRiskStudents.length} Students Flagged
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-rose-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            At-Risk & Non-Compliant Student Monitor
          </h2>
          <p className="text-xs text-rose-800 mt-1 max-w-2xl">
            Students flagged here have either fallen below the mandatory 75% attendance in 30×30 speaking sessions or failed to book their 1:1 evaluation slot with {batchInfo.facultyName}.
          </p>
        </div>

        <div className="bg-white/80 p-4 rounded-2xl border border-rose-200 text-center shrink-0 min-w-[160px]">
          <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">At-Risk Rate</p>
          <p className="text-2xl font-black text-rose-950">
            {Math.round((atRiskStudents.length / students.length) * 100)}%
          </p>
          <p className="text-[11px] text-rose-600 font-semibold">{atRiskStudents.length} of {students.length} students</p>
        </div>
      </div>

      {/* At-Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {atRiskStudents.map(({ student, calc }) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-rose-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {student.rollNo}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {groupMap[student.groupId]}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {student.name}
                </h3>
                <p className="text-xs text-slate-400">{student.email}</p>
              </div>

              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                Action Required
              </span>
            </div>

            {/* Reasons flagged */}
            <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl space-y-1 text-xs">
              <p className="font-bold text-rose-900 text-[11px] uppercase tracking-wider">Flagged Deficiencies:</p>
              {calc.atRiskReasons.map((reason, idx) => (
                <p key={idx} className="text-rose-800 flex items-start gap-1.5 font-medium">
                  <span className="text-rose-500">•</span> {reason}
                </p>
              ))}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px]">30×30 Attendance</span>
                <span className={`text-sm font-black ${student.thirtyThirtyAttendancePct < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {student.thirtyThirtyAttendancePct}% ({student.thirtyThirtyDaysCompleted}d)
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px]">1:1 Feedback Status</span>
                <span className={`text-xs font-bold capitalize ${student.oneOnOne.status === 'unbooked' ? 'text-rose-600' : 'text-blue-600'}`}>
                  {student.oneOnOne.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <button
                onClick={() => handleCopyNotice({ student, calc })}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                {copiedId === student.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied WhatsApp Reminder!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Reminder Notice
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenGradingModal("oneOnOne", student, `${student.rollNo} • ${student.name}`, student.id)}
                className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-colors"
              >
                Inspect Record
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
