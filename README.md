# English CR Activity & Grading Portal (English CR Hub)

A centralized web application for managing, scheduling, submitting, and grading mandatory English activities for a college/university batch.

Built to replace fragmented workflows by integrating individual 1:1 faculty scheduling, group allocations, daily 30-day streak tracking, slide/script submissions, interactive rubric grading, at-risk student intervention, and consolidated Excel gradebook exports.

---

## 🌟 Features

### 🎓 Student Experience
1. **Student Dashboard**: Real-time overall score (/100), letter grade forecasting, mandatory completion progress, 30×30 daily streak counter, and attendance health.
2. **1:1 English Feedback (Activity #1 - 25 Marks)**:
   - External Calendly integration link + embedded faculty scheduling.
   - Internal 10-slot booking desk with Google Meet links.
   - Pre/post-session self-reflection submission.
   - Granular rubric scorecard breakdown (Fluency, Lexical Resource, Grammar, Pronunciation).
3. **30 Minutes × 30 Days (Activity #2 - 25 Marks)**:
   - Color-coded 30-day visual streak tracker.
   - Daily check-in modal with conversation prompts and peer attendance logging.
   - Automated tracking of the mandatory 75% attendance threshold.
4. **Conditionals Presentation (Activity #3 - 25 Marks)**:
   - Assigned group conditional grammar topics.
   - Presentation schedules and Google Meet room details.
   - Slide deck (Google Slides) and speaking script submission.
   - 4-criteria rubric evaluation display.
5. **Storytelling Presentation (Activity #4 - 25 Marks)**:
   - Narrative arcs, moral dilemmas, and collaborative storytelling themes.
   - Slide props and dialogue script submission.
   - Vocal modulation and team synergy rubric review.

### 👩‍🏫 CR & Faculty ("Mam") Admin Center
1. **Grading Desk**: Unified review queue across all 4 activities with an interactive **Rubric Grading Modal** (criteria sliders, instant total score calculation, preset feedback chips, and faculty remarks).
2. **Master Gradebook**: Full batch table with search, group filter, and **1-click Excel / CSV export** (`.csv` formatted with UTF-8 BOM).
3. **At-Risk Intervention Monitor**: Auto-flags students who fall below 75% attendance or have not booked their 1:1 slot, with a **1-click "Copy WhatsApp Reminder"** button.
4. **Group & Schedule Manager**: Comprehensive roster of all 6 student groups with assigned topics, dates, and venue links.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **Persistence**: Reactive `localStorage` service pre-seeded with 24 realistic student profiles and groups
- **Exporting**: Native browser Blob/CSV generator with Excel UTF-8 BOM

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Yahoshuva138/english_calendar.git
cd english_calendar
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Roles & Testing
Use the toggle in the top navigation bar to seamlessly switch between:
- **🎓 Student View**: Use the student selector dropdown to preview any of the 24 students (including high performers and at-risk students).
- **👩‍🏫 CR / Mam Admin View**: Access the grading desk, batch gradebook, at-risk monitor, and group schedules.
- **🔄 Reset Data**: Use the reset icon in the header to restore initial seed data at any time.
