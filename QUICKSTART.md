# Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- Firebase account (free tier works)

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Firebase

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create Firestore database (start in test mode)
4. Enable Storage
5. Copy your Firebase config from Project Settings
6. Paste it into `src/config/firebase.js` (replace the placeholder values)

## Step 3: Initialize Sample Data

After Firebase is configured, you can initialize sample activities. Open your browser console after running the app and execute:

```javascript
// Import and run the init script
import('./src/scripts/initData.js').then(module => {
  module.initSampleData().then(result => {
    console.log(result);
  });
});
```

Or create a simple admin page that calls this function.

## Step 4: Run the App

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Step 5: Test the App

1. **Sign Up**: Create a new account with email/password
2. **Onboarding**: 
   - Skip calendar connection (or implement later)
   - Select focus areas (skills, time windows, activity types)
   - Click "Build My Plan"
3. **Home Screen**: See suggested activity and recent activities
4. **Browse Missions**: Filter by skill and scenario
5. **Start Activity**: Click on any mission to begin
6. **Complete Activity**: Follow the 3-step flow
7. **Reflect**: Add text and optional audio reflection
8. **View Library**: See your completed activities in calendar view
9. **Community**: Browse and share anonymous reflections

## Project Structure

```
paren_cel/
├── src/
│   ├── screens/          # All screen components
│   ├── services/         # Firebase services (auth, activities, etc.)
│   ├── config/           # Firebase configuration
│   ├── styles/           # CSS styles
│   ├── data/             # Sample data
│   ├── scripts/          # Utility scripts
│   ├── app.js            # Main app initialization
│   ├── router.js         # Client-side routing
│   └── main.js           # Entry point
├── public/               # Static assets
├── index.html           # HTML entry point
└── package.json         # Dependencies
```

## Key Features Implemented

✅ User authentication (email/password)  
✅ Onboarding flow with focus area selection  
✅ Home screen with suggested activities  
✅ Activity library with filtering  
✅ Guided 3-step activity flow  
✅ Reflection capture (text + audio)  
✅ Personal library with calendar view  
✅ Community reflection sharing  
✅ PWA support  

## Next Steps (Future Enhancements)

- Calendar integration (Google/Apple Calendar APIs)
- Push notifications (Firebase Cloud Messaging)
- Activity recommendations based on user preferences
- More sophisticated filtering and search
- Activity templates and customization
- Progress tracking and insights

## Troubleshooting

**Firebase errors**: Make sure you've updated `src/config/firebase.js` with your actual Firebase config.

**No activities showing**: Run the `initSampleData()` function to populate sample activities.

**Audio recording not working**: Ensure you're using HTTPS (or localhost) and have granted microphone permissions.

**Routing issues**: Check browser console for errors. Make sure all screen components are properly imported.

## Deployment

Build for production:
```bash
npm run build
```

Deploy the `dist` folder to:
- Firebase Hosting
- Netlify
- Vercel
- Any static hosting service

For mobile app packaging, use Capacitor or Cordova to wrap the web app.
