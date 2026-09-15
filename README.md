# SST English Hub — Activity & Grading Portal

Official centralized portal for **Scaler School of Technology (SST)** — **English C • Term 1 • Batch 2030**.

Built to manage the 4 mandatory graded English activities, integrating individual 1:1 faculty feedback scheduling, 11 project group allocations, daily 30-day streak tracking, slide/script submissions, interactive rubric grading, at-risk student intervention, and consolidated Excel gradebook exports.

---

## 🏛️ Official Batch Info
- **Institution**: Scaler School of Technology (SST)
- **Batch / Class**: English C — Term 1 (Batch of 2030)
- **Course**: English Communication & Oral Discourse
- **Class Representative (CR)**: Yahoshuva Kesaboyina (`yahoshuva.26bcs10296@sst.scaler.com`)
- **Total Students**: 44 Enrolled Students across 11 Teams (Groups 1 to 11)

---

## 🌟 Features

### 🎓 Student Experience
1. **Student Dashboard**: Real-time overall score (/100), letter grade forecasting, mandatory completion progress, 30×30 daily streak counter, and attendance health. Defaults to CR Yahoshuva Kesaboyina (`26BCS10296`).
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
   - Assigned group conditional grammar topics for all 11 SST groups.
   - Presentation schedules and Google Meet room details.
   - Slide deck (Google Slides) and speaking script submission.
   - 4-criteria rubric evaluation display.
5. **Storytelling Presentation (Activity #4 - 25 Marks)**:
   - Collaborative narrative storytelling themes.
   - Slide props and dialogue script submission.
   - Vocal modulation and team synergy rubric review.

### 👩‍🏫 CR & Faculty Admin Center
1. **Grading Desk**: Unified review queue across all 4 activities with an interactive **Rubric Grading Modal** (criteria sliders, instant total score calculation, preset feedback chips, and faculty remarks).
2. **Master Gradebook**: Full class matrix of all 44 SST students with search, group filter (Groups 1–11), and **1-click Excel / CSV export** (`.csv` formatted with UTF-8 BOM).
3. **At-Risk Intervention Monitor**: Auto-flags students who fall below 75% attendance or have not booked their 1:1 slot, with a **1-click "Copy WhatsApp Reminder"** button.
4. **Group & Schedule Manager**: Comprehensive roster of all 11 SST student groups with assigned topics, dates, and venue links.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **Persistence**: Reactive `localStorage` service pre-seeded with all 44 official SST students
- **Exporting**: Native browser Blob/CSV generator with Excel UTF-8 BOM
- **CI/CD**: GitHub Actions workflow deploying to GitHub Pages on every push to `main`

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
