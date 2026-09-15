// Official Batch Seed Data for Scaler School of Technology (SST)
// ENGLISH C _ TERM 1 _ 2030 _ ASSIGNMENT (44 Students, 11 Groups)

export const INITIAL_BATCH_INFO = {
  courseName: "English Communication & Oral Discourse (Term 1)",
  courseCode: "ENGLISH-C-2030",
  batchTitle: "English C • Term 1 • Batch 2030",
  institution: "Scaler School of Technology (SST)",
  department: "Undergraduate Program in Computer Science",
  semester: "Term 1 (Class of 2030)",
  facultyName: "Prof. English Communication In-charge",
  facultyEmail: "english.eval@sst.scaler.com",
  crName: "Yahoshuva Kesaboyina (CR)",
  crEmail: "yahoshuva.26bcs10296@sst.scaler.com",
  crContact: "+91 98765 43210",
  calendlyUrl: "https://calendly.com/sst-english-eval/1-on-1-feedback",
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
    name: "Group 1",
    coordinatorId: "S01",
    conditionalsTopic: "Zero & First Conditionals in Software Architecture & High-Availability Failovers",
    storytellingTopic: "The Midnight Outage: How a Junior Dev Saved the Production Database",
    presentationSlotConditionals: { date: "2026-09-22", time: "02:00 PM - 02:40 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g1" },
    presentationSlotStorytelling: { date: "2026-10-06", time: "02:00 PM - 02:40 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g1" }
  },
  {
    id: "G2",
    name: "Group 2",
    coordinatorId: "S05",
    conditionalsTopic: "Second Conditionals in Technology Ethics: 'What If Autonomous Algorithms Held Legal Personhood?'",
    storytellingTopic: "The Cryptographic Secret: An Unsolved Mystery from the Bletchley Park Vaults",
    presentationSlotConditionals: { date: "2026-09-22", time: "02:45 PM - 03:25 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g2" },
    presentationSlotStorytelling: { date: "2026-10-06", time: "02:45 PM - 03:25 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g2" }
  },
  {
    id: "G3",
    name: "Group 3",
    coordinatorId: "S09",
    conditionalsTopic: "Third Conditionals in Computing History: 'If the Apollo Guidance Computer Had Crashed at 1202...'",
    storytellingTopic: "The Stranger on the Night Train: An Anecdote on Empathy and Unexpected Mentorship",
    presentationSlotConditionals: { date: "2026-09-24", time: "02:00 PM - 02:40 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g3" },
    presentationSlotStorytelling: { date: "2026-10-08", time: "02:00 PM - 02:40 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g3" }
  },
  {
    id: "G4",
    name: "Group 4",
    coordinatorId: "S13",
    conditionalsTopic: "Mixed Conditionals in Tech Entrepreneurship: Past Strategic Pivots Shaping Present Market Cap",
    storytellingTopic: "The Echoes in the Supercomputer: A Ghost in the Quantum Circuitry",
    presentationSlotConditionals: { date: "2026-09-24", time: "02:45 PM - 03:25 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g4" },
    presentationSlotStorytelling: { date: "2026-10-08", time: "02:45 PM - 03:25 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g4" }
  },
  {
    id: "G5",
    name: "Group 5",
    coordinatorId: "S17",
    conditionalsTopic: "Inverted & Formal Conditionals in Corporate Governance: 'Had the Board Enforced Protocols...'",
    storytellingTopic: "The Last Watchmaker: Craftsmanship Confronting the Digital Age",
    presentationSlotConditionals: { date: "2026-09-26", time: "02:00 PM - 02:40 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g5" },
    presentationSlotStorytelling: { date: "2026-10-10", time: "02:00 PM - 02:40 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g5" }
  },
  {
    id: "G6",
    name: "Group 6",
    coordinatorId: "S21",
    conditionalsTopic: "Conditionals in Cyber Defense & Zero-Trust: Formulating Threat Containment Logic",
    storytellingTopic: "Beyond the Event Horizon: A Voyager Probe's Sentient Farewell",
    presentationSlotConditionals: { date: "2026-09-26", time: "02:45 PM - 03:25 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g6" },
    presentationSlotStorytelling: { date: "2026-10-10", time: "02:45 PM - 03:25 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g6" }
  },
  {
    id: "G7",
    name: "Group 7",
    coordinatorId: "S25",
    conditionalsTopic: "Second & Third Conditionals in AI Hallucination & Critical Medical Diagnostics",
    storytellingTopic: "The Forgotten Symphony: Reconstructing a Lost Masterpiece in Vienna",
    presentationSlotConditionals: { date: "2026-09-29", time: "02:00 PM - 02:40 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g7" },
    presentationSlotStorytelling: { date: "2026-10-13", time: "02:00 PM - 02:40 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g7" }
  },
  {
    id: "G8",
    name: "Group 8",
    coordinatorId: "S29",
    conditionalsTopic: "Conditionals in Crisis Communications & Public Relations Diplomacy",
    storytellingTopic: "The Lighthouse Keeper's Final Log: The Gale of 1928",
    presentationSlotConditionals: { date: "2026-09-29", time: "02:45 PM - 03:25 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g8" },
    presentationSlotStorytelling: { date: "2026-10-13", time: "02:45 PM - 03:25 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g8" }
  },
  {
    id: "G9",
    name: "Group 9",
    coordinatorId: "S33",
    conditionalsTopic: "Hypothetical Conditionals in Product Roadmapping & Scalability Deadlocks",
    storytellingTopic: "Wings Across the Thar: A Story of Migratory Birds and Human Kinship",
    presentationSlotConditionals: { date: "2026-10-01", time: "02:00 PM - 02:40 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g9" },
    presentationSlotStorytelling: { date: "2026-10-15", time: "02:00 PM - 02:40 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g9" }
  },
  {
    id: "G10",
    name: "Group 10",
    coordinatorId: "S37",
    conditionalsTopic: "Conditionals in Financial Risk Mitigation & Algorithmic Flash Crash Prevention",
    storytellingTopic: "The Code in the Clay: An Archaeologist's Discovery of Ancient Algorithms",
    presentationSlotConditionals: { date: "2026-10-01", time: "02:45 PM - 03:25 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g10" },
    presentationSlotStorytelling: { date: "2026-10-15", time: "02:45 PM - 03:25 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g10" }
  },
  {
    id: "G11",
    name: "Group 11",
    coordinatorId: "S41", // Yahoshuva Kesaboyina (CR)
    conditionalsTopic: "Conditionals in Next-Gen Engineering Protocols: Human-Computer Symbiosis",
    storytellingTopic: "The Last Signal from Kepler-186f: A Tale of First Contact and Linguistic Bridge",
    presentationSlotConditionals: { date: "2026-10-03", time: "02:00 PM - 02:40 PM", venue: "Lab 101 / Google Meet: meet.google.com/sst-eng-g11" },
    presentationSlotStorytelling: { date: "2026-10-17", time: "02:00 PM - 02:40 PM", venue: "Seminar Hall / Google Meet: meet.google.com/sst-story-g11" }
  }
];

