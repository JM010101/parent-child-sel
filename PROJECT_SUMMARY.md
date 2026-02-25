# ParenCEL MVP - Project Summary

## Overview
A research-backed educational web app (HTML/CSS/JS) designed to support parents of children ages 5–11 in embedding short (10–15 minute) social–emotional learning (SEL) activities into daily routines.

## Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Vite
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: PWA-ready, can be packaged as mobile app with Capacitor/Cordova

## Core Features Implemented

### 1. User Authentication ✅
- Email/password sign up and sign in
- Firebase Authentication integration
- Protected routes

### 2. Onboarding Flow ✅
- Calendar connection UI (Google/Apple - placeholder for now)
- Focus area selection:
  - Skills to explore (SEL skills)
  - Preferred time windows
  - Preferred activity types
- User profile creation

### 3. Home Screen ✅
- Suggested activity based on available time
- Recent activity list
- Quick navigation to missions and library

### 4. Activity Library (Missions) ✅
- Browse all available activities
- Filter by SEL skill (Self-Awareness, Self-Management, etc.)
- Filter by scenario (Bedtime, After School, etc.)
- Activity cards with duration, prep level, and descriptions

### 5. Guided Activity Flow ✅
- **Step 1**: Activity instructions and materials
- **Step 2**: Parent tips and reflection prompts ("While You Talk")
- **Step 3**: Reflection capture ("Reflect Together")
  - Child reflection questions
  - Parent reflection questions
  - Optional audio recording

### 6. Reflection Capture ✅
- Text input for reflections
- Audio recording using MediaRecorder API
- Audio upload to Firebase Storage
- Save completed activities with reflections

### 7. Personal Library ✅
- Calendar view showing completed activities
- Activity details for selected dates
- View reflections, audio, and skill tags
- Historical activity tracking

### 8. Community Screen ✅
- Browse anonymous reflections from other parents
- Share your own reflections (optional)
- Audio reflection support
- No likes/comments - just support

### 9. PWA Support ✅
- Service worker for offline capability
- Manifest.json for installability
- Mobile-responsive design

## File Structure

```
paren_cel/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js          # Authentication
│   │   ├── OnboardingScreen.js     # Initial setup
│   │   ├── HomeScreen.js           # Dashboard
│   │   ├── MissionsScreen.js       # Activity library
│   │   ├── ActivityScreen.js       # 3-step activity flow
│   │   ├── LibraryScreen.js        # Personal history
│   │   └── CommunityScreen.js      # Community reflections
│   ├── services/
│   │   ├── auth.js                 # Firebase Auth wrapper
│   │   ├── activities.js           # Activity CRUD operations
│   │   ├── user.js                 # User profile management
│   │   └── audio.js                # Audio recording/upload
│   ├── config/
│   │   └── firebase.js             # Firebase configuration
│   ├── data/
│   │   └── sampleActivities.js     # Sample activity data
│   ├── scripts/
│   │   └── initData.js             # Database initialization
│   ├── styles/
│   │   └── main.css                # Global styles
│   ├── app.js                      # App initialization
│   ├── router.js                   # Client-side routing
│   └── main.js                     # Entry point
├── public/
│   └── sw.js                       # Service worker
├── index.html                      # HTML entry
├── manifest.json                   # PWA manifest
├── package.json                    # Dependencies
├── vite.config.js                 # Build config
├── SETUP.md                       # Detailed setup guide
├── QUICKSTART.md                  # Quick start guide
└── README.md                      # Project overview
```

## Sample Activities Included

1. **Watch & Wonder Together** - Analyze emotions in videos
2. **Role Swap Conflict** - Perspective-taking through role play
3. **Gratitude Scavenger Hunt** - Outdoor gratitude practice
4. **Draw a Place That Feels Safe** - Art-based emotional exploration
5. **Emotion Charades** - Non-verbal emotion recognition
6. **Mindful Breathing Together** - Self-regulation practice

## Firebase Collections

- `activities` - Activity library (read-only for users)
- `completedActivities` - User's completed activities with reflections
- `users` - User profiles and preferences
- `communityReflections` - Anonymous shared reflections

## Next Steps for Production

### Immediate (MVP Complete)
- ✅ Core functionality implemented
- ✅ All screens built
- ✅ Firebase integration complete

### Short-term Enhancements
1. **Calendar Integration**
   - Google Calendar API setup
   - Apple Calendar integration (requires native app)
   - Free time detection
   - Activity scheduling

2. **Push Notifications**
   - Firebase Cloud Messaging setup
   - Notification scheduling based on calendar
   - Activity reminders

3. **Enhanced Filtering**
   - Age-based filtering
   - Duration filtering
   - Prep level filtering
   - Search functionality

### Long-term Features
- AI-powered activity recommendations
- Progress tracking and insights
- Custom activity creation
- Multi-child support
- Activity templates
- Social features (optional, beyond MVP scope)

## Deployment Options

### Option 1: Web App (PWA)
- Deploy to Firebase Hosting, Netlify, or Vercel
- Users install as PWA on mobile devices
- Works offline with service worker

### Option 2: Mobile App
- Use Capacitor to wrap web app
- Build native iOS/Android apps
- Submit to App Store / Play Store
- Enables native calendar integration

## Testing Checklist

- [ ] User can sign up and log in
- [ ] Onboarding flow saves preferences
- [ ] Activities display correctly
- [ ] Filtering works (skill, scenario)
- [ ] Activity flow (3 steps) works
- [ ] Audio recording works (requires HTTPS/localhost)
- [ ] Reflections save correctly
- [ ] Library calendar displays activities
- [ ] Community screen shows shared reflections
- [ ] PWA installs correctly
- [ ] Offline mode works (service worker)

## Known Limitations

1. **Calendar Integration**: Currently placeholder buttons. Requires OAuth setup for Google/Apple Calendar APIs.

2. **Push Notifications**: Service worker includes push handler, but FCM setup needed for full functionality.

3. **Audio Recording**: Requires HTTPS (or localhost) and microphone permissions.

4. **Sample Data**: Must be initialized manually via `initSampleData()` function.

## Support & Documentation

- **Setup Guide**: See `SETUP.md` for detailed Firebase configuration
- **Quick Start**: See `QUICKSTART.md` for getting started quickly
- **Code Comments**: All major functions are commented
- **Firebase Rules**: See `SETUP.md` for security rules

## License
MIT (or as specified by project owner)
