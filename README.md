# ParenCEL - MVP

A research-backed educational app designed to support parents of children ages 5–11 in embedding short (10–15 minute) social–emotional learning (SEL) activities into daily routines.

## Features

- Browse and select short guided activities ("missions")
- Step-by-step facilitation prompts during activities
- Brief reflection questions afterward
- Save text and optional voice reflections
- Filter activities by time of day, child age, and SEL skill
- Calendar integration for activity time detection
- Personal activity library with history

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Copy your Firebase config to `src/config/firebase.js`

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Tech Stack

- HTML/CSS/JavaScript (Vanilla JS)
- Vite for build tooling
- Firebase (Auth, Firestore, Storage)
- PWA-ready for mobile deployment