// Helper to construct realistic 44 student records
const rawStudentList = [
  { id: "S01", name: "Abhiram Wayakar", email: "abhiram.26bcs10535@sst.scaler.com", rollNo: "26BCS10535", groupId: "G1", isCoordinator: true },
  { id: "S02", name: "Adapa Ramcharan Tej", email: "adapa.26bcs10283@sst.scaler.com", rollNo: "26BCS10283", groupId: "G1", isCoordinator: false },
  { id: "S03", name: "Aditya Mohite", email: "aditya.26bcs10438@sst.scaler.com", rollNo: "26BCS10438", groupId: "G1", isCoordinator: false },
  { id: "S04", name: "Aditya Shaw", email: "aditya.26bcs10424@sst.scaler.com", rollNo: "26BCS10424", groupId: "G1", isCoordinator: false },

  { id: "S05", name: "Aditya sinh Upendrasinh Gohil", email: "adityasinh.26bcs10624@sst.scaler.com", rollNo: "26BCS10624", groupId: "G2", isCoordinator: true },
  { id: "S06", name: "Anmol Kumar", email: "anmol.26bcs10068@sst.scaler.com", rollNo: "26BCS10068", groupId: "G2", isCoordinator: false },
  { id: "S07", name: "Ashirvad Srivastava", email: "ashirvad.26bcs10462@sst.scaler.com", rollNo: "26BCS10462", groupId: "G2", isCoordinator: false },
  { id: "S08", name: "Ashuvardhan Parsha", email: "ashuvardhan.26bcs10477@sst.scaler.com", rollNo: "26BCS10477", groupId: "G2", isCoordinator: false },

  { id: "S09", name: "Bhavya Jain", email: "bhavya.26bcs10565@sst.scaler.com", rollNo: "26BCS10565", groupId: "G3", isCoordinator: true },
  { id: "S10", name: "Bhupen Yadav", email: "bhupen.26bcs10647@sst.scaler.com", rollNo: "26BCS10647", groupId: "G3", isCoordinator: false },
  { id: "S11", name: "Dheeraj Choudhary", email: "dheeraj.26bcs10311@sst.scaler.com", rollNo: "26BCS10311", groupId: "G3", isCoordinator: false },
  { id: "S12", name: "Divyanshika Sharma", email: "divyanshika.26bcs10093@sst.scaler.com", rollNo: "26BCS10093", groupId: "G3", isCoordinator: false },

  { id: "S13", name: "Gongati Naga Varun Kumar", email: "gongati.26bcs10483@sst.scaler.com", rollNo: "26BCS10483", groupId: "G4", isCoordinator: true },
  { id: "S14", name: "Govardhan Reddy Vangala", email: "govardhan.26bcs10036@sst.scaler.com", rollNo: "26BCS10036", groupId: "G4", isCoordinator: false },
  { id: "S15", name: "Guruprasad Revannath Yadav", email: "guruprasad.26bcs10437@sst.scaler.com", rollNo: "26BCS10437", groupId: "G4", isCoordinator: false },
  { id: "S16", name: "Ishan Kirpekar", email: "ishan.26bcs10269@sst.scaler.com", rollNo: "26BCS10269", groupId: "G4", isCoordinator: false },

  { id: "S17", name: "Janani S", email: "janani.26bcs10409@sst.scaler.com", rollNo: "26BCS10409", groupId: "G5", isCoordinator: true },
  { id: "S18", name: "Kabir Kwatra", email: "kabir.26bcs10443@sst.scaler.com", rollNo: "26BCS10443", groupId: "G5", isCoordinator: false },
  { id: "S19", name: "Karpurapu Gokul", email: "karpurapu.26bcs10065@sst.scaler.com", rollNo: "26BCS10065", groupId: "G5", isCoordinator: false },
  { id: "S20", name: "Madhira Nanda Kishore Reddy", email: "madhira.26bcs10478@sst.scaler.com", rollNo: "26BCS10478", groupId: "G5", isCoordinator: false },

  { id: "S21", name: "Madireddy Vivekvardhan Reddy", email: "madireddy.26bcs10525@sst.scaler.com", rollNo: "26BCS10525", groupId: "G6", isCoordinator: true },
  { id: "S22", name: "Majeti Vinayaka Subramanya Srinivasa", email: "majeti.26bcs10410@sst.scaler.com", rollNo: "26BCS10410", groupId: "G6", isCoordinator: false },
  { id: "S23", name: "Pabbula Pranathi", email: "pabbula.26bcs10472@sst.scaler.com", rollNo: "26BCS10472", groupId: "G6", isCoordinator: false },
  { id: "S24", name: "Panuganti Sricharan", email: "panuganti.26bcs10452@sst.scaler.com", rollNo: "26BCS10452", groupId: "G6", isCoordinator: false },

  { id: "S25", name: "Pendyala Sri Vaishnav", email: "sri.26bcs10412@sst.scaler.com", rollNo: "26BCS10412", groupId: "G7", isCoordinator: true },
  { id: "S26", name: "Piyush Mondal", email: "piyush.26bcs10401@sst.scaler.com", rollNo: "26BCS10401", groupId: "G7", isCoordinator: false },
  { id: "S27", name: "Pradeep Dasari", email: "pradeep.26bcs10347@sst.scaler.com", rollNo: "26BCS10347", groupId: "G7", isCoordinator: false },
  { id: "S28", name: "Prajjwal Pandey", email: "prajjwal.26bcs10457@sst.scaler.com", rollNo: "26BCS10457", groupId: "G7", isCoordinator: false },

  { id: "S29", name: "Rahamtulla Mohammad", email: "rahamtulla.26bcs10323@sst.scaler.com", rollNo: "26BCS10323", groupId: "G8", isCoordinator: true },
  { id: "S30", name: "Sai Pragneshwar Amani", email: "sai.26bcs10458@sst.scaler.com", rollNo: "26BCS10458", groupId: "G8", isCoordinator: false },
  { id: "S31", name: "Satya Mukhesh Aravind Balla Balla", email: "satya.26bcs10121@sst.scaler.com", rollNo: "26BCS10121", groupId: "G8", isCoordinator: false },
  { id: "S32", name: "Shashwat Mishra", email: "shashwat.26bcs10189@sst.scaler.com", rollNo: "26BCS10189", groupId: "G8", isCoordinator: false },

  { id: "S33", name: "Shiwang Gupta", email: "shiwang.26bcs10648@sst.scaler.com", rollNo: "26BCS10648", groupId: "G9", isCoordinator: true },
  { id: "S34", name: "Shreyansh Bhawsar Bhawsar", email: "shreyansh.26bcs10292@sst.scaler.com", rollNo: "26BCS10292", groupId: "G9", isCoordinator: false },
  { id: "S35", name: "Shubh Soni", email: "shubh.26bcs10318@sst.scaler.com", rollNo: "26BCS10318", groupId: "G9", isCoordinator: false },
  { id: "S36", name: "Siddhant Dubey", email: "siddhant.26bcs10516@sst.scaler.com", rollNo: "26BCS10516", groupId: "G9", isCoordinator: false },

  { id: "S37", name: "Subhramanya Trivikrama Abhinav Devisetti", email: "subhramanya.26bcs10238@sst.scaler.com", rollNo: "26BCS10238", groupId: "G10", isCoordinator: true },
  { id: "S38", name: "Tumati Jai Charan", email: "tumati.26bcs10404@sst.scaler.com", rollNo: "26BCS10404", groupId: "G10", isCoordinator: false },
  { id: "S39", name: "Utkarsh Tiwari", email: "utkarsh.26bcs10512@sst.scaler.com", rollNo: "26BCS10512", groupId: "G10", isCoordinator: false },
  { id: "S40", name: "Vinit Chauhan", email: "vinit.26bcs10521@sst.scaler.com", rollNo: "26BCS10521", groupId: "G10", isCoordinator: false },

  { id: "S41", name: "Yahoshuva Kesaboyina", email: "yahoshuva.26bcs10296@sst.scaler.com", rollNo: "26BCS10296", groupId: "G11", isCoordinator: true },
  { id: "S42", name: "Yashaswin Ankennapalli", email: "yashaswin.26bcs10450@sst.scaler.com", rollNo: "26BCS10450", groupId: "G11", isCoordinator: false },
  { id: "S43", name: "Yugandhar Bhatlawande", email: "yugandhar.26bcs10664@sst.scaler.com", rollNo: "26BCS10664", groupId: "G11", isCoordinator: false },
  { id: "S44", name: "Satwinderjeet Singh Sidhu", email: "satwinderjeet.26bcs10718@sst.scaler.com", rollNo: "26BCS10718", groupId: "G11", isCoordinator: false }
];

