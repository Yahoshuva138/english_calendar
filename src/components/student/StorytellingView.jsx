import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Award,
  Users,
  UploadCloud,
  Sparkles,
  Mic
} from 'lucide-react';
import Badge from '../common/Badge';

export default function StorytellingView({
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

    onSubmitPresentation("storytelling", group.id, student.id, {
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                Activity #4 • Collaborative Performance (30–45 min)
              </span>
              <Badge status={submission?.status || student.storytellingStatus} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Storytelling & Narrative Arts Showcase
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Perform an evocative collaborative story with your team. Focus on narrative arcs, suspense, voice modulation, sensory adjectives, and seamless transitions between speakers.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Weightage</p>
            <p className="text-2xl font-black text-emerald-950">25 Marks</p>
            <p className="text-[11px] text-emerald-700 font-medium">Stage & Vocal Arts</p>
          </div>
        </div>
      </div>

      {/* Story Topic & Performance Slot */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-teal-300">
              Assigned Story Theme ({group?.name})
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              "{group?.storytellingTopic}"
            </h3>
          </div>

          {group?.presentationSlotStorytelling?.venue && (
            <a
              href="https://meet.google.com/eng-story-demo"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <Video className="w-4 h-4" /> Join Performance Stage
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>Date: <strong className="text-white">{group?.presentationSlotStorytelling?.date}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Slot: <strong className="text-white">{group?.presentationSlotStorytelling?.time}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Users className="w-4 h-4 text-teal-400" />
            <span>Venue: <strong className="text-white">{group?.presentationSlotStorytelling?.venue}</strong></span>
          </div>
        </div>
      </div>

      {/* If Graded: Rubric Review */}
      {isGraded && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6 bg-gradient-to-b from-emerald-50/40 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Faculty Storytelling Evaluation</h3>
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
                <p className="text-xs font-semibold text-slate-500">Narrative Arc & Hook</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.narrativeStructure} <span className="text-xs text-slate-400">/ 8</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.narrativeStructure / 8) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Vocal Modulation & Pacing</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.vocalModulation} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.vocalModulation / 6) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Descriptive Imagery & Idioms</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.descriptiveLanguage} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.descriptiveLanguage / 6) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500">Team Synergy & Stage Presence</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {submission.rubricScores.teamSynergy} <span className="text-xs text-slate-400">/ 5</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${(submission.rubricScores.teamSynergy / 5) * 100}%` }} />
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

      {/* Submission Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-teal-600" />
              Story Presentation & Script Submission
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit your team's visual props deck, script document, and audio atmosphere plan.
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
              Visual Props / Slide Deck URL *
            </label>
            <input
              type="url"
              value={slideUrl}
              onChange={(e) => setSlideUrl(e.target.value)}
              placeholder="https://docs.google.com/presentation/d/your-story-deck/edit"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Character Script / Dialogue Breakdown Document URL (Optional)
            </label>
            <input
              type="url"
              value={scriptDocUrl}
              onChange={(e) => setScriptDocUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/your-dialogue-script/edit"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Story Synopsis & Roles Breakdown
            </label>
            <textarea
              rows="3"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of plot, moral conflict, and which member acts as Narrator, Protagonist, Supporting Voices..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {saveSuccess ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Storytelling materials saved for {group?.name}!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitted ? "Update Group Submission" : "Submit Story Materials"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
