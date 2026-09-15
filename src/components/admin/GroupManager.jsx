import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  BookOpen, 
  Presentation,
  Award,
  CheckCircle2
} from 'lucide-react';
import Badge from '../common/Badge';

export default function GroupManager({
  groups,
  students,
  groupSubmissions,
  onOpenGradingModal
}) {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]?.id || "G1");

  const currentGroup = groups.find(g => g.id === selectedGroup) || groups[0];
  const members = students.filter(s => s.groupId === currentGroup.id);
  const condSub = groupSubmissions.conditionals?.[currentGroup.id];
  const storySub = groupSubmissions.storytelling?.[currentGroup.id];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            Group Rosters & Schedule Coordinator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage peer teams, inspect assigned presentation topics, dates, and live meet links.
          </p>
        </div>

        {/* Group Selector Pill Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGroup(g.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGroup === g.id
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {g.id} ({g.name.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Group Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Group Presentation Schedules & Submissions */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Group Overview Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-md">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {currentGroup.id} Batch Allocation
            </span>
            <h3 className="text-xl font-extrabold text-white mt-2">
              {currentGroup.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Coordinator: <strong className="text-white">{students.find(s => s.id === currentGroup.coordinatorId)?.name || "Assigned"}</strong>
            </p>
          </div>

          {/* Activity 3: Conditionals Showcase Details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  #3
                </span>
                <h4 className="text-base font-bold text-slate-900">Conditionals Presentation</h4>
              </div>
              <Badge status={condSub?.status || "pending"} />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px] uppercase">Assigned Topic</span>
              <p className="font-bold text-slate-900 text-sm">"{currentGroup.conditionalsTopic}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Date</span>
                <span className="font-bold text-slate-800">{currentGroup.presentationSlotConditionals.date}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Time Slot</span>
                <span className="font-bold text-slate-800">{currentGroup.presentationSlotConditionals.time}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Venue</span>
                <span className="font-bold text-slate-800 truncate block">{currentGroup.presentationSlotConditionals.venue}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {condSub?.slideUrl ? (
                <a
                  href={condSub.slideUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Submitted Slides
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No presentation deck submitted yet</span>
              )}

              <button
                onClick={() => onOpenGradingModal("conditionals", condSub || { groupId: currentGroup.id }, `${currentGroup.name} (Conditionals)`, currentGroup.id)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors"
              >
                {condSub?.status === 'graded' ? 'Edit Grade' : 'Grade Conditionals'}
              </button>
            </div>
          </div>

          {/* Activity 4: Storytelling Showcase Details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center">
                  #4
                </span>
                <h4 className="text-base font-bold text-slate-900">Storytelling Performance</h4>
              </div>
              <Badge status={storySub?.status || "pending"} />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500 font-semibold block text-[11px] uppercase">Assigned Theme</span>
              <p className="font-bold text-slate-900 text-sm">"{currentGroup.storytellingTopic}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Date</span>
                <span className="font-bold text-slate-800">{currentGroup.presentationSlotStorytelling.date}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Time Slot</span>
                <span className="font-bold text-slate-800">{currentGroup.presentationSlotStorytelling.time}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Venue</span>
                <span className="font-bold text-slate-800 truncate block">{currentGroup.presentationSlotStorytelling.venue}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {storySub?.slideUrl ? (
                <a
                  href={storySub.slideUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-teal-600 hover:underline font-bold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Story Materials
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No storytelling materials submitted yet</span>
              )}

              <button
                onClick={() => onOpenGradingModal("storytelling", storySub || { groupId: currentGroup.id }, `${currentGroup.name} (Storytelling)`, currentGroup.id)}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold rounded-xl transition-colors"
              >
                {storySub?.status === 'graded' ? 'Edit Grade' : 'Grade Storytelling'}
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Group Members Roster & 30x30 Attendance Status */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Group Roster ({members.length} Members)
            </h4>

            <div className="space-y-3">
              {members.map(member => (
                <div
                  key={member.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{member.name}</span>
                        {member.isCoordinator && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                            Lead
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{member.rollNo}</span>
                    </div>
                    <Badge status={member.oneOnOne.status} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>30×30 Streak:</span>
                    <span className={`font-bold ${member.thirtyThirtyAttendancePct < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {member.thirtyThirtyAttendancePct}% ({member.thirtyThirtyDaysCompleted}d)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
