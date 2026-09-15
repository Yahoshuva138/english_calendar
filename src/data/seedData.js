// Seed data for English CR Activity & Grading Portal (English CR Hub)

export const INITIAL_BATCH_INFO = {
  courseName: "Professional English & Communication Skills Lab",
  courseCode: "ENG-202",
  department: "Computer Science & Engineering",
  semester: "Semester IV (2025-2026)",
  facultyName: "Dr. Sunita Mukherjee",
  facultyEmail: "s.mukherjee@college.edu",
  crName: "Rahul Verma (CR)",
  crContact: "+91 98765 43210",
  calendlyUrl: "https://calendly.com/dr-mukherjee-english/1-on-1-feedback",
  minAttendancePercent: 75,
};

export const ACTIVITIES_CONFIG = {
  oneOnOne: {
    id: "oneOnOne",
    title: "1:1 English Feedback",
    type: "Individual",
    duration: "15–20 min",
    maxMarks: 25,
    weightage: 25,
    description: "One-on-one diagnostic interview evaluating fluency, vocabulary range, pronunciation nuances, and natural conversational flow.",
    rubricCriteria: [
      { id: "fluency", name: "Fluency & Coherence", max: 7, desc: "Smooth speech rhythm, appropriate pauses, lack of filler words" },
      { id: "vocab", name: "Lexical Resource & Vocab", max: 6, desc: "Accuracy of vocabulary, avoidance of repetitive words" },
      { id: "grammar", name: "Grammatical Range & Accuracy", max: 6, desc: "Sentence variety, subject-verb agreement, tenses" },
      { id: "pronunciation", name: "Pronunciation & Intonation", max: 6, desc: "Clarity of speech, word stress, clarity of thought" }
    ]
  },
  thirtyThirty: {
    id: "thirtyThirty",
    title: "30 Minutes × 30 Days Challenge",
    type: "Group",
    duration: "30 min/day (30 Days)",
    maxMarks: 25,
    weightage: 25,
    description: "Daily sustained group conversational practice. Groups convene daily for 30 minutes to discuss prompts, maintain daily logs, and build speaking stamina.",
    rubricCriteria: [
      { id: "attendance", name: "Attendance & Consistency (>=75%)", max: 10, desc: "Attending daily 30-min group syncs over 30 days" },
      { id: "logQuality", name: "Daily Log & Reflection Quality", max: 8, desc: "Meaningful audio/written notes submitted per day" },
      { id: "peerEngagement", name: "Peer Support & Participation", max: 7, desc: "Active engagement, peer corrections, coordinator sign-off" }
    ]
  },
  conditionals: {
    id: "conditionals",
    title: "Conditionals Presentation",
    type: "Group",
    duration: "30–45 min",
    maxMarks: 25,
    weightage: 25,
    description: "Group technical/case presentation applying Zero, First, Second, Third, and Mixed conditionals to workplace, engineering, or real-life scenarios.",
    rubricCriteria: [
      { id: "grammaticalPrecision", name: "Conditionals Accuracy & Variety", max: 8, desc: "Correct usage of if-clauses, hypothetical grammar, and inversion" },
      { id: "slideContent", name: "Slide Quality & Structure", max: 6, desc: "Clarity, logical progression, professional visual formatting" },
      { id: "delivery", name: "Delivery & Public Speaking", max: 6, desc: "Eye contact, vocal projection, body language, engagement" },
      { id: "qa", name: "Q&A & Individual Contribution", max: 5, desc: "Ability to address faculty queries; equal participation by all members" }
    ]
  },
  storytelling: {
    id: "storytelling",
    title: "Storytelling Presentation",
    type: "Group",
    duration: "30–45 min",
    maxMarks: 25,
    weightage: 25,
    description: "Collaborative narrative performance. Teams craft and perform an engaging story (real or fictional) focusing on narrative arcs, voice modulation, and vivid imagery.",
    rubricCriteria: [
      { id: "narrativeStructure", name: "Narrative Arc & Hook", max: 8, desc: "Exposition, rising action, climax, resolution, and emotional resonance" },
      { id: "vocalModulation", name: "Vocal Modulation & Tone", max: 6, desc: "Expressive pitch, pacing, character voices, and dramatic pauses" },
      { id: "descriptiveLanguage", name: "Descriptive Imagery & Idioms", max: 6, desc: "Sensory details, evocative adjectives, figures of speech" },
      { id: "teamSynergy", name: "Team Synergy & Stage Presence", max: 5, desc: "Seamless transitions between storytellers, unified performance" }
    ]
  }
};

