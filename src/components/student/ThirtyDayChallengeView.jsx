import React, { useState } from 'react';
import { 
  Flame, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  PlusCircle, 
  MessageSquare,
  Sparkles,
  BookOpen
} from 'lucide-react';
import Badge from '../common/Badge';

export default function ThirtyDayChallengeView({
  student,
  group,
  allStudentsInGroup,
  batchInfo,
  logs,
  onLogSession
}) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDay, setSelectedDay] = useState(
    Math.min(30, (student.thirtyThirtyDaysCompleted || 0) + 1)
  );
  const [attendedIds, setAttendedIds] = useState(
    allStudentsInGroup.map(s => s.id)
  );

  const completedDays = student.thirtyThirtyDaysCompleted || 0;
  const attendancePct = student.thirtyThirtyAttendancePct || 0;
  const isPassing = attendancePct >= (batchInfo.minAttendancePercent || 75);

  const promptSuggestions = [
    "Defending a controversial thesis in 90 seconds",
    "Pronunciation clinic: Vowel length & diphthongs",
    "Workplace roleplay: Politely declining an unreasonable deadline",
    "Story structure: Delivering a punchline with dramatic pauses",
    "Explaining a technical concept (e.g. APIs) without any jargon"
  ];

  const handleToggleStudent = (id) => {
    setAttendedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    onLogSession(group.id, student.id, {
      day: selectedDay,
      date: new Date().toISOString().split("T")[0],
      topic: topic.trim(),
      notes: notes.trim(),
      attendedStudentIds: attendedIds
    });

    setTopic("");
    setNotes("");
    setShowLogModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Challenge Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                Activity #2 • Daily Group Challenge
              </span>
              <Badge status={student.thirtyThirtyStatus} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500" />
              30 Minutes × 30 Days English Challenge
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Mandatory daily sustained speaking practice with <span className="font-semibold text-slate-800">{group?.name}</span>.
              Convene for 30 minutes each day, tackle conversation prompts, and maintain consistency. Minimum attendance: <span className="font-bold text-slate-800">{batchInfo.minAttendancePercent || 75}%</span>.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Weightage</p>
            <p className="text-2xl font-black text-amber-950">25 Marks</p>
            <p className="text-[11px] text-amber-700 font-medium">Streak & Log Quality</p>
          </div>
        </div>
      </div>

      {/* Group Stats & Attendance Health */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Days Logged</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">{completedDays}</span>
            <span className="text-sm font-semibold text-slate-400">/ 30 Days</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(completedDays / 30) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Your Attendance</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-black ${isPassing ? 'text-emerald-600' : 'text-rose-600'}`}>
              {attendancePct}%
            </span>
            <span className="text-xs font-semibold text-slate-400">Target: {batchInfo.minAttendancePercent || 75}%</span>
          </div>
          <p className="text-xs mt-2 font-medium text-slate-500">
            {isPassing ? "✅ You meet the attendance threshold." : "⚠️ Below 75% cutoff — attend remaining syncs!"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Group Members ({allStudentsInGroup.length})</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {allStudentsInGroup.map(mem => (
                <span 
                  key={mem.id}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-semibold border ${
                    mem.id === student.id 
                      ? 'bg-brand-50 text-brand-700 border-brand-200' 
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {mem.name.split(' ')[0]} {mem.isCoordinator ? '👑' : ''}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setShowLogModal(true)}
            className="mt-3 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Log Daily Session
          </button>
        </div>
      </div>

      {/* 30-Day Streak Visual Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">30-Day Calendar Tracker</h3>
            <p className="text-xs text-slate-500">Click any logged day to see prompt details or record today's sync.</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Today
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Upcoming
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5 pt-2">
          {Array.from({ length: 30 }, (_, i) => {
            const dayNum = i + 1;
            const isDone = dayNum <= completedDays;
            const isToday = dayNum === completedDays + 1;

            return (
              <div
                key={dayNum}
                className={`h-16 rounded-xl border flex flex-col items-center justify-center text-center p-1 transition-all ${
                  isDone
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold shadow-xs"
                    : isToday
                    ? "bg-amber-50 border-amber-300 text-amber-800 font-bold ring-2 ring-amber-400/50 animate-pulse"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                <span className="text-[10px] uppercase font-semibold">Day</span>
                <span className="text-base font-extrabold">{dayNum}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                ) : isToday ? (
                  <Clock className="w-3.5 h-3.5 text-amber-600 mt-0.5" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Group Logs Stream */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Recent Session Logs for {group?.name}</h3>

        {logs && logs.length > 0 ? (
          <div className="space-y-3">
            {logs.map((log, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-800">
                      Day {log.day}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {log.date}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {log.attendedStudentIds?.length || 0} / {allStudentsInGroup.length} Attended
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900">{log.topic}</p>
                {log.notes && (
                  <p className="text-xs text-slate-600 italic">"{log.notes}"</p>
                )}

                <div className="flex flex-wrap gap-1 pt-1">
                  {allStudentsInGroup.map(m => {
                    const attended = log.attendedStudentIds?.includes(m.id);
                    return (
                      <span
                        key={m.id}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          attended
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-700 line-through"
                        }`}
                      >
                        {m.name.split(' ')[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No logs submitted yet for this group.</p>
        )}
      </div>

      {/* Log Session Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Log Daily 30-Min Session</h3>
            <p className="text-xs text-slate-500">
              Submit today's speaking prompt and mark peer attendance for {group?.name}.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Day Number (1 to 30)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Discussion Prompt / Topic
                </label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {promptSuggestions.slice(0, 3).map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTopic(p)}
                      className="text-[10px] bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Practicing polite interruption and voice inflection"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Session Notes & Observations
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Brief takeaways, peer feedback, or pronunciation stumbling blocks addressed..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Mark Attended Members
                </label>
                <div className="space-y-1.5">
                  {allStudentsInGroup.map(mem => (
                    <label key={mem.id} className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={attendedIds.includes(mem.id)}
                        onChange={() => handleToggleStudent(mem.id)}
                        className="rounded accent-brand-600"
                      />
                      {mem.rollNo} - {mem.name} {mem.id === student.id ? "(You)" : ""}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-sm"
                >
                  Save Daily Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