export const INITIAL_STUDENTS = rawStudentList.map(s => {
  // Give Yahoshuva Kesaboyina (CR) a strong profile
  if (s.id === "S41") {
    return {
      ...s,
      oneOnOne: {
        status: "graded",
        slotDate: "2026-09-20",
        slotTime: "10:00 AM - 10:20 AM",
        bookedVia: "calendely",
        meetLink: "https://meet.google.com/sst-fb-cr",
        reflectionNotes: "Focused on technical discourse pacing, avoiding regional inflection, and executive briefing clarity.",
        rubricScores: { fluency: 7, vocab: 6, grammar: 6, pronunciation: 6 },
        totalScore: 25,
        facultyFeedback: "Excellent command over diction, leadership clarity, and articulate delivery. Great representative presence.",
        gradedAt: "2026-09-20T11:00:00"
      },
      thirtyThirtyDaysCompleted: 26,
      thirtyThirtyTotalDays: 30,
      thirtyThirtyAttendancePct: 87,
      thirtyThirtyStatus: "in_progress",
      conditionalsStatus: "submitted",
      storytellingStatus: "submitted"
    };
  }

  // Pre-seed some graded, some scheduled, some at-risk for realism
  const numId = parseInt(s.id.replace("S", ""), 10);
  
  if (numId % 5 === 0) {
    // At risk student: unbooked 1:1, low attendance
    return {
      ...s,
      oneOnOne: {
        status: "unbooked",
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
      thirtyThirtyAttendancePct: 60, // Below 75%
      thirtyThirtyStatus: "at_risk",
      conditionalsStatus: "pending",
      storytellingStatus: "pending"
    };
  } else if (numId % 2 === 0) {
    // Graded
    return {
      ...s,
      oneOnOne: {
        status: "graded",
        slotDate: "2026-09-18",
        slotTime: "10:30 AM - 10:50 AM",
        bookedVia: "calendely",
        meetLink: `https://meet.google.com/sst-fb-${s.id.toLowerCase()}`,
        reflectionNotes: "Prepared discussion on structuring impromptu technical answers.",
        rubricScores: { fluency: 6, vocab: 5, grammar: 6, pronunciation: 5 },
        totalScore: 22,
        facultyFeedback: "Good confidence and sentence rhythm. Work on varied transition adverbs.",
        gradedAt: "2026-09-18T11:30:00"
      },
      thirtyThirtyDaysCompleted: 25,
      thirtyThirtyTotalDays: 30,
      thirtyThirtyAttendancePct: 83,
      thirtyThirtyStatus: "in_progress",
      conditionalsStatus: "submitted",
      storytellingStatus: "pending"
    };
  } else {
    // Scheduled
    return {
      ...s,
      oneOnOne: {
        status: "scheduled",
        slotDate: "2026-09-23",
        slotTime: "11:00 AM - 11:20 AM",
        bookedVia: "internal_portal",
        meetLink: `https://meet.google.com/sst-fb-${s.id.toLowerCase()}`,
        reflectionNotes: "Looking forward to diagnostic feedback on public speaking.",
        rubricScores: null,
        totalScore: null,
        facultyFeedback: "",
        gradedAt: null
      },
      thirtyThirtyDaysCompleted: 24,
      thirtyThirtyTotalDays: 30,
      thirtyThirtyAttendancePct: 80,
      thirtyThirtyStatus: "in_progress",
      conditionalsStatus: "submitted",
      storytellingStatus: "pending"
    };
  }
});

export const INITIAL_GROUP_SUBMISSIONS = {
  conditionals: {
    G1: {
      groupId: "G1",
      submittedBy: "26BCS10535 (Abhiram Wayakar)",
      submittedAt: "2026-09-20T14:30:00",
      slideUrl: "https://docs.google.com/presentation/d/g1-sst-conditionals-deck/view",
      scriptDocUrl: "https://docs.google.com/document/d/g1-sst-script/view",
      summary: "Case study analyzing high-availability distributed systems using Zero & First Conditionals for failover protocols.",
      status: "graded",
      rubricScores: { grammaticalPrecision: 8, slideContent: 6, delivery: 6, qa: 5 },
      totalScore: 25,
      facultyFeedback: "Remarkable application of computer systems logic to conditional grammar! Every member demonstrated clear articulation.",
      gradedAt: "2026-09-22T16:00:00"
    },
    G4: {
      groupId: "G4",
      submittedBy: "26BCS10483 (Gongati Naga Varun Kumar)",
      submittedAt: "2026-09-21T18:00:00",
      slideUrl: "https://docs.google.com/presentation/d/g4-sst-mixed-conditionals/view",
      scriptDocUrl: "https://docs.google.com/document/d/g4-sst-script/view",
      summary: "Startup pivot autopsy using Mixed Conditionals to explore counterfactual business outcomes.",
      status: "submitted",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    G11: {
      groupId: "G11",
      submittedBy: "26BCS10296 (Yahoshuva Kesaboyina)",
      submittedAt: "2026-09-21T21:00:00",
      slideUrl: "https://docs.google.com/presentation/d/g11-sst-ai-symbiosis-conditionals/view",
      scriptDocUrl: "https://docs.google.com/document/d/g11-sst-script/view",
      summary: "Next-gen engineering protocols: Inverted & mixed conditionals applied to human-in-the-loop autonomous compilers.",
      status: "submitted", // Ready for faculty grading
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    }
  },
  storytelling: {
    G1: {
      groupId: "G1",
      submittedBy: "26BCS10535 (Abhiram Wayakar)",
      submittedAt: "2026-09-21T19:00:00",
      slideUrl: "https://docs.google.com/presentation/d/g1-sst-story-midnight-outage/view",
      scriptDocUrl: "https://docs.google.com/document/d/g1-sst-story-script/view",
      summary: "Radio-drama style narration of a junior dev resolving a high-concurrency database lock.",
      status: "submitted",
      rubricScores: null,
      totalScore: null,
      facultyFeedback: "",
      gradedAt: null
    },
    G11: {
      groupId: "G11",
      submittedBy: "26BCS10296 (Yahoshuva Kesaboyina)",
      submittedAt: "2026-09-21T22:30:00",
      slideUrl: "https://docs.google.com/presentation/d/g11-sst-kepler-story/view",
      scriptDocUrl: "https://docs.google.com/document/d/g11-sst-kepler-script/view",
      summary: "Sci-fi narrative featuring voice modulation, cosmic atmospheric soundscape, and suspenseful team transitions.",
      status: "graded",
      rubricScores: { narrativeStructure: 8, vocalModulation: 6, descriptiveLanguage: 5, teamSynergy: 5 },
      totalScore: 24,
      facultyFeedback: "Spellbinding performance! The vocal pacing and atmospheric soundscape created an authentic dramatic theater atmosphere. Great teamwork.",
      gradedAt: "2026-09-22T17:30:00"
    }
  }
};

export const INITIAL_30X30_LOGS = {
  G11: [
    { day: 26, date: "2026-09-15", topic: "Defending a Counter-Intuitive Technical Decision in 90 Seconds", notes: "Yahoshuva, Yashaswin, and Yugandhar spoke. Satwinderjeet joined via audio. Great impromptu defense of asynchronous architectures.", attendedStudentIds: ["S41", "S42", "S43", "S44"] },
    { day: 25, date: "2026-09-14", topic: "Idioms in Technical Leadership ('Cut corners', 'Touch base', 'Move the needle')", notes: "Practiced corporate board meeting dialogues. 100% group attendance.", attendedStudentIds: ["S41", "S42", "S43", "S44"] },
    { day: 24, date: "2026-09-13", topic: "Mock Technical Interview: Explaining Inverted Indexes to a Layperson", notes: "Focused on clean analogies without technical jargon.", attendedStudentIds: ["S41", "S42", "S43", "S44"] },
    { day: 23, date: "2026-09-12", topic: "Pronunciation Clinic: Consonant Clusters and Accent Neutrality", notes: "Focused on clear /th/ and /r/ sounds with rapid drills.", attendedStudentIds: ["S41", "S42", "S44"] }
  ],
  G1: [
    { day: 25, date: "2026-09-14", topic: "Debate on Monolith vs Microservices Communication Patterns", notes: "All 4 members participated.", attendedStudentIds: ["S01", "S02", "S03", "S04"] }
  ]
};

export const AVAILABLE_ONE_ON_ONE_SLOTS = [
  { id: "SLOT-01", date: "2026-09-23", time: "10:00 AM - 10:20 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-01" },
  { id: "SLOT-02", date: "2026-09-23", time: "10:25 AM - 10:45 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-02" },
  { id: "SLOT-03", date: "2026-09-23", time: "10:50 AM - 11:10 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-03" },
  { id: "SLOT-04", date: "2026-09-23", time: "11:15 AM - 11:35 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-04" },
  { id: "SLOT-05", date: "2026-09-24", time: "02:00 PM - 02:20 PM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-05" },
  { id: "SLOT-06", date: "2026-09-24", time: "02:25 PM - 02:45 PM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-06" },
  { id: "SLOT-07", date: "2026-09-24", time: "02:50 PM - 03:10 PM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-07" },
  { id: "SLOT-08", date: "2026-09-25", time: "10:00 AM - 10:20 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-08" },
  { id: "SLOT-09", date: "2026-09-25", time: "10:25 AM - 10:45 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-09" },
  { id: "SLOT-10", date: "2026-09-25", time: "10:50 AM - 11:10 AM", status: "open", faculty: "Prof. English In-charge", meetLink: "https://meet.google.com/sst-open-10" }
];
