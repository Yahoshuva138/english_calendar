// LocalStorage synchronization service for English CR Hub

import {
  INITIAL_BATCH_INFO,
  ACTIVITIES_CONFIG,
  INITIAL_GROUPS,
  INITIAL_STUDENTS,
  INITIAL_GROUP_SUBMISSIONS,
  INITIAL_30X30_LOGS,
  AVAILABLE_ONE_ON_ONE_SLOTS
} from "../data/seedData";

const STORAGE_KEY = "english_cr_hub_data_v2";

export function loadPortalData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error("Error reading portal data from localStorage:", err);
  }

  // If no saved data, seed defaults
  const initialData = {
    batchInfo: INITIAL_BATCH_INFO,
    activitiesConfig: ACTIVITIES_CONFIG,
    groups: INITIAL_GROUPS,
    students: INITIAL_STUDENTS,
    groupSubmissions: INITIAL_GROUP_SUBMISSIONS,
    thirtyThirtyLogs: INITIAL_30X30_LOGS,
    availableSlots: AVAILABLE_ONE_ON_ONE_SLOTS,
    lastUpdated: new Date().toISOString()
  };

  savePortalData(initialData);
  return initialData;
}

export function savePortalData(data) {
  try {
    const dataWithTimestamp = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    return true;
  } catch (err) {
    console.error("Failed to save portal data:", err);
    return false;
  }
}

export function resetToSeedData() {
  localStorage.removeItem(STORAGE_KEY);
  return loadPortalData();
}

// Student 1:1 slot booking
export function bookOneOnOneSlot(studentId, slot, reflectionNotes = "") {
  const data = loadPortalData();
  const student = data.students.find(s => s.id === studentId);
  if (!student) return null;

  student.oneOnOne = {
    status: "scheduled",
    slotDate: slot.date,
    slotTime: slot.time,
    bookedVia: "internal_portal",
    meetLink: slot.meetLink,
    reflectionNotes: reflectionNotes || student.oneOnOne?.reflectionNotes || "",
    rubricScores: null,
    totalScore: null,
    facultyFeedback: "",
    gradedAt: null
  };

  // Mark slot as booked in availableSlots list
  data.availableSlots = data.availableSlots.map(s => 
    s.id === slot.id ? { ...s, status: "booked", bookedBy: student.name } : s
  );

  savePortalData(data);
  return data;
}

// Student submits pre/post session 1:1 notes
export function updateOneOnOneReflection(studentId, reflectionNotes) {
  const data = loadPortalData();
  const student = data.students.find(s => s.id === studentId);
  if (student && student.oneOnOne) {
    student.oneOnOne.reflectionNotes = reflectionNotes;
    savePortalData(data);
  }
  return data;
}

// Student logs 30x30 Daily Challenge check-in
export function logDailyChallengeSession(groupId, studentId, logEntry) {
  const data = loadPortalData();
  if (!data.thirtyThirtyLogs[groupId]) {
    data.thirtyThirtyLogs[groupId] = [];
  }

  // Prepend new daily log
  data.thirtyThirtyLogs[groupId].unshift({
    day: logEntry.day,
    date: logEntry.date || new Date().toISOString().split("T")[0],
    topic: logEntry.topic,
    notes: logEntry.notes,
    attendedStudentIds: logEntry.attendedStudentIds || [studentId]
  });

  // Increment student's completed days if not already max
  const student = data.students.find(s => s.id === studentId);
  if (student) {
    student.thirtyThirtyDaysCompleted = Math.min(30, (student.thirtyThirtyDaysCompleted || 0) + 1);
    student.thirtyThirtyAttendancePct = Math.round((student.thirtyThirtyDaysCompleted / 30) * 100);
    if (student.thirtyThirtyAttendancePct >= (data.batchInfo.minAttendancePercent || 75)) {
      student.thirtyThirtyStatus = "in_progress";
    }
  }

  savePortalData(data);
  return data;
}

// Group presentation submission (Conditionals or Storytelling)
export function submitGroupPresentation(activityType, groupId, studentId, payload) {
  const data = loadPortalData();
  const student = data.students.find(s => s.id === studentId);
  const submitterName = student ? `${student.rollNo} (${student.name})` : "Student";

  if (!data.groupSubmissions[activityType]) {
    data.groupSubmissions[activityType] = {};
  }

  data.groupSubmissions[activityType][groupId] = {
    groupId,
    submittedBy: submitterName,
    submittedAt: new Date().toISOString(),
    slideUrl: payload.slideUrl,
    scriptDocUrl: payload.scriptDocUrl || "",
    summary: payload.summary || "",
    status: "submitted",
    rubricScores: null,
    totalScore: null,
    facultyFeedback: "",
    gradedAt: null
  };

  // Update status on all students in this group
  data.students.forEach(s => {
    if (s.groupId === groupId) {
      if (activityType === "conditionals") s.conditionalsStatus = "submitted";
      if (activityType === "storytelling") s.storytellingStatus = "submitted";
    }
  });

  savePortalData(data);
  return data;
}

// Faculty grading desk: Grades an individual 1:1 or a group presentation with Rubrics
export function gradeSubmission(submissionType, targetId, rubricScores, totalScore, feedback, grader = "Dr. Sunita Mukherjee") {
  const data = loadPortalData();

  if (submissionType === "oneOnOne") {
    // targetId is studentId
    const student = data.students.find(s => s.id === targetId);
    if (student) {
      student.oneOnOne = {
        ...student.oneOnOne,
        status: "graded",
        rubricScores,
        totalScore,
        facultyFeedback: feedback,
        gradedBy: grader,
        gradedAt: new Date().toISOString()
      };
    }
  } else if (submissionType === "conditionals" || submissionType === "storytelling") {
    // targetId is groupId
    if (data.groupSubmissions[submissionType] && data.groupSubmissions[submissionType][targetId]) {
      data.groupSubmissions[submissionType][targetId] = {
        ...data.groupSubmissions[submissionType][targetId],
        status: "graded",
        rubricScores,
        totalScore,
        facultyFeedback: feedback,
        gradedBy: grader,
        gradedAt: new Date().toISOString()
      };
    }

    // Reflect status onto students of this group
    data.students.forEach(s => {
      if (s.groupId === targetId) {
        if (submissionType === "conditionals") s.conditionalsStatus = "graded";
        if (submissionType === "storytelling") s.storytellingStatus = "graded";
      }
    });
  }

  savePortalData(data);
  return data;
}

// Batch settings updater
export function updateBatchSettings(newSettings) {
  const data = loadPortalData();
  data.batchInfo = { ...data.batchInfo, ...newSettings };
  savePortalData(data);
  return data;
}
