import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import Badge from '../common/Badge';

export default function OneOnOneFeedbackView({
  student,
  batchInfo,
  availableSlots,
  onBookSlot,
  onSaveReflection
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reflectionText, setReflectionText] = useState(student.oneOnOne?.reflectionNotes || "");
  const [showCalendlyEmbed, setShowCalendlyEmbed] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isGraded = student.oneOnOne?.status === "graded";
  const isBooked = student.oneOnOne?.status === "scheduled" || isGraded;

  const handleBookingConfirm = () => {
    if (!selectedSlot) return;
    onBookSlot(student.id, selectedSlot, reflectionText);
    setSelectedSlot(null);
  };

  const handleReflectionSubmit = (e) => {
    e.preventDefault();
    onSaveReflection(student.id, reflectionText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Activity Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                Activity #1 • Individual Evaluation
              </span>
              <Badge status={student.oneOnOne?.status} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              1:1 English Feedback with Faculty
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              A 15–20 minute mandatory diagnostic session conducted by {batchInfo.facultyName}.
              You will be assessed on conversational fluency, vocabulary variety, grammatical accuracy, and pronunciation clarity.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Weightage</p>
            <p className="text-2xl font-black text-blue-950">25 Marks</p>
            <p className="text-[11px] text-blue-700 font-medium">Mandatory Graded</p>
          </div>
        </div>
      </div>

      {/* If Graded: Show Comprehensive Rubric Card */}
      {isGraded && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6 bg-gradient-to-b from-emerald-50/40 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Evaluation Report & Feedback</h3>
                <p className="text-xs text-slate-500">Graded by {batchInfo.facultyName} on {student.oneOnOne.gradedAt?.split('T')[0]}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-emerald-700">{student.oneOnOne.totalScore}</span>
              <span className="text-sm font-bold text-slate-500"> / 25 Marks</span>
            </div>
          </div>

          {/* Granular Rubric Breakdown */}
          {student.oneOnOne.rubricScores && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Fluency & Flow</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {student.oneOnOne.rubricScores.fluency} <span className="text-xs text-slate-400">/ 7</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${(student.oneOnOne.rubricScores.fluency / 7) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Lexical Resource</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {student.oneOnOne.rubricScores.vocab} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${(student.oneOnOne.rubricScores.vocab / 6) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Grammar & Structure</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {student.oneOnOne.rubricScores.grammar} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${(student.oneOnOne.rubricScores.grammar / 6) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Pronunciation & Accent</p>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {student.oneOnOne.rubricScores.pronunciation} <span className="text-xs text-slate-400">/ 6</span>
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${(student.oneOnOne.rubricScores.pronunciation / 6) * 100}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Faculty Remarks */}
          <div className="p-4 bg-emerald-100/40 border border-emerald-200 rounded-2xl">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
              Faculty Comments & Personalized Guidance
            </h4>
            <p className="text-sm text-emerald-950 font-medium leading-relaxed">
              "{student.oneOnOne.facultyFeedback}"
            </p>
          </div>
        </div>
      )}

      {/* Booked Slot Information (If booked & not graded yet) */}
      {isBooked && !isGraded && (
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 sm:p-8 text-blue-950 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-200 text-blue-800">
                Confirmed Appointment
              </span>
              <h3 className="text-xl font-extrabold mt-1">Your 1:1 Session is Confirmed</h3>
              <p className="text-xs text-blue-800 mt-0.5">
                Evaluator: <span className="font-semibold">{batchInfo.facultyName}</span>
              </p>
            </div>

            {student.oneOnOne?.meetLink && (
              <a
                href={student.oneOnOne.meetLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all shrink-0"
              >
                <Video className="w-4 h-4" /> Join Google Meet
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white/80 p-3 rounded-xl border border-blue-100 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-[11px] text-slate-500 font-semibold">Scheduled Date</p>
                <p className="text-sm font-bold text-slate-900">{student.oneOnOne?.slotDate}</p>
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-blue-100 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-[11px] text-slate-500 font-semibold">Time Slot</p>
                <p className="text-sm font-bold text-slate-900">{student.oneOnOne?.slotTime}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Section: Calendly Option or Direct Portal Slot Picker */}
      {!isBooked && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Step 1: Choose Your Slot</h3>
              <p className="text-xs text-slate-500">
                Book directly from available class slots below, or open Dr. Mukherjee's official Calendly page.
              </p>
            </div>

            <button
              onClick={() => setShowCalendlyEmbed(!showCalendlyEmbed)}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {showCalendlyEmbed ? "Hide Calendly Page" : "Open Faculty Calendly"}
            </button>
          </div>

          {/* Calendly Integration Card */}
          {showCalendlyEmbed && (
            <div className="p-4 bg-slate-50 border border-indigo-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Official Faculty Calendly Event
                </span>
                <a
                  href={batchInfo.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1"
                >
                  Open in new window <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-slate-600">
                Once booked via Calendly, select the corresponding slot below to register it onto your portal gradebook.
              </p>
              <div className="h-64 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <Calendar className="w-10 h-10 text-indigo-500 mb-2" />
                <p className="text-sm font-bold text-slate-800">Calendly Live Scheduling Link Active</p>
                <p className="text-xs text-slate-500 max-w-sm mt-1 mb-3">
                  URL: {batchInfo.calendlyUrl}
                </p>
                <a
                  href={batchInfo.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  Go to Calendly Booking Page
                </a>
              </div>
            </div>
          )}

          {/* Available Slots Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Open Slots for Batch CSE-B
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableSlots.filter(s => s.status === 'open').map(slot => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 shadow-md ring-2 ring-brand-500"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-600" />
                        {slot.date}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Available
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {slot.time}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 truncate">
                      Meet: {slot.meetLink}
                    </p>
                  </div>
                );
              })}
            </div>

            {selectedSlot && (
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleBookingConfirm}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Slot: {selectedSlot.date} ({selectedSlot.time})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pre/Post Session Reflection & Notes */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-600" />
            Step 2: Pre-Session Prep & Self-Reflection
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Share what communication goals or topics you would like faculty to focus on during your 1:1, or record your takeaways post-session.
          </p>
        </div>

        <form onSubmit={handleReflectionSubmit} className="space-y-3">
          <textarea
            rows="3"
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="e.g. I want to work on eliminating filler words ('um', 'you know'), practicing corporate introductions, and improving speaking confidence during technical discussions..."
            className="w-full p-3.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 placeholder-slate-400"
          />

          <div className="flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Notes saved successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Save Preparation Notes
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
