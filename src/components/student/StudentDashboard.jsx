import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Award, 
  Users, 
  UserCheck, 
  Calendar, 
  Flame, 
  ArrowRight,
  Video,
  FileText,
  Mic,
  MessageSquare
} from 'lucide-react';
import Badge from '../common/Badge';
import { calculateStudentOverall } from '../../utils/gradeCalculations';

export default function StudentDashboard({
  student,
  group,
  groupSubmissions,
  batchInfo,
  onNavigateTab
}) {
  const calc = calculateStudentOverall(student, groupSubmissions, batchInfo);
  const condSub = groupSubmissions.conditionals?.[student.groupId];
  const storySub = groupSubmissions.storytelling?.[student.groupId];

  return (
    <div className="space-y-6">
      
      {/* Student Welcome & Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Award className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {student.rollNo}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                {group?.name || student.groupId}
              </span>
              {student.isCoordinator && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  👑 Group Coordinator
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hello, {student.name}!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Track your mandatory English activities, book your 1:1 evaluation with faculty, monitor your 30-day streak, and review graded rubrics.
            </p>
          </div>

          {/* Overall Performance Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 min-w-[240px] flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-400/40 flex items-center justify-center text-brand-300">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-300">Overall Score</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-white">{calc.fullScoreEarned}</span>
                <span className="text-xs text-slate-400">/ 100 max</span>
              </div>
              <p className="text-xs font-semibold text-brand-300 mt-0.5">
                {calc.letterGrade}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* At-Risk Warning Alert if any */}
      {calc.isAtRisk && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 text-rose-900 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-rose-950">Action Required: Academic Criteria At Risk</h4>
            <ul className="text-xs space-y-1 mt-1 list-disc list-inside text-rose-800 font-medium">
              {calc.atRiskReasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => {
              if (student.oneOnOne.status === 'unbooked') onNavigateTab('oneOnOne');
              else if (student.thirtyThirtyAttendancePct < (batchInfo.minAttendancePercent || 75)) onNavigateTab('thirtyThirty');
              else onNavigateTab('conditionals');
            }}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Resolve Now
          </button>
        </div>
      )}

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mandatory Done</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {calc.completedCount} <span className="text-sm font-semibold text-slate-400">/ 4 Activities</span>
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div 
                className="bg-brand-500 h-1.5 rounded-full" 
                style={{ width: `${calc.completionPercentage}%` }} 
              />
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">30×30 Streak</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              Day {student.thirtyThirtyDaysCompleted || 0} <span className="text-sm font-semibold text-slate-400">/ 30</span>
            </p>
            <p className="text-xs font-semibold text-amber-600 mt-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> Daily consistency
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Group Attendance</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {student.thirtyThirtyAttendancePct || 0}%
            </p>
            <p className={`text-xs font-semibold mt-1 ${
              (student.thirtyThirtyAttendancePct || 0) >= (batchInfo.minAttendancePercent || 75) 
                ? 'text-emerald-600' 
                : 'text-rose-600'
            }`}>
              Min. Required: {batchInfo.minAttendancePercent || 75}%
            </p>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            (student.thirtyThirtyAttendancePct || 0) >= (batchInfo.minAttendancePercent || 75)
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
          }`}>
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Presentation</p>
            <p className="text-sm font-extrabold text-slate-900 mt-1">
              {group?.presentationSlotConditionals?.date ? "Sep 22" : "TBD"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[120px]">
              Conditionals Showcase
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 4 Graded Mandatory Activities Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Mandatory Graded Activities (4 Pillars)
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Each activity carries 25 Marks (Total 100)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* 1. 1:1 English Feedback */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    #1
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Individual (15–20 min)
                  </span>
                </div>
                <Badge status={student.oneOnOne.status} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                1:1 English Feedback with Faculty
              </h3>
              <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                Personalized diagnostic interview with {batchInfo.facultyName}. Evaluates fluency, grammar, pronunciation, and tone.
              </p>

              {/* Status details */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                {student.oneOnOne.status === 'graded' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Awarded Score:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {student.oneOnOne.totalScore} / 25
                      </span>
                    </div>
                    <p className="text-slate-500 italic truncate">
                      "{student.oneOnOne.facultyFeedback}"
                    </p>
                  </>
                ) : student.oneOnOne.status === 'scheduled' ? (
                  <>
                    <div className="flex items-center gap-1.5 text-blue-800 font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Booked: {student.oneOnOne.slotDate} ({student.oneOnOne.slotTime})
                    </div>
                    {student.oneOnOne.meetLink && (
                      <a 
                        href={student.oneOnOne.meetLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 text-brand-600 hover:underline font-medium"
                      >
                        <Video className="w-3.5 h-3.5" /> Join Google Meet
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-rose-600 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> No slot booked yet. Choose an open slot or use Calendly.
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('oneOnOne')}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {student.oneOnOne.status === 'graded' ? 'View Graded Rubric' : 'Book / Manage 1:1 Slot'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. 30 Minutes × 30 Days */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                    #2
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Group (Daily 30 min)
                  </span>
                </div>
                <Badge status={student.thirtyThirtyStatus} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                30 Minutes × 30 Days Challenge
              </h3>
              <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                Daily conversational practice with your group ({group?.name}). Maintain speaking streaks and submit daily voice/notes logs.
              </p>

              {/* Status details */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Streak Progress:</span>
                  <span className="font-bold text-slate-900">
                    Day {student.thirtyThirtyDaysCompleted || 0} of 30 ({student.thirtyThirtyAttendancePct || 0}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${
                      (student.thirtyThirtyAttendancePct || 0) >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${student.thirtyThirtyAttendancePct || 0}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('thirtyThirty')}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Log Daily Session & View Streak
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Conditionals Presentation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    #3
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Group Presentation
                  </span>
                </div>
                <Badge status={condSub?.status || student.conditionalsStatus} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Conditionals Presentation
              </h3>
              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                Assigned Topic: <span className="font-semibold text-slate-800">{group?.conditionalsTopic || "Engineering Conditionals"}</span>
              </p>

              {/* Status details */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Slot Date:</span>
                  <span className="font-semibold text-slate-900">
                    {group?.presentationSlotConditionals?.date} ({group?.presentationSlotConditionals?.time})
                  </span>
                </div>
                {condSub?.status === 'graded' ? (
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">Team Score:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {condSub.totalScore} / 25
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Slides Status:</span>
                    <span className="font-medium text-slate-800">
                      {condSub?.slideUrl ? "✅ Submitted" : "⏳ Pending upload"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('conditionals')}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {condSub?.status === 'graded' ? 'View Evaluation & Rubric' : 'Submit Slides & Script'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Storytelling */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                    #4
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Group Storytelling
                  </span>
                </div>
                <Badge status={storySub?.status || student.storytellingStatus} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Storytelling Performance
              </h3>
              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                Assigned Theme: <span className="font-semibold text-slate-800">{group?.storytellingTopic || "Narrative Performance"}</span>
              </p>

              {/* Status details */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Performance Slot:</span>
                  <span className="font-semibold text-slate-900">
                    {group?.presentationSlotStorytelling?.date} ({group?.presentationSlotStorytelling?.time})
                  </span>
                </div>
                {storySub?.status === 'graded' ? (
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">Team Score:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {storySub.totalScore} / 25
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Materials:</span>
                    <span className="font-medium text-slate-800">
                      {storySub?.slideUrl ? "✅ Submitted" : "⏳ Pending submission"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('storytelling')}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {storySub?.status === 'graded' ? 'View Story Rubric' : 'Submit Script & Materials'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