export const INITIAL_GROUPS = [
  {
    id: "G1",
    name: "Group 1 (The Articulators)",
    coordinatorId: "S01",
    conditionalsTopic: "Zero & First Conditionals in Critical Systems & Fail-Safes",
    storytellingTopic: "The Breakthrough: A True Tale of Scientific Discovery Against All Odds",
    presentationSlotConditionals: {
      date: "2026-09-22",
      time: "02:00 PM - 02:45 PM",
      venue: "Language Lab 2 / Google Meet: meet.google.com/eng-g1-cond",
      status: "scheduled"
    },
    presentationSlotStorytelling: {
      date: "2026-10-06",
      time: "02:00 PM - 02:45 PM",
      venue: "Auditorium Annex / Google Meet: meet.google.com/eng-g1-story",
      status: "scheduled"
    }
  },
  {
    id: "G2",
    name: "Group 2 (Polyglot Pioneers)",
    coordinatorId: "S05",
    conditionalsTopic: "Second Conditionals in Ethical Dilemmas: 'What If AI Took Over the Courtroom?'",
    storytellingTopic: "The Lost Manuscript: A Mystery in the Old University Archives",
    presentationSlotConditionals: {
      date: "2026-09-22",
      time: "02:45 PM - 03:30 PM",
      venue: "Language Lab 2 / Google Meet: meet.google.com/eng-g2-cond",
      status: "scheduled"
    },
    presentationSlotStorytelling: {
      date: "2026-10-06",
      time: "02:45 PM - 03:30 PM",
      venue: "Auditorium Annex / Google Meet: meet.google.com/eng-g2-story",
      status: "scheduled"
    }
  },
  {
    id: "G3",
    name: "Group 3 (Rhetoric Realm)",
    coordinatorId: "S09",
    conditionalsTopic: "Third Conditionals in Historical Pivots: 'If Apollo 11 Had Failed...'",
    storytellingTopic: "The Stranger on Platform 4: A Story of Empathy and Second Chances",
    presentationSlotConditionals: {
      date: "2026-09-24",
      time: "02:00 PM - 02:45 PM",
      venue: "Language Lab 2 / Google Meet: meet.google.com/eng-g3-cond",
      status: "scheduled"
    },
    presentationSlotStorytelling: {
      date: "2026-10-08",
      time: "02:00 PM - 02:45 PM",
      venue: "Auditorium Annex / Google Meet: meet.google.com/eng-g3-story",
      status: "scheduled"
    }
  },
  {
    id: "G4",
    name: "Group 4 (Echo Speakers)",
    coordinatorId: "S13",
    conditionalsTopic: "Mixed Conditionals in Startup Ventures: Past Decisions Shaping Present Tech",
    storytellingTopic: "Voices in the Code: The Legend of the Ghost in the Supercomputer",
    presentationSlotConditionals: {
      date: "2026-09-24",
      time: "02:45 PM - 03:30 PM",
      venue: "Language Lab 2 / Google Meet: meet.google.com/eng-g4-cond",
      status: "scheduled"
    },
    presentationSlotStorytelling: {
      date: "2026-10-08",
      time: "02:45 PM - 03:30 PM",
      venue: "Auditorium Annex / Google Meet: meet.google.com/eng-g4-story",
      status: "scheduled"
    }
  },
  {
    id: "G5",
    name: "Group 5 (Linguistic Legends)",
    coordinatorId: "S17",
    conditionalsTopic: "Inverted & Formal Conditionals: 'Had We Anticipated the Outage...'",
    storytellingTopic: "The Harvest of Hope: A Chronicle of Resilience in a Drought-Stricken Village",
    presentationSlotConditionals: {
      date: "2026-09-29",
      time: "02:00 PM - 02:45 PM",
      venue: "Language Lab 2 / Google Meet: meet.google.com/eng-g5-cond",
      status: "scheduled"
    },
    presentationSlotStorytelling: {
      date: "2026-10-13",
      time: "02:00 PM - 02:45 PM",
      venue: "Auditorium Annex / Google Meet: meet.google.com/eng-g5-story",
      status: "scheduled"
    }
  },
  {
    id: "G6",
    name: "Group 6 (Verbal Virtuosos)",
    coordinatorId: "S21",
    conditionalsTopic: "Conditionals in Crisis Negotiation & Public Relations Diplomacy",
    storytellingTopic: "The Last Lighthouse Keeper: Confronting the Storm of the Century",
    presentationSlotConditionals: {
      date: "2026-09-29",
      time: "02:45 PM - 03:30 PM",
      venue: "Language Lab 2 / Google Meet: meet.google.com/eng-g6-cond",
      status: "scheduled"
    },
    presentationSlotStorytelling: {
      date: "2026-10-13",
      time: "02:45 PM - 03:30 PM",
      venue: "Auditorium Annex / Google Meet: meet.google.com/eng-g6-story",
      status: "scheduled"
    }
  }
];

