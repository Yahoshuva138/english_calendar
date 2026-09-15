import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Award, CheckCircle2, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react';

export default function RubricGradingModal({
  isOpen,
  onClose,
  activityConfig,
  targetType, // "oneOnOne" | "conditionals" | "storytelling"
  targetData, // student object or group submission object
  targetName, // e.g. "Aarav Sharma (22BCSE01)" or "Group 2 (Polyglot Pioneers)"
  onSaveGrade
}) {
  if (!activityConfig || !targetData) return null;

  const criteria = activityConfig.rubricCriteria || [];
  
  // Existing scores if already graded
  const existingRubric = targetData.rubricScores || targetData.oneOnOne?.rubricScores || {};
  const existingFeedback = targetData.facultyFeedback || targetData.oneOnOne?.facultyFeedback || "";

  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const initialScores = {};
    criteria.forEach(c => {
      initialScores[c.id] = existingRubric[c.id] ?? Math.round(c.max * 0.8);
    });
    setScores(initialScores);
    setFeedback(existingFeedback || "");
  }, [targetData, isOpen]);

  const handleScoreChange = (criteriaId, val) => {
    setScores(prev => ({
      ...prev,
      [criteriaId]: Number(val)
    }));
  };

  const totalScore = Object.values(scores).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  const maxPossible = criteria.reduce((acc, curr) => acc + curr.max, 0);

  const quickFeedbackSuggestions = [
    "Excellent vocabulary command and clear pacing.",
    "Very engaging presentation; well-structured slides.",
    "Strong logical flow. Work on reducing filler words like 'um'.",
    "Good teamwork and balanced participation among all members.",
    "Accurate usage of conditionals in real-world examples.",
    "Expressive voice modulation with great dramatic pauses."
  ];

  const handleQuickAdd = (chip) => {
    setFeedback(prev => (prev ? `${prev} ${chip}` : chip));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveGrade({
      rubricScores: scores,
      totalScore,
      feedback: feedback.trim()
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Grading Desk: ${activityConfig.title}`}
      subtitle={`Evaluating ${targetName}`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Artifact / Links preview banner if available */}
        {(targetData.slideUrl || targetData.scriptDocUrl || targetData.meetLink || targetData.oneOnOne?.meetLink) && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex flex-wrap gap-3 items-center text-xs text-blue-800">
            <span className="font-semibold flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> Submissions & Links:
            </span>
            {targetData.slideUrl && (
              <a 
                href={targetData.slideUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center px-2 py-1 bg-white rounded border border-blue-300 font-medium hover:bg-blue-100 transition-colors"
              >
                📊 Open Presentation Slides
              </a>
            )}
            {targetData.scriptDocUrl && (
              <a 
                href={targetData.scriptDocUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center px-2 py-1 bg-white rounded border border-blue-300 font-medium hover:bg-blue-100 transition-colors"
              >
                📝 View Speaking Script
              </a>
            )}
            {(targetData.meetLink || targetData.oneOnOne?.meetLink) && (
              <a 
                href={targetData.meetLink || targetData.oneOnOne?.meetLink} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center px-2 py-1 bg-white rounded border border-blue-300 font-medium hover:bg-blue-100 transition-colors"
              >
                📹 Google Meet Session
              </a>
            )}
          </div>
        )}

        {/* Student's reflection notes if 1:1 */}
        {targetData.oneOnOne?.reflectionNotes && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-brand-600" /> Student Self-Reflection / Prep Notes:
            </p>
            <p className="italic">"{targetData.oneOnOne.reflectionNotes}"</p>
          </div>
        )}

        {/* Rubric Criteria sliders/scoring */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Evaluation Rubric Criteria
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Calculated Score:</span>
              <span className="text-base font-extrabold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200">
                {totalScore} / {maxPossible}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {criteria.map(item => {
              const currentVal = scores[item.id] ?? 0;
              return (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <div className="text-right pl-3">
                      <span className="text-sm font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300 shadow-sm">
                        {currentVal} / {item.max}
                      </span>
                    </div>
                  </div>

                  {/* Range Slider and Quick Buttons */}
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="range"
                      min="0"
                      max={item.max}
                      step="1"
                      value={currentVal}
                      onChange={(e) => handleScoreChange(item.id, e.target.value)}
                      className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex gap-1 shrink-0">
                      {Array.from({ length: item.max + 1 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleScoreChange(item.id, i)}
                          className={`w-6 h-6 text-xs font-semibold rounded ${
                            currentVal === i
                              ? "bg-brand-600 text-white"
                              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faculty Remarks & Quick Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Faculty Remarks & Action Items
          </label>
          <div className="flex flex-wrap gap-1.5 pb-1">
            {quickFeedbackSuggestions.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAdd(chip)}
                className="text-[11px] bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 px-2.5 py-1 rounded-full transition-colors"
              >
                + {chip}
              </button>
            ))}
          </div>
          <textarea
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write constructive observations, strengths, and specific areas for language improvement..."
            className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 placeholder-slate-400"
            required
          />
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Save & Publish Grade
          </button>
        </div>
      </form>
    </Modal>
  );
}
