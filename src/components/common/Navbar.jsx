import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  RotateCcw, 
  User, 
  Calendar, 
  AlertTriangle,
  BookOpen,
  Sliders
} from 'lucide-react';

export default function Navbar({
  currentRole, // "student" | "admin"
  setCurrentRole,
  selectedStudentId,
  setSelectedStudentId,
  students,
  groups,
  batchInfo,
  onResetData,
  activeTab,
  setActiveTab
}) {
  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">SST English Hub</span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                  {batchInfo.batchTitle || "English C • 2030"}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {batchInfo.institution || "Scaler School of Technology"} • Term 1
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Contextual) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {currentRole === 'student' ? (
              <>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'overview' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dashboard Overview
                </button>
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === 'meetings' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Meetings &amp; Schedule
                </button>
                <button
                  onClick={() => setActiveTab('oneOnOne')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'oneOnOne' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1:1 Feedback
                </button>
                <button
                  onClick={() => setActiveTab('thirtyThirty')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'thirtyThirty' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  30×30 Challenge
                </button>
                <button
                  onClick={() => setActiveTab('conditionals')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'conditionals' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Conditionals
                </button>
                <button
                  onClick={() => setActiveTab('storytelling')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'storytelling' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Storytelling
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('gradingDesk')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'gradingDesk' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grading Desk
                </button>
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === 'meetings' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Live Schedule &amp; Rooms
                </button>
                <button
                  onClick={() => setActiveTab('masterGradebook')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'masterGradebook' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Master Gradebook
                </button>
                <button
                  onClick={() => setActiveTab('atRisk')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'atRisk' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  At-Risk Monitor
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'groups' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Groups &amp; Slots
                </button>
              </>
            )}
          </div>

          {/* Right Controls: Role Switcher & Student Selector */}
          <div className="flex items-center gap-2.5">
            
            {/* Student Selector when in Student View */}
            {currentRole === 'student' && (
              <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-xl border border-slate-200">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[150px] sm:max-w-[210px] truncate"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.rollNo} - {s.name} ({s.groupId}) {s.thirtyThirtyAttendancePct < 75 || s.oneOnOne.status === 'unbooked' ? '⚠️' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Role Switcher Toggle */}
            <div className="bg-slate-200/80 p-0.5 rounded-xl flex items-center">
              <button
                onClick={() => {
                  setCurrentRole('student');
                  setActiveTab('overview');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'student'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student View</span>
              </button>

              <button
                onClick={() => {
                  setCurrentRole('admin');
                  setActiveTab('gradingDesk');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === 'admin'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CR / Mam Admin</span>
              </button>
            </div>

            {/* Reset Data Button */}
            <button
              onClick={() => {
                if (window.confirm("Reset all batch data back to initial seed state? Any new submissions will be restored.")) {
                  onResetData();
                }
              }}
              title="Reset Sample Batch Data"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100">
          {currentRole === 'student' ? (
            <>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'overview' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('meetings')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'meetings' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                📅 Meetings
              </button>
              <button
                onClick={() => setActiveTab('oneOnOne')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'oneOnOne' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                1:1 Feedback
              </button>
              <button
                onClick={() => setActiveTab('thirtyThirty')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'thirtyThirty' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                30×30 Challenge
              </button>
              <button
                onClick={() => setActiveTab('conditionals')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'conditionals' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                Conditionals
              </button>
              <button
                onClick={() => setActiveTab('storytelling')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'storytelling' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                Storytelling
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('gradingDesk')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'gradingDesk' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                Grading Desk
              </button>
              <button
                onClick={() => setActiveTab('meetings')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'meetings' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                📅 Live Schedule
              </button>
              <button
                onClick={() => setActiveTab('masterGradebook')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'masterGradebook' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                Master Gradebook
              </button>
              <button
                onClick={() => setActiveTab('atRisk')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'atRisk' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                At-Risk Monitor
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  activeTab === 'groups' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                }`}
              >
                Groups & Slots
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