export const INITIAL_STUDENTS = [
  // Group 1
  {
    id: "S01",
    rollNo: "22BCSE01",
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    groupId: "G1",
    isCoordinator: true,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-18",
      slotTime: "10:00 AM - 10:20 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-001",
      reflectionNotes: "Focused on reducing filler sounds ('um', 'like') during technical explanations. Discussed project pitch.",
      rubricScores: { fluency: 6, vocab: 5, grammar: 6, pronunciation: 5 },
      totalScore: 22,
      facultyFeedback: "Impressive articulation. Work on pacing when explaining complex algorithmic ideas. Great lexical variety.",
      gradedAt: "2026-09-18T11:00:00"
    },
    thirtyThirtyDaysCompleted: 24,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 80,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "pending"
  },
  {
    id: "S02",
    rollNo: "22BCSE02",
    name: "Ananya Iyer",
    email: "ananya.iyer@college.edu",
    groupId: "G1",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-18",
      slotTime: "10:25 AM - 10:45 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-002",
      reflectionNotes: "Discussed improving confidence during Q&A and mastering formal business greetings.",
      rubricScores: { fluency: 7, vocab: 6, grammar: 6, pronunciation: 6 },
      totalScore: 25,
      facultyFeedback: "Exceptional command over vocabulary. Natural intonation and clear sentence structures. Keep it up!",
      gradedAt: "2026-09-18T11:30:00"
    },
    thirtyThirtyDaysCompleted: 26,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 87,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "pending"
  },
  {
    id: "S03",
    rollNo: "22BCSE03",
    name: "Bhavya Patel",
    email: "bhavya.patel@college.edu",
    groupId: "G1",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-20",
      slotTime: "11:00 AM - 11:20 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-003",
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 20,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 67, // AT RISK
    thirtyThirtyStatus: "at_risk",
    conditionalsStatus: "submitted",
    storytellingStatus: "pending"
  },
  {
    id: "S04",
    rollNo: "22BCSE04",
    name: "Chetan Reddy",
    email: "chetan.reddy@college.edu",
    groupId: "G1",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-18",
      slotTime: "11:25 AM - 11:45 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-004",
      reflectionNotes: "I want to improve my accent neutrality and eliminate regional tongue influences.",
      rubricScores: { fluency: 5, vocab: 5, grammar: 5, pronunciation: 4 },
      totalScore: 19,
      facultyFeedback: "Good confidence. Practice minimal pairs for /v/ vs /w/ and /th/ sounds. Daily 30-min reading will help.",
      gradedAt: "2026-09-18T12:00:00"
    },
    thirtyThirtyDaysCompleted: 23,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 77,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "pending"
  },

  // Group 2
  {
    id: "S05",
    rollNo: "22BCSE05",
    name: "Deepika Rao",
    email: "deepika.rao@college.edu",
    groupId: "G2",
    isCoordinator: true,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-19",
      slotTime: "10:00 AM - 10:20 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-005",
      reflectionNotes: "Practiced elevator pitch and formal meeting moderation phrases.",
      rubricScores: { fluency: 6, vocab: 6, grammar: 5, pronunciation: 6 },
      totalScore: 23,
      facultyFeedback: "Very polished speaker. Expresses complex thoughts with poise. Minor subject-verb agreement check needed.",
      gradedAt: "2026-09-19T10:40:00"
    },
    thirtyThirtyDaysCompleted: 27,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 90,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },
  {
    id: "S06",
    rollNo: "22BCSE06",
    name: "Eshaan Gupta",
    email: "eshaan.gupta@college.edu",
    groupId: "G2",
    isCoordinator: false,
    oneOnOne: {
      status: "unbooked", // AT RISK
      slotDate: null,
      slotTime: null,
      bookedVia: null,
      meetLink: null,
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 18,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 60, // AT RISK
    thirtyThirtyStatus: "at_risk",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },
  {
    id: "S07",
    rollNo: "22BCSE07",
    name: "Farhan Khan",
    email: "farhan.khan@college.edu",
    groupId: "G2",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-20",
      slotTime: "11:30 AM - 11:50 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-007",
      reflectionNotes: "Looking forward to working on impromptu speech clarity.",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 25,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 83,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },
  {
    id: "S08",
    rollNo: "22BCSE08",
    name: "Gayatri Nair",
    email: "gayatri.nair@college.edu",
    groupId: "G2",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-19",
      slotTime: "10:30 AM - 10:50 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-008",
      reflectionNotes: "Practiced storytelling hooks and voice modulation.",
      rubricScores: { fluency: 6, vocab: 6, grammar: 6, pronunciation: 6 },
      totalScore: 24,
      facultyFeedback: "Fluid speaker with rich descriptive vocabulary. Captivating narrative cadence.",
      gradedAt: "2026-09-19T11:00:00"
    },
    thirtyThirtyDaysCompleted: 26,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 87,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },

  // Group 3
  {
    id: "S09",
    rollNo: "22BCSE09",
    name: "Harsh Vardhan",
    email: "harsh.vardhan@college.edu",
    groupId: "G3",
    isCoordinator: true,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-19",
      slotTime: "11:00 AM - 11:20 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-009",
      reflectionNotes: "Prepared discussion on technical leadership communication.",
      rubricScores: { fluency: 6, vocab: 5, grammar: 5, pronunciation: 5 },
      totalScore: 21,
      facultyFeedback: "Confident delivery. Practice transition words (furthermore, nevertheless) for more formal academic register.",
      gradedAt: "2026-09-19T11:30:00"
    },
    thirtyThirtyDaysCompleted: 24,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 80,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending", // AT RISK - deadline soon
    storytellingStatus: "pending"
  },
  {
    id: "S10",
    rollNo: "22BCSE10",
    name: "Ishita Roy",
    email: "ishita.roy@college.edu",
    groupId: "G3",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-21",
      slotTime: "02:00 PM - 02:20 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-010",
      reflectionNotes: "I want feedback on presenting data effectively in English.",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 25,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 83,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S11",
    rollNo: "22BCSE11",
    name: "Jayant Joshi",
    email: "jayant.joshi@college.edu",
    groupId: "G3",
    isCoordinator: false,
    oneOnOne: {
      status: "unbooked", // AT RISK
      slotDate: null,
      slotTime: null,
      bookedVia: null,
      meetLink: null,
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 19,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 63, // AT RISK
    thirtyThirtyStatus: "at_risk",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S12",
    rollNo: "22BCSE12",
    name: "Kavya Menon",
    email: "kavya.menon@college.edu",
    groupId: "G3",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-19",
      slotTime: "11:30 AM - 11:50 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-012",
      reflectionNotes: "Overcame nervousness during impromptu question round.",
      rubricScores: { fluency: 6, vocab: 6, grammar: 6, pronunciation: 5 },
      totalScore: 23,
      facultyFeedback: "Strong vocabulary. Good modulation. Continue practicing rapid thinking without excessive pauses.",
      gradedAt: "2026-09-19T12:15:00"
    },
    thirtyThirtyDaysCompleted: 27,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 90,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },

  // Group 4
  {
    id: "S13",
    rollNo: "22BCSE13",
    name: "Lakshya Sen",
    email: "lakshya.sen@college.edu",
    groupId: "G4",
    isCoordinator: true,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-17",
      slotTime: "02:00 PM - 02:20 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-013",
      reflectionNotes: "Demonstrated clear storytelling intonation.",
      rubricScores: { fluency: 7, vocab: 6, grammar: 6, pronunciation: 6 },
      totalScore: 25,
      facultyFeedback: "High level of English proficiency. Great rhetorical flair.",
      gradedAt: "2026-09-17T03:00:00"
    },
    thirtyThirtyDaysCompleted: 28,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 93,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },
  {
    id: "S14",
    rollNo: "22BCSE14",
    name: "Meera Deshmukh",
    email: "meera.deshmukh@college.edu",
    groupId: "G4",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-21",
      slotTime: "02:30 PM - 02:50 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-014",
      reflectionNotes: "Prepared on situational interview questions.",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 26,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 87,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },
  {
    id: "S15",
    rollNo: "22BCSE15",
    name: "Nikhil Chawla",
    email: "nikhil.chawla@college.edu",
    groupId: "G4",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-17",
      slotTime: "02:30 PM - 02:50 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-015",
      reflectionNotes: "Worked on technical presentation delivery and pace.",
      rubricScores: { fluency: 5, vocab: 5, grammar: 5, pronunciation: 5 },
      totalScore: 20,
      facultyFeedback: "Clear and audible. Make sure not to rush when presenting slide bullet points.",
      gradedAt: "2026-09-17T03:15:00"
    },
    thirtyThirtyDaysCompleted: 23,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 77,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },
  {
    id: "S16",
    rollNo: "22BCSE16",
    name: "Pooja Hegde",
    email: "pooja.hegde@college.edu",
    groupId: "G4",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-21",
      slotTime: "03:00 PM - 03:20 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-016",
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 25,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 83,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "submitted",
    storytellingStatus: "submitted"
  },

  // Group 5
  {
    id: "S17",
    rollNo: "22BCSE17",
    name: "Pranav Varma",
    email: "pranav.varma@college.edu",
    groupId: "G5",
    isCoordinator: true,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-22",
      slotTime: "10:00 AM - 10:20 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-017",
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 22,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 73, // AT RISK (<75%)
    thirtyThirtyStatus: "at_risk",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S18",
    rollNo: "22BCSE18",
    name: "Riya Sen",
    email: "riya.sen@college.edu",
    groupId: "G5",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-17",
      slotTime: "03:00 PM - 03:20 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-018",
      reflectionNotes: "Good discussion on conversational body language and smile modulation.",
      rubricScores: { fluency: 6, vocab: 6, grammar: 6, pronunciation: 6 },
      totalScore: 24,
      facultyFeedback: "Engaging and clear. Great presence and natural English expression.",
      gradedAt: "2026-09-17T04:00:00"
    },
    thirtyThirtyDaysCompleted: 26,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 87,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S19",
    rollNo: "22BCSE19",
    name: "Siddharth Malhotra",
    email: "siddharth.m@college.edu",
    groupId: "G5",
    isCoordinator: false,
    oneOnOne: {
      status: "unbooked", // AT RISK
      slotDate: null,
      slotTime: null,
      bookedVia: null,
      meetLink: null,
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 17,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 57, // AT RISK
    thirtyThirtyStatus: "at_risk",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S20",
    rollNo: "22BCSE20",
    name: "Tanvi Agarwal",
    email: "tanvi.agarwal@college.edu",
    groupId: "G5",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-22",
      slotTime: "10:30 AM - 10:50 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-020",
      reflectionNotes: "Want to focus on corporate group discussion dynamics.",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 24,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 80,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },

  // Group 6
  {
    id: "S21",
    rollNo: "22BCSE21",
    name: "Utkarsh Singh",
    email: "utkarsh.singh@college.edu",
    groupId: "G6",
    isCoordinator: true,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-22",
      slotTime: "11:00 AM - 11:20 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-021",
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 26,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 87,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S22",
    rollNo: "22BCSE22",
    name: "Vedika Bhatia",
    email: "vedika.bhatia@college.edu",
    groupId: "G6",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-17",
      slotTime: "03:30 PM - 03:50 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-022",
      reflectionNotes: "Discussed voice modulation for debate and presentation delivery.",
      rubricScores: { fluency: 6, vocab: 6, grammar: 5, pronunciation: 6 },
      totalScore: 23,
      facultyFeedback: "Strong expressiveness. Keep reading editorial essays to maintain high level diction.",
      gradedAt: "2026-09-17T04:15:00"
    },
    thirtyThirtyDaysCompleted: 25,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 83,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S23",
    rollNo: "22BCSE23",
    name: "Waseem Akram",
    email: "waseem.akram@college.edu",
    groupId: "G6",
    isCoordinator: false,
    oneOnOne: {
      status: "scheduled",
      slotDate: "2026-09-22",
      slotTime: "11:30 AM - 11:50 AM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-023",
      reflectionNotes: "",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    thirtyThirtyDaysCompleted: 24,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 80,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  },
  {
    id: "S24",
    rollNo: "22BCSE24",
    name: "Zara Sheikh",
    email: "zara.sheikh@college.edu",
    groupId: "G6",
    isCoordinator: false,
    oneOnOne: {
      status: "graded",
      slotDate: "2026-09-18",
      slotTime: "02:00 PM - 02:20 PM",
      bookedVia: "calendely",
      meetLink: "https://meet.google.com/eng-fb-024",
      reflectionNotes: "Practiced spontaneous narrative structuring without scripted prompts.",
      rubricScores: { fluency: 7, vocab: 6, grammar: 6, pronunciation: 6 },
      totalScore: 25,
      facultyFeedback: "Eloquent and effortless delivery. Commendable vocabulary choices.",
      gradedAt: "2026-09-18T02:40:00"
    },
    thirtyThirtyDaysCompleted: 27,
    thirtyThirtyTotalDays: 30,
    thirtyThirtyAttendancePct: 90,
    thirtyThirtyStatus: "in_progress",
    conditionalsStatus: "pending",
    storytellingStatus: "pending"
  }
];

