import React, { useState } from 'react';
import { 
  Presentation, 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Award,
  Users,
  UploadCloud
} from 'lucide-react';
import Badge from '../common/Badge';

export default function ConditionalsPresentationView({
  student,
  group,
  allStudentsInGroup,
  submission,
  batchInfo,
  onSubmitPresentation
}) {
  const [slideUrl, setSlideUrl] = useState(submission?.slideUrl || "");
  const [scriptDocUrl, setScriptDocUrl] = useState(submission?.scriptDocUrl || "");
  const [summary, setSummary] = useState(submission?.summary || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const isGraded = submission?.status === "graded";
  const isSubmitted = submission?.status === "submitted" || isGraded;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slideUrl.trim()) return;

    onSubmitPresentation("conditionals", group.id, student.id, {
      slideUrl: slideUrl.trim(),
      scriptDocUrl: scriptDocUrl.trim(),
      summary: summary.trim()
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Activity Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                Activity #3 • Group Presentation (30–45 min)
              </span>
              <Badge status={submission?.status || student.conditionalsStatus} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Conditionals Presentation Showcase
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Collaborative technical case presentation demonstrating mastery of Zero, First, Second, Third, and Mixed conditionals applied to real-world scenarios.
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
            <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Weightage</p>
            <p className="text-2xl font-black text-indigo-950">25 Marks</p>
            <p className="text-[11px] text-indigo-700 font-medium">Group + Q&A Evaluation</p>
          </div>
        </div>
      </div>

      {/* Presentation Schedule & Topic Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-indigo-300">
              Assigned Group Topic ({group?.name})
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              "{group?.conditionalsTopic}"
            </h3>
          </div>

          {group?.presentationSlotConditionals?.venue && (
            <a
              href="https://meet.google.com/eng-cond-demo"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <Video className="w-4 h-4" /> Join Presentation Session
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Date: <strong className="text-white">{group?.presentationSlotConditionals?.date}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Slot: <strong className="text-white">{group?.presentationSlotConditionals?.time}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Venue: <strong className="text-white">{group?.presentationSlotConditionals?.venue}</strong></span>
          </div>
        </div>
      </div>

      {/* If Graded: Show Rubric Score Sheet */}
      {isGraded && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6 bg-gradient-to-b from-emerald-50/40 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Faculty Presentation Evaluation</h3>
                <p className="text-xs text-slate-500">Graded by {batchInfo.facultyName} on {submission.gradedAt?.split('T')[0]}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-emerald-700">{submission.totalScore}</span>
              <span className="text-sm font-bold text-slate-500"> / 25 Marks</span>
            </div>
          </div>

          {submission.rubricScores && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Grammatical Accuracy</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.grammaticalPrecision} <span className="text-xs text-slate-400">/ 8</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.grammaticalPrecision / 8) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Slide Quality & Content</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.slideContent} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.slideContent / 6) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Delivery & Stage Presence</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.delivery} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.delivery / 6) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Q&A & Equal Participation</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.qa} <span className="text-xs text-slate-400">/ 5</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.qa / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-emerald-100/40 border border-emerald-200 rounded-2xl">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
              Faculty Detailed Feedback
            </h4>
            <p className="text-sm text-emerald-950 font-medium leading-relaxed">
              "{submission.facultyFeedback}"
            </p>
          </div>
        </div>
      )}

      {/* Submission Form (or View Existing Submission) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-indigo-600" />
              Presentation Materials Submission
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Any member of {group?.name} may upload or update the Google Slides link and speaking script for the group.
            </p>
          </div>
          {submission?.submittedAt && (
            <span className="text-xs text-slate-500 font-medium">
              Submitted: {submission.submittedAt.split('T')[0]} by {submission.submittedBy}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Google Slides / Presentation Deck URL *
            </label>
            <input
              type="url"
              value={slideUrl}
              onChange={(e) => setSlideUrl(e.target.value)}
              placeholder="https://docs.google.com/presentation/d/your-presentation-id/edit"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Speaking Script / Research Notes Document URL (Optional)
            </label>
            <input
              type="url"
              value={scriptDocUrl}
              onChange={(e) => setScriptDocUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/your-script-notes/edit"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Brief Presentation Summary / Executive Abstract
            </label>
            <textarea
              rows="3"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Explain how your group applied conditionals to your topic..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {saveSuccess ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Presentation materials saved for {group?.name}!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitted ? "Update Group Submission" : "Submit Presentation Materials"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
