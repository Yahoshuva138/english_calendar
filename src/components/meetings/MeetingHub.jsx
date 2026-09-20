import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Users, 
  User, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  Search,
  Filter,
  CalendarPlus,
  Compass
} from 'lucide-react';
import { createGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendarUtils';

export default function MeetingHub({
  student,
  group,
  groups,
  students,
  batchInfo,
  availableSlots
}) {
  const [filterType, setFilterType] = useState("myMeetings"); // "myMeetings" | "all" | "oneOnOne" | "conditionals" | "storytelling" | "thirtyThirty"
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedMeetId, setCopiedMeetId] = useState(null);
  const [expandedChecklistId, setExpandedChecklistId] = useState(null);

  const groupMap = Object.fromEntries(groups.map(g => [g.id, g]));

  const handleCopyLink = (id, link) => {
    navigator.clipboard.writeText(link);
    setCopiedMeetId(id);
    setTimeout(() => setCopiedMeetId(null), 2500);
  };

  // Compile all meetings across the batch
  const allMeetings = [];

  // 1. Student's 1:1 Feedback Meeting (if scheduled)
  students.forEach(s => {
    if (s.oneOnOne && (s.oneOnOne.status === "scheduled" || s.oneOnOne.status === "graded")) {
      const isCurrentStudent = s.id === student?.id;
      allMeetings.push({
        id: `1on1-${s.id}`,
        type: "oneOnOne",
        typeLabel: "1:1 English Diagnostic Feedback",
        typeColor: "bg-blue-100 text-blue-800 border-blue-200",
        title: `1:1 Feedback: ${s.name} (${s.rollNo})`,
        subtitle: `Individual Diagnostic Interview with ${batchInfo.facultyName}`,
        date: s.oneOnOne.slotDate || "2026-09-23",
        timeRange: s.oneOnOne.slotTime || "10:00 AM - 10:20 AM",
        meetLink: s.oneOnOne.meetLink || "https://meet.google.com/sst-eng-fb",
        venue: "Google Meet Room",
        faculty: batchInfo.facultyName,
        participants: [`${s.name} (${s.rollNo})`],
        isMyMeeting: isCurrentStudent,
        status: s.oneOnOne.status === "graded" ? "completed" : "scheduled",
        agenda: [
          { time: "0–3 min", task: "Warm-up, greeting, and diagnostic topic introduction" },
          { time: "3–10 min", task: "Impromptu speech, technical discourse explanation, and conversational responses" },
          { time: "10–15 min", task: "Pronunciation clinic, lexical feedback, and actionable guidance" },
          { time: "15–20 min", task: "Rubric score finalization and Q&A with faculty" }
        ],
        checklist: [
          "Microphone and HD camera checked and functioning in Google Meet",
          "Quiet workspace with minimal background noise and good lighting",
          "Review your pre-session reflection notes and areas you wish to improve",
          "Join 3 minutes before your slot time to ensure smooth handover"
        ]
      });
    }
  });

  // 2. Conditionals Presentations (for each group)
  groups.forEach(g => {
    const isMyGroup = g.id === student?.groupId;
    const groupMembers = students.filter(s => s.groupId === g.id);
    const slot = g.presentationSlotConditionals;

    if (slot) {
      allMeetings.push({
        id: `cond-${g.id}`,
        type: "conditionals",
        typeLabel: "Activity #3 • Conditionals Presentation",
        typeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        title: `${g.name}: Conditionals Showcase`,
        subtitle: `Topic: "${g.conditionalsTopic}"`,
        date: slot.date,
        timeRange: slot.time,
        meetLink: slot.venue?.includes("meet.google.com") 
          ? `https://${slot.venue.split("meet.google.com/")[1]}` 
          : "https://meet.google.com/sst-eng-cond",
        venue: slot.venue,
        faculty: batchInfo.facultyName,
        participants: groupMembers.map(m => `${m.name} (${m.rollNo})`),
        isMyMeeting: isMyGroup,
        status: "scheduled",
        agenda: [
          { time: "0–3 min", task: "Screen sharing setup, audio check, and team introduction" },
          { time: "3–25 min", task: "Formal presentation delivery (Zero, First, Second, Third, Mixed Conditionals)" },
          { time: "25–35 min", task: "Faculty interactive Q&A testing each team member's grammar mastery" },
          { time: "35–40 min", task: "Immediate faculty remarks and rubric evaluation" }
        ],
        checklist: [
          "Presentation slide deck submitted on the portal and ready to present",
          "Designate one primary team member for screen sharing + one backup",
          "Every group member must speak and participate equally during delivery",
          "Ensure camera is on and formal attire is worn throughout the showcase"
        ]
      });
    }
  });

  // 3. Storytelling Presentations (for each group)
  groups.forEach(g => {
    const isMyGroup = g.id === student?.groupId;
    const groupMembers = students.filter(s => s.groupId === g.id);
    const slot = g.presentationSlotStorytelling;

    if (slot) {
      allMeetings.push({
        id: `story-${g.id}`,
        type: "storytelling",
        typeLabel: "Activity #4 • Storytelling Performance",
        typeColor: "bg-teal-100 text-teal-800 border-teal-200",
        title: `${g.name}: Narrative Arts Showcase`,
        subtitle: `Story Theme: "${g.storytellingTopic}"`,
        date: slot.date,
        timeRange: slot.time,
        meetLink: slot.venue?.includes("meet.google.com") 
          ? `https://${slot.venue.split("meet.google.com/")[1]}` 
          : "https://meet.google.com/sst-story-demo",
        venue: slot.venue,
        faculty: batchInfo.facultyName,
        participants: groupMembers.map(m => `${m.name} (${m.rollNo})`),
        isMyMeeting: isMyGroup,
        status: "scheduled",
        agenda: [
          { time: "0–2 min", task: "Atmospheric intro and character role assignment briefing" },
          { time: "2–25 min", task: "Collaborative storytelling performance (vocal modulation, suspense, narrative arc)" },
          { time: "25–35 min", task: "Faculty discussion on narrative diction, vocabulary, and transitions" },
          { time: "35–40 min", task: "Evaluation scoring and team synergy critique" }
        ],
        checklist: [
          "Script and dialogue outline submitted on the portal",
          "Sound effects or visual props tested beforehand if utilized",
          "Practice vocal modulation, dynamic pacing, and dramatic pauses",
          "Seamless handovers between narrator and character voices"
        ]
      });
    }
  });

  // 4. Daily 30x30 Sync for the group
  if (group) {
    allMeetings.unshift({
      id: `daily-30x30-${group.id}`,
      type: "thirtyThirty",
      typeLabel: "Activity #2 • Daily 30×30 Speaking Sync",
      typeColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: `${group.name}: Daily 30-Min Conversational Sync`,
      subtitle: "Daily sustained speaking practice, impromptu prompts, and streak maintenance",
      date: new Date().toISOString().split("T")[0],
      timeRange: "06:00 PM - 06:30 PM",
      meetLink: `https://meet.google.com/sst-daily-${group.id.toLowerCase()}`,
      venue: `Daily Virtual Study Room (${group.name})`,
      faculty: "Peer Group & Coordinator Led",
      participants: students.filter(s => s.groupId === group.id).map(m => `${m.name} (${m.rollNo})`),
      isMyMeeting: true,
      status: "scheduled",
      agenda: [
        { time: "0–5 min", task: "Daily prompt selection and quick check-in" },
        { time: "5–25 min", task: "Rapid-fire speech practice, peer debate, and pronunciation drills" },
        { time: "25–30 min", task: "Session notes submission and peer attendance log" }
      ],
      checklist: [
        "Pick today's prompt from the 30×30 challenge module",
        "Every member must speak continuously for at least 3 minutes",
        "Record attendance on the portal before concluding the call"
      ]
    });
  }

  // Filter meetings
  const filteredMeetings = allMeetings.filter(m => {
    if (filterType === "myMeetings" && !m.isMyMeeting) return false;
    if (filterType === "oneOnOne" && m.type !== "oneOnOne") return false;
    if (filterType === "conditionals" && m.type !== "conditionals") return false;
    if (filterType === "storytelling" && m.type !== "storytelling") return false;
    if (filterType === "thirtyThirty" && m.type !== "thirtyThirty") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.faculty.toLowerCase().includes(q) ||
        m.participants.some(p => p.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Official Meeting &amp; Scheduling Center
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                {batchInfo.batchTitle}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Live Meetings, Rooms &amp; Timetable
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Zero ambiguity. Every official meeting link, exact time slot, pre-meeting checklist, structured agenda, and 1-click Google Calendar sync in one place.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[200px] text-center shrink-0">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Scheduled Sessions</p>
            <p className="text-3xl font-black text-white mt-0.5">{allMeetings.length}</p>
            <p className="text-xs font-semibold text-brand-300">Across 11 SST Teams</p>
          </div>
        </div>
      </div>

      {/* Meeting Etiquette & Golden Rules Banner */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 sm:p-5 text-blue-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-blue-950 text-sm">Official Virtual Meeting Protocol</p>
            <p className="text-blue-800">
              <strong>1. Camera Mandate:</strong> All students must keep HD camera ON throughout evaluated sessions.
              <strong> • 2. Punctuality:</strong> Join 3–5 minutes prior to prevent slot delays.
              <strong> • 3. Attendance:</strong> Attendance is tracked live via Google Meet logs.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterType("myMeetings")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "myMeetings"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            ⭐ My Sessions Only
          </button>
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Batch Meetings ({allMeetings.length})
          </button>
          <button
            onClick={() => setFilterType("oneOnOne")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "oneOnOne"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            1:1 Feedback
          </button>
          <button
            onClick={() => setFilterType("conditionals")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "conditionals"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            Conditionals
          </button>
          <button
            onClick={() => setFilterType("storytelling")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "storytelling"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-teal-50 text-teal-700 hover:bg-teal-100"
            }`}
          >
            Storytelling
          </button>
          <button
            onClick={() => setFilterType("thirtyThirty")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "thirtyThirty"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            Daily 30×30
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search meeting, member, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500"
          />
        </div>

      </div>

      {/* Meeting Cards List */}
      <div className="space-y-4">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map(meeting => {
            const isExpanded = expandedChecklistId === meeting.id;
            const googleCalUrl = createGoogleCalendarUrl({
              title: `[SST English Lab] ${meeting.title}`,
              description: `${meeting.subtitle}\n\nVenue: ${meeting.meetLink}\nEvaluator: ${meeting.faculty}\n\nAGENDA:\n${meeting.agenda.map(a => `${a.time}: ${a.task}`).join("\n")}`,
              location: meeting.meetLink,
              date: meeting.date,
              timeRange: meeting.timeRange
            });

            return (
              <div
                key={meeting.id}
                className={`bg-white rounded-3xl border transition-all p-6 shadow-xs hover:shadow-md ${
                  meeting.isMyMeeting
                    ? "border-brand-300 ring-2 ring-brand-500/10"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  
                  {/* Meeting Core Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meeting.typeColor}`}>
                        {meeting.typeLabel}
                      </span>
                      {meeting.isMyMeeting && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                          ⭐ Assigned to You
                        </span>
                      )}
                      {meeting.status === "completed" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          ✅ Graded &amp; Completed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 animate-pulse">
                          📅 Confirmed Slot
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900">
                      {meeting.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">
                      {meeting.subtitle}
                    </p>

                    {/* Meta info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400">Date</p>
                          <p className="font-bold text-slate-900">{meeting.date}</p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400">Time Window</p>
                          <p className="font-bold text-slate-900">{meeting.timeRange}</p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-600 shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400">Evaluator / Lead</p>
                          <p className="font-bold text-slate-900 truncate">{meeting.faculty}</p>
                        </div>
                      </div>
                    </div>

                    {/* Participants Roster */}
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> Presenters / Participants:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {meeting.participants.map((p, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 font-semibold text-slate-700">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Room Access Column */}
                  <div className="lg:w-72 flex flex-col gap-2.5 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0">
                    
                    {/* Primary Join Button */}
                    <a
                      href={meeting.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <Video className="w-4 h-4" /> Join Google Meet Room
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Copy Link & Calendar Sync Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleCopyLink(meeting.id, meeting.meetLink)}
                        className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        {copiedMeetId === meeting.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Link
                          </>
                        )}
                      </button>

                      <a
                        href={googleCalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors text-center"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" /> Google Cal
                      </a>
                    </div>

                    {/* Toggle Checklist & Agenda */}
                    <button
                      onClick={() => setExpandedChecklistId(isExpanded ? null : meeting.id)}
                      className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-brand-600" />
                        {isExpanded ? "Hide Meeting Details" : "View Agenda & Checklist"}
                      </span>
                      <span className="text-[10px] text-brand-600 font-bold">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </button>

                  </div>

                </div>

                {/* Expanded Agenda & Checklist Section */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/70 p-5 rounded-2xl">
                    
                    {/* Minute-by-minute Agenda */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-600" /> Minute-by-Minute Session Structure
                      </h4>
                      <div className="space-y-1.5">
                        {meeting.agenda.map((ag, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                              {ag.time}
                            </span>
                            <span className="text-slate-600 pt-0.5 font-medium">{ag.task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Readiness Checklist */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pre-Meeting Readiness Checklist
                      </h4>
                      <ul className="space-y-1 text-xs">
                        {meeting.checklist.map((chk, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-700 font-medium">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{chk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-base font-bold text-slate-800">No sessions match your filter</p>
            <p className="text-xs text-slate-400 mt-1">
              Switch filter to "All Batch Meetings" or adjust your search term.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