export const INITIAL_GROUP_SUBMISSIONS = {
  conditionals: {
    G1: {
      groupId: "G1",
      submittedBy: "S01 (Aarav Sharma)",
      submittedAt: "2026-09-20T14:30:00",
      slideUrl: "https://docs.google.com/presentation/d/1g1-conditionals-failsafes/view",
      scriptDocUrl: "https://docs.google.com/document/d/1g1-script-notes/view",
      summary: "In-depth case study analyzing Chernobyl and Boeing flight control failures using Zero & First conditionals to emphasize technical protocols.",
      status: "graded",
      rubricScores: { grammaticalPrecision: 8, slideContent: 6, delivery: 6, qa: 5 },
      totalScore: 25,
      facultyFeedback: "Remarkable application of engineering fail-safes to conditional grammar! Every member demonstrated clear articulation and answered technical grammar queries accurately.",
      gradedAt: "2026-09-22T16:00:00"
    },
    G2: {
      groupId: "G2",
      submittedBy: "S05 (Deepika Rao)",
      submittedAt: "2026-09-21T18:15:00",
      slideUrl: "https://docs.google.com/presentation/d/2g2-ai-courtroom-second-cond/view",
      scriptDocUrl: "https://docs.google.com/document/d/2g2-ai-script/view",
      summary: "Exploring courtroom AI judicial dilemmas through Second Conditionals ('If an algorithm sentenced a human, who would bear moral accountability?').",
      status: "submitted", // Pending grading
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    G4: {
      groupId: "G4",
      submittedBy: "S13 (Lakshya Sen)",
      submittedAt: "2026-09-21T21:00:00",
      slideUrl: "https://docs.google.com/presentation/d/4g4-startup-mixed-conditionals/view",
      scriptDocUrl: "https://docs.google.com/document/d/4g4-pitch-script/view",
      summary: "Startup autopsy examining how past pivots in Uber and Slack led to present valuations using Mixed Conditionals.",
      status: "submitted", // Pending grading
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    }
  },
  storytelling: {
    G2: {
      groupId: "G2",
      submittedBy: "S08 (Gayatri Nair)",
      submittedAt: "2026-09-21T19:00:00",
      slideUrl: "https://docs.google.com/presentation/d/2g2-lost-manuscript-story/view",
      scriptDocUrl: "https://docs.google.com/document/d/2g2-manuscript-dialogues/view",
      summary: "A thrilling radio-drama style narration of students discovering forgotten letters in the university basement.",
      status: "submitted", // Pending grading
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    G4: {
      groupId: "G4",
      submittedBy: "S13 (Lakshya Sen)",
      submittedAt: "2026-09-21T22:30:00",
      slideUrl: "https://docs.google.com/presentation/d/4g4-ghost-supercomputer/view",
      scriptDocUrl: "https://docs.google.com/document/d/4g4-cyber-ghost-script/view",
      summary: "Sci-fi narrative featuring voice modulation sound effects and suspenseful dialogue transitions between team members.",
      status: "graded",
      rubricScores: { narrativeStructure: 8, vocalModulation: 6, descriptiveLanguage: 5, teamSynergy: 5 },
      totalScore: 24,
      facultyFeedback: "Spellbinding performance! The vocal pacing and atmospheric soundscape created an authentic dramatic theater atmosphere. Great teamwork.",
      gradedAt: "2026-09-22T17:30:00"
    }
  }
};

export const INITIAL_30X30_LOGS = {
  // Recent 5 days sample logs for Group 1
  G1: [
    { day: 26, date: "2026-09-15", topic: "Defending a Counter-Intuitive Opinion in 90 Seconds", notes: "All 4 members spoke. Bhavya struggled with transition phrases; Ananya helped her reframe.", attendedStudentIds: ["S01", "S02", "S04"] },
    { day: 25, date: "2026-09-14", topic: "Idioms in Negotiation (e.g., 'Bite the bullet', 'Ball in your court')", notes: "Discussed real-life salary negotiation dialogues. 100% attendance.", attendedStudentIds: ["S01", "S02", "S03", "S04"] },
    { day: 24, date: "2026-09-13", topic: "Mock Technical Interview: Explaining Recursion to a 10-Year-Old", notes: "Focused on simple analogies, avoiding jargon. Aarav and Chetan paired up.", attendedStudentIds: ["S01", "S02", "S03", "S04"] },
    { day: 23, date: "2026-09-12", topic: "Pronunciation Clinic: Consonant Clusters (/spl/, /str/, /mps/)", notes: "Read tongue twisters and recorded WhatsApp audio clips.", attendedStudentIds: ["S01", "S02", "S04"] },
    { day: 22, date: "2026-09-11", topic: "TED Talk Breakdown: Analyzing Julian Treasure's 'How to Speak so That People Want to Listen'", notes: "Group analyzed vocal registers and prosody.", attendedStudentIds: ["S01", "S02", "S03", "S04"] }
  ],
  G2: [
    { day: 26, date: "2026-09-15", topic: "Storytelling Character Voice Practice", notes: "Rehearsed character archetypes for the storytelling project.", attendedStudentIds: ["S05", "S07", "S08"] },
    { day: 25, date: "2026-09-14", topic: "Conditionals Grammar Speed Drill", notes: "Rapid-fire 10-second conditional sentence completion.", attendedStudentIds: ["S05", "S06", "S07", "S08"] }
  ]
};

export const AVAILABLE_ONE_ON_ONE_SLOTS = [
  { id: "SLOT-01", date: "2026-09-23", time: "10:00 AM - 10:20 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open01" },
  { id: "SLOT-02", date: "2026-09-23", time: "10:25 AM - 10:45 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open02" },
  { id: "SLOT-03", date: "2026-09-23", time: "10:50 AM - 11:10 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open03" },
  { id: "SLOT-04", date: "2026-09-23", time: "11:15 AM - 11:35 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open04" },
  { id: "SLOT-05", date: "2026-09-24", time: "02:00 PM - 02:20 PM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open05" },
  { id: "SLOT-06", date: "2026-09-24", time: "02:25 PM - 02:45 PM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open06" },
  { id: "SLOT-07", date: "2026-09-24", time: "02:50 PM - 03:10 PM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open07" },
  { id: "SLOT-08", date: "2026-09-25", time: "10:00 AM - 10:20 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open08" },
  { id: "SLOT-09", date: "2026-09-25", time: "10:25 AM - 10:45 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open09" },
  { id: "SLOT-10", date: "2026-09-25", time: "10:50 AM - 11:10 AM", status: "open", faculty: "Dr. Sunita Mukherjee", meetLink: "https://meet.google.com/eng-fb-open10" }
];
