# Setup Instructions

## 1. Install Dependencies

```bash
npm install
```

## 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in test mode (for MVP)
   - Set up collections:
     - `activities` - stores activity library
     - `completedActivities` - stores user's completed activities
     - `users` - stores user profiles and preferences
     - `communityReflections` - stores anonymous community reflections
5. Enable Storage:
   - Go to Storage
   - Create storage bucket
   - Set up rules for audio file uploads
6. Copy Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Add a web app if you haven't
   - Copy the config object
   - Paste it into `src/config/firebase.js`

## 3. Initialize Sample Data

After setting up Firebase, open the app in your browser and run in the console:

```javascript
import('./src/scripts/initData.js').then(module => {
  module.initSampleData().then(result => console.log(result));
});
```

Or create a temporary setup page that calls `initSampleData()`.

## 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 6. Deploy Options

### Option A: Deploy as PWA
- Deploy `dist` folder to any static hosting (Netlify, Vercel, Firebase Hosting)
- Users can install as PWA on mobile devices

### Option B: Package as Mobile App
- Use Capacitor or Cordova to wrap the web app
- Build native iOS/Android apps
- Submit to App Store / Play Store

## Firebase Security Rules (for production)

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /completedActivities/{activityId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /activities/{activityId} {
      allow read: if true;
      allow write: if false; // Only admins can write
    }
    
    match /communityReflections/{reflectionId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if false; // Anonymous, no updates/deletes
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /reflections/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Calendar Integration (Future)

For calendar integration, you'll need to:
1. Set up Google Calendar API credentials
2. Set up Apple Calendar integration (requires native app)
3. Implement OAuth flows for calendar access
4. Use calendar APIs to detect free time slots

For MVP, the calendar connection buttons are placeholders that can be implemented later.

## Push Notifications (Future)

For push notifications:
1. Set up Firebase Cloud Messaging (FCM)
2. Request notification permissions
3. Implement service worker for background notifications
4. Schedule notifications based on calendar free time
