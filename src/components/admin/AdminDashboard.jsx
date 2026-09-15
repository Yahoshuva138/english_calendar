import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Award, 
  Clock, 
  AlertTriangle, 
  FileSpreadsheet, 
  SlidersHorizontal,
  Download,
  CheckCircle2
} from 'lucide-react';
import GradingDesk from './GradingDesk';
import MasterGradebook from './MasterGradebook';
import AtRiskStudentsList from './AtRiskStudentsList';
import GroupManager from './GroupManager';
import RubricGradingModal from '../common/RubricGradingModal';
import { calculateStudentOverall } from '../../utils/gradeCalculations';
import { exportGradebookToCSV } from '../../utils/exportCsv';

export default function AdminDashboard({
  batchInfo,
  students,
  groups,
  groupSubmissions,
  activitiesConfig,
  onGradeSubmission,
  activeAdminTab = "gradingDesk",
  setActiveAdminTab
}) {
  // Modal state for grading
  const [modalOpen, setModalOpen] = useState(false);
  const [activeGradingConfig, setActiveGradingConfig] = useState(null);
  const [gradingTargetType, setGradingTargetType] = useState(null);
  const [gradingTargetData, setGradingTargetData] = useState(null);
  const [gradingTargetName, setGradingTargetName] = useState("");
  const [gradingTargetId, setGradingTargetId] = useState(null);

  // Batch-wide metrics calculation
  const totalStudents = students.length;
  const atRiskCount = students.filter(s => {
    const calc = calculateStudentOverall(s, groupSubmissions, batchInfo);
    return calc.isAtRisk;
  }).length;

  const totalCalculated = students.map(s => calculateStudentOverall(s, groupSubmissions, batchInfo));
  const avgEarned = Math.round(
    totalCalculated.reduce((acc, c) => acc + c.fullScoreEarned, 0) / (totalStudents || 1)
  );

  // Submissions pending review
  let pendingSubmissionsCount = 0;
  students.forEach(s => {
    if (s.oneOnOne?.status === "scheduled") pendingSubmissionsCount++;
  });
  Object.values(groupSubmissions.conditionals || {}).forEach(c => {
    if (c.status === "submitted") pendingSubmissionsCount++;
  });
  Object.values(groupSubmissions.storytelling || {}).forEach(s => {
    if (s.status === "submitted") pendingSubmissionsCount++;
  });

  const handleOpenGradingModal = (type, targetObj, name, id) => {
    let config = activitiesConfig.oneOnOne;
    if (type === "conditionals") config = activitiesConfig.conditionals;
    if (type === "storytelling") config = activitiesConfig.storytelling;

    setActiveGradingConfig(config);
    setGradingTargetType(type);
    setGradingTargetData(targetObj);
    setGradingTargetName(name);
    setGradingTargetId(id);
    setModalOpen(true);
  };

  const handleSaveGrade = (gradingResult) => {
    onGradeSubmission(
      gradingTargetType,
      gradingTargetId,
      gradingResult.rubricScores,
      gradingResult.totalScore,
      gradingResult.feedback,
      batchInfo.facultyName || "Dr. Sunita Mukherjee"
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Faculty Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                CR &amp; Faculty Command Center
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                {batchInfo.semester || "Semester IV"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {batchInfo.courseName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Course In-charge: <strong className="text-white">{batchInfo.facultyName}</strong> • Class Representative: <strong className="text-white">{batchInfo.crName}</strong>
            </p>
          </div>

          <button
            onClick={() => exportGradebookToCSV(students, groups, groupSubmissions, batchInfo)}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" /> Download Complete Excel / CSV
          </button>
        </div>
      </div>

      {/* 4 Batch KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {totalStudents} <span className="text-xs font-semibold text-slate-400">Students</span>
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{groups.length} Project Teams</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch Avg Score</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {avgEarned} <span className="text-xs font-semibold text-slate-400">/ 100</span>
            </p>
            <p className="text-xs font-semibold text-brand-600 mt-1">Across 4 Pillars</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {pendingSubmissionsCount}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Ready for Grading</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">At-Risk Students</p>
            <p className="text-2xl font-black text-rose-600 mt-1">
              {atRiskCount}
            </p>
            <p className="text-xs font-semibold text-rose-600 mt-1">&lt;75% Att. or No 1:1</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Admin Tab Content */}
      <div className="mt-6">
        {activeAdminTab === 'gradingDesk' && (
          <GradingDesk
            students={students}
            groups={groups}
            groupSubmissions={groupSubmissions}
            activitiesConfig={activitiesConfig}
            onOpenGradingModal={handleOpenGradingModal}
          />
        )}

        {activeAdminTab === 'masterGradebook' && (
          <MasterGradebook
            students={students}
            groups={groups}
            groupSubmissions={groupSubmissions}
            batchInfo={batchInfo}
            onOpenGradingModal={handleOpenGradingModal}
          />
        )}

        {activeAdminTab === 'atRisk' && (
          <AtRiskStudentsList
            students={students}
            groups={groups}
            groupSubmissions={groupSubmissions}
            batchInfo={batchInfo}
            onOpenGradingModal={handleOpenGradingModal}
          />
        )}

        {activeAdminTab === 'groups' && (
          <GroupManager
            groups={groups}
            students={students}
            groupSubmissions={groupSubmissions}
            onOpenGradingModal={handleOpenGradingModal}
          />
        )}
      </div>

      {/* Rubric Grading Modal */}
      <RubricGradingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activityConfig={activeGradingConfig}
        targetType={gradingTargetType}
        targetData={gradingTargetData}
        targetName={gradingTargetName}
        onSaveGrade={handleSaveGrade}
      />

    </div>
  );
}
