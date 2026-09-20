import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import StudentDashboard from './components/student/StudentDashboard';
import OneOnOneFeedbackView from './components/student/OneOnOneFeedbackView';
import ThirtyDayChallengeView from './components/student/ThirtyDayChallengeView';
import ConditionalsPresentationView from './components/student/ConditionalsPresentationView';
import StorytellingView from './components/student/StorytellingView';
import MeetingHub from './components/meetings/MeetingHub';
import AdminDashboard from './components/admin/AdminDashboard';
import {
  loadPortalData,
  resetToSeedData,
  bookOneOnOneSlot,
  updateOneOnOneReflection,
  logDailyChallengeSession,
  submitGroupPresentation,
  gradeSubmission
} from './services/storageService';

export default function App() {
  const [portalData, setPortalData] = useState(() => loadPortalData());
  const [currentRole, setCurrentRole] = useState("student"); // "student" | "admin"
  const [selectedStudentId, setSelectedStudentId] = useState("S41"); // Yahoshuva Kesaboyina (CR)
  const [activeStudentTab, setActiveStudentTab] = useState("overview");
  const [activeAdminTab, setActiveAdminTab] = useState("gradingDesk");

  // Sync state if storage updates in other windows/tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setPortalData(loadPortalData());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleReset = () => {
    const fresh = resetToSeedData();
    setPortalData(fresh);
    setSelectedStudentId("S41");
  };

  const handleBookSlot = (studentId, slot, reflection) => {
    const updated = bookOneOnOneSlot(studentId, slot, reflection);
    if (updated) setPortalData({ ...updated });
  };

  const handleSaveReflection = (studentId, reflection) => {
    const updated = updateOneOnOneReflection(studentId, reflection);
    if (updated) setPortalData({ ...updated });
  };

  const handleLogDailySession = (groupId, studentId, logEntry) => {
    const updated = logDailyChallengeSession(groupId, studentId, logEntry);
    if (updated) setPortalData({ ...updated });
  };

  const handleSubmitPresentation = (activityType, groupId, studentId, payload) => {
    const updated = submitGroupPresentation(activityType, groupId, studentId, payload);
    if (updated) setPortalData({ ...updated });
  };

  const handleGradeSubmission = (type, targetId, rubricScores, totalScore, feedback, grader) => {
    const updated = gradeSubmission(type, targetId, rubricScores, totalScore, feedback, grader);
    if (updated) setPortalData({ ...updated });
  };

  // Currently simulated student & group
  const currentStudent = portalData.students.find(s => s.id === selectedStudentId) || portalData.students[0];
  const currentGroup = portalData.groups.find(g => g.id === currentStudent?.groupId) || portalData.groups[0];
  const allStudentsInGroup = portalData.students.filter(s => s.groupId === currentGroup?.id);
  const currentGroupLogs = portalData.thirtyThirtyLogs?.[currentGroup?.id] || [];
  const currentConditionalsSub = portalData.groupSubmissions?.conditionals?.[currentGroup?.id];
  const currentStorytellingSub = portalData.groupSubmissions?.storytelling?.[currentGroup?.id];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-brand-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
        students={portalData.students}
        groups={portalData.groups}
        batchInfo={portalData.batchInfo}
        onResetData={handleReset}
        activeTab={currentRole === 'student' ? activeStudentTab : activeAdminTab}
        setActiveTab={currentRole === 'student' ? setActiveStudentTab : setActiveAdminTab}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {currentRole === 'student' ? (
          <div>
            {activeStudentTab === 'overview' && (
              <StudentDashboard
                student={currentStudent}
                group={currentGroup}
                groupSubmissions={portalData.groupSubmissions}
                batchInfo={portalData.batchInfo}
                onNavigateTab={(tab) => setActiveStudentTab(tab)}
              />
            )}

            {activeStudentTab === 'meetings' && (
              <MeetingHub
                student={currentStudent}
                group={currentGroup}
                groups={portalData.groups}
                students={portalData.students}
                batchInfo={portalData.batchInfo}
                availableSlots={portalData.availableSlots}
              />
            )}

            {activeStudentTab === 'oneOnOne' && (
              <OneOnOneFeedbackView
                student={currentStudent}
                batchInfo={portalData.batchInfo}
                availableSlots={portalData.availableSlots}
                onBookSlot={handleBookSlot}
                onSaveReflection={handleSaveReflection}
              />
            )}

            {activeStudentTab === 'thirtyThirty' && (
              <ThirtyDayChallengeView
                student={currentStudent}
                group={currentGroup}
                allStudentsInGroup={allStudentsInGroup}
                batchInfo={portalData.batchInfo}
                logs={currentGroupLogs}
                onLogSession={handleLogDailySession}
              />
            )}

            {activeStudentTab === 'conditionals' && (
              <ConditionalsPresentationView
                student={currentStudent}
                group={currentGroup}
                allStudentsInGroup={allStudentsInGroup}
                submission={currentConditionalsSub}
                batchInfo={portalData.batchInfo}
                onSubmitPresentation={handleSubmitPresentation}
              />
            )}

            {activeStudentTab === 'storytelling' && (
              <StorytellingView
                student={currentStudent}
                group={currentGroup}
                allStudentsInGroup={allStudentsInGroup}
                submission={currentStorytellingSub}
                batchInfo={portalData.batchInfo}
                onSubmitPresentation={handleSubmitPresentation}
              />
            )}
          </div>
        ) : (
          <AdminDashboard
            batchInfo={portalData.batchInfo}
            students={portalData.students}
            groups={portalData.groups}
            groupSubmissions={portalData.groupSubmissions}
            activitiesConfig={portalData.activitiesConfig}
            onGradeSubmission={handleGradeSubmission}
            activeAdminTab={activeAdminTab}
            setActiveAdminTab={setActiveAdminTab}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong>English CR Hub</strong> • {portalData.batchInfo.courseName} ({portalData.batchInfo.courseCode})
          </p>
          <p>
            Maintained by CR {portalData.batchInfo.crName} &amp; {portalData.batchInfo.facultyName}
          </p>
        </div>
      </footer>

    </div>
  );
}
