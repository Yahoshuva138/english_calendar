// Grade calculations, scoring utilities, and at-risk detection rules

import { ACTIVITIES_CONFIG } from "../data/seedData";

export function calculateStudentOverall(student, groupSubmissions, batchInfo) {
  const minAttendance = batchInfo?.minAttendancePercent || 75;
  
  // 1:1 score (out of 25)
  const oneOnOneScore = student.oneOnOne?.totalScore ?? null;
  const isOneOnOneGraded = student.oneOnOne?.status === "graded";
  
  // 30x30 score: Attendance % mapped to 25 marks (or rubric score)
  // Attendance score: (daysCompleted / 30) * 25
  const thirtyThirtyScore = Math.round(((student.thirtyThirtyDaysCompleted || 0) / (student.thirtyThirtyTotalDays || 30)) * 25);
  const isThirtyThirtyPassing = (student.thirtyThirtyAttendancePct || 0) >= minAttendance;

  // Conditionals group score (out of 25)
  const conditionalsSubmission = groupSubmissions?.conditionals?.[student.groupId];
  const conditionalsScore = conditionalsSubmission?.totalScore ?? null;
  const isConditionalsGraded = conditionalsSubmission?.status === "graded";

  // Storytelling group score (out of 25)
  const storytellingSubmission = groupSubmissions?.storytelling?.[student.groupId];
  const storytellingScore = storytellingSubmission?.totalScore ?? null;
  const isStorytellingGraded = storytellingSubmission?.status === "graded";

  // Total graded so far
  let gradedTotal = 0;
  let gradedMax = 0;
  let completedCount = 0;

  if (isOneOnOneGraded && oneOnOneScore !== null) {
    gradedTotal += oneOnOneScore;
    gradedMax += 25;
    completedCount += 1;
  } else if (student.oneOnOne?.status === "scheduled") {
    // Scheduled but not graded
  }

  // 30x30 is continuous
  if (student.thirtyThirtyDaysCompleted >= 20) {
    gradedTotal += thirtyThirtyScore;
    gradedMax += 25;
    completedCount += 1;
  }

  if (isConditionalsGraded && conditionalsScore !== null) {
    gradedTotal += conditionalsScore;
    gradedMax += 25;
    completedCount += 1;
  } else if (conditionalsSubmission?.status === "submitted") {
    // Submitted awaiting grading
  }

  if (isStorytellingGraded && storytellingScore !== null) {
    gradedTotal += storytellingScore;
    gradedMax += 25;
    completedCount += 1;
  }

  // Aggregate percentage
  const currentPercentage = gradedMax > 0 ? Math.round((gradedTotal / gradedMax) * 100) : 0;
  
  // Full 100 marks forecast (using current earned + anticipated)
  const fullScoreEarned = (oneOnOneScore || 0) + (thirtyThirtyScore || 0) + (conditionalsScore || 0) + (storytellingScore || 0);

  // Determine letter grade
  let letterGrade = "Incomplete";
  if (completedCount >= 3) {
    if (currentPercentage >= 90) letterGrade = "A+ (Outstanding)";
    else if (currentPercentage >= 80) letterGrade = "A (Excellent)";
    else if (currentPercentage >= 70) letterGrade = "B+ (Very Good)";
    else if (currentPercentage >= 60) letterGrade = "B (Good)";
    else if (currentPercentage >= 50) letterGrade = "C (Satisfactory)";
    else letterGrade = "F (Needs Improvement)";
  }

  // At-risk flags
  const atRiskReasons = [];
  if ((student.thirtyThirtyAttendancePct || 0) < minAttendance) {
    atRiskReasons.push(`30x30 Attendance is ${student.thirtyThirtyAttendancePct}% (below mandatory ${minAttendance}%)`);
  }
  if (student.oneOnOne?.status === "unbooked") {
    atRiskReasons.push("Has not booked mandatory 1:1 English feedback slot yet");
  }
  if (!conditionalsSubmission && student.conditionalsStatus === "pending") {
    atRiskReasons.push("Group has not submitted Conditionals presentation deck");
  }

  const isAtRisk = atRiskReasons.length > 0;

  return {
    oneOnOneScore,
    isOneOnOneGraded,
    thirtyThirtyScore,
    isThirtyThirtyPassing,
    conditionalsScore,
    isConditionalsGraded,
    storytellingScore,
    isStorytellingGraded,
    gradedTotal,
    gradedMax,
    fullScoreEarned,
    currentPercentage,
    completedCount,
    totalActivities: 4,
    completionPercentage: Math.round((completedCount / 4) * 100),
    letterGrade,
    isAtRisk,
    atRiskReasons
  };
}

export function getStatusBadgeInfo(status) {
  switch (status) {
    case "graded":
    case "completed":
      return { label: "Graded", color: "bg-emerald-100 text-emerald-800 border-emerald-300" };
    case "submitted":
    case "under_review":
      return { label: "Under Review", color: "bg-amber-100 text-amber-800 border-amber-300" };
    case "scheduled":
      return { label: "Slot Booked", color: "bg-blue-100 text-blue-800 border-blue-300" };
    case "in_progress":
      return { label: "Active", color: "bg-indigo-100 text-indigo-800 border-indigo-300" };
    case "at_risk":
      return { label: "At Risk", color: "bg-rose-100 text-rose-800 border-rose-300 animate-pulse" };
    case "unbooked":
    case "pending":
    default:
      return { label: "Pending", color: "bg-slate-100 text-slate-700 border-slate-300" };
  }
}
