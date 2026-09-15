import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  SlidersHorizontal, 
  Award, 
  Filter, 
  Search,
  MessageSquare,
  Users,
  UserCheck
} from 'lucide-react';
import Badge from '../common/Badge';

export default function GradingDesk({
  students,
  groups,
  groupSubmissions,
  activitiesConfig,
  onOpenGradingModal
}) {
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending"); // "pending" | "graded" | "all"
  const [searchQuery, setSearchQuery] = useState("");

  const groupMap = Object.fromEntries(groups.map(g => [g.id, g]));

  // Build unified grading queue
  const queue = [];

  // 1:1 Submissions
  students.forEach(s => {
    if (s.oneOnOne && (s.oneOnOne.status === "scheduled" || s.oneOnOne.status === "graded")) {
      queue.push({
        id: `oneOnOne-${s.id}`,
        type: "oneOnOne",
        activityTitle: activitiesConfig.oneOnOne.title,
        targetName: `${s.rollNo} • ${s.name}`,
        targetId: s.id,
        groupName: groupMap[s.groupId]?.name || s.groupId,
        status: s.oneOnOne.status,
        submittedDate: s.oneOnOne.slotDate || "N/A",
        score: s.oneOnOne.totalScore,
        maxScore: 25,
        meetLink: s.oneOnOne.meetLink,
        reflectionNotes: s.oneOnOne.reflectionNotes,
        facultyFeedback: s.oneOnOne.facultyFeedback,
        rawObj: s
      });
    }
  });

  // Conditionals Submissions
  Object.entries(groupSubmissions.conditionals || {}).forEach(([groupId, sub]) => {
    const grp = groupMap[groupId];
    queue.push({
      id: `conditionals-${groupId}`,
      type: "conditionals",
      activityTitle: activitiesConfig.conditionals.title,
      targetName: grp ? grp.name : groupId,
      targetId: groupId,
      groupName: grp?.conditionalsTopic || "Conditionals Presentation",
      status: sub.status,
      submittedDate: sub.submittedAt ? sub.submittedAt.split('T')[0] : "N/A",
      score: sub.totalScore,
      maxScore: 25,
      slideUrl: sub.slideUrl,
      scriptDocUrl: sub.scriptDocUrl,
      summary: sub.summary,
      facultyFeedback: sub.facultyFeedback,
      rawObj: sub
    });
  });

  // Storytelling Submissions
  Object.entries(groupSubmissions.storytelling || {}).forEach(([groupId, sub]) => {
    const grp = groupMap[groupId];
    queue.push({
      id: `storytelling-${groupId}`,
      type: "storytelling",
      activityTitle: activitiesConfig.storytelling.title,
      targetName: grp ? grp.name : groupId,
      targetId: groupId,
      groupName: grp?.storytellingTopic || "Storytelling Performance",
      status: sub.status,
      submittedDate: sub.submittedAt ? sub.submittedAt.split('T')[0] : "N/A",
      score: sub.totalScore,
      maxScore: 25,
      slideUrl: sub.slideUrl,
      scriptDocUrl: sub.scriptDocUrl,
      summary: sub.summary,
      facultyFeedback: sub.facultyFeedback,
      rawObj: sub
    });
  });

  // Apply filters
  const filteredQueue = queue.filter(item => {
    if (selectedActivity !== "all" && item.type !== selectedActivity) return false;
    if (statusFilter === "pending" && item.status === "graded") return false;
    if (statusFilter === "graded" && item.status !== "graded") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.targetName.toLowerCase().includes(q) ||
        item.groupName.toLowerCase().includes(q) ||
        item.activityTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = queue.filter(i => i.status !== "graded").length;
  const gradedCount = queue.filter(i => i.status === "graded").length;

  return (
    <div className="space-y-6">
      
      {/* Grading Desk Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-brand-600" />
            Faculty & CR Grading Desk
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review submissions, evaluate oral/written performance with granular rubrics, and publish instant grades.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            {pendingCount} Pending Review
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
            {gradedCount} Graded
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Activity Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedActivity("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedActivity === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Activities
          </button>
          <button
            onClick={() => setSelectedActivity("oneOnOne")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedActivity === "oneOnOne" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            1:1 Feedback
          </button>
          <button
            onClick={() => setSelectedActivity("conditionals")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedActivity === "conditionals" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            Conditionals
          </button>
          <button
            onClick={() => setSelectedActivity("storytelling")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedActivity === "storytelling" ? "bg-teal-600 text-white" : "bg-teal-50 text-teal-700 hover:bg-teal-100"
            }`}
          >
            Storytelling
          </button>
        </div>

        {/* Status Filter & Search */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          >
            <option value="pending">Pending Evaluation</option>
            <option value="graded">Already Graded</option>
            <option value="all">All Statuses</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 w-44"
            />
          </div>
        </div>

      </div>

      {/* Queue Items */}
      <div className="space-y-3">
        {filteredQueue.length > 0 ? (
          filteredQueue.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                    {item.activityTitle}
                  </span>
                  <Badge status={item.status} />
                  <span className="text-xs text-slate-400 font-medium">
                    Scheduled/Submitted: {item.submittedDate}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">
                  {item.targetName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {item.groupName}
                </p>

                {/* Attached Links preview */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {item.slideUrl && (
                    <a
                      href={item.slideUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" /> Slides Deck
                    </a>
                  )}
                  {item.scriptDocUrl && (
                    <a
                      href={item.scriptDocUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" /> Speaking Script
                    </a>
                  )}
                  {item.meetLink && (
                    <a
                      href={item.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" /> Meet Link
                    </a>
                  )}
                  {item.reflectionNotes && (
                    <span className="text-slate-500 italic truncate max-w-xs block">
                      "{item.reflectionNotes}"
                    </span>
                  )}
                </div>

                {item.facultyFeedback && (
                  <p className="text-xs text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                    <strong>Feedback:</strong> {item.facultyFeedback}
                  </p>
                )}
              </div>

              {/* Right side Score & Grade button */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                {item.score !== null ? (
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">{item.score}</span>
                    <span className="text-xs font-bold text-slate-400"> / {item.maxScore}</span>
                  </div>
                ) : (
                  <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    Not Graded Yet
                  </span>
                )}

                <button
                  onClick={() => onOpenGradingModal(item.type, item.rawObj, item.targetName, item.targetId)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 ${
                    item.status === 'graded'
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  {item.status === 'graded' ? 'Edit Evaluation' : 'Grade with Rubric'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No submissions matching criteria</p>
            <p className="text-xs text-slate-400 mt-0.5">Change filters to see other activities or already graded records.</p>
          </div>
        )}
      </div>

    </div>
  );
}
