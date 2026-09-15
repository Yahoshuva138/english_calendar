// CSV / Excel gradebook exporter

import { calculateStudentOverall } from "./gradeCalculations";

export function exportGradebookToCSV(students, groups, groupSubmissions, batchInfo) {
  const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));

  // CSV Headers
  const headers = [
    "Roll No",
    "Student Name",
    "Email",
    "Group",
    "Coordinator",
    "1:1 Feedback Status",
    "1:1 Score (/25)",
    "1:1 Feedback Notes",
    "30x30 Completed Days",
    "30x30 Attendance %",
    "30x30 Score (/25)",
    "Conditionals Status",
    "Conditionals Score (/25)",
    "Storytelling Status",
    "Storytelling Score (/25)",
    "Total Earned (/100)",
    "Overall %",
    "Letter Grade",
    "At-Risk Alert",
    "At-Risk Reasons"
  ];

  const rows = students.map(student => {
    const calc = calculateStudentOverall(student, groupSubmissions, batchInfo);
    const condSub = groupSubmissions.conditionals?.[student.groupId];
    const storySub = groupSubmissions.storytelling?.[student.groupId];

    return [
      `"${student.rollNo}"`,
      `"${student.name}"`,
      `"${student.email}"`,
      `"${groupMap[student.groupId] || student.groupId}"`,
      student.isCoordinator ? "Yes (CR/Lead)" : "No",
      `"${student.oneOnOne?.status || 'unbooked'}"`,
      student.oneOnOne?.totalScore ?? "N/A",
      `"${(student.oneOnOne?.facultyFeedback || '').replace(/"/g, '""')}"`,
      student.thirtyThirtyDaysCompleted || 0,
      `${student.thirtyThirtyAttendancePct || 0}%`,
      calc.thirtyThirtyScore,
      `"${condSub?.status || 'pending'}"`,
      condSub?.totalScore ?? "N/A",
      `"${storySub?.status || 'pending'}"`,
      storySub?.totalScore ?? "N/A",
      calc.fullScoreEarned,
      `${calc.currentPercentage}%`,
      `"${calc.letterGrade}"`,
      calc.isAtRisk ? "YES" : "No",
      `"${calc.atRiskReasons.join("; ")}"`
    ];
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filename = `English_CR_Gradebook_${batchInfo.courseCode || "ENG202"}_${new Date().toISOString().split("T")[0]}.csv`;
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
