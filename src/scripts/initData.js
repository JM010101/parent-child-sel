// Script to initialize Firestore with sample data
// Run this once to populate your database
// Usage: Import and call initSampleData() from browser console or a setup page

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { sampleActivities } from '../data/sampleActivities.js';

export async function initSampleData() {
  try {
    // Check if activities already exist
    const activitiesRef = collection(db, 'activities');
    const snapshot = await getDocs(activitiesRef);
    
    if (snapshot.size > 0) {
      console.log('Activities already exist. Skipping initialization.');
      return { success: true, message: 'Data already initialized' };
    }

    // Add sample activities
    const promises = sampleActivities.map(activity => {
      return addDoc(activitiesRef, {
        ...activity,
        createdAt: new Date()
      });
    });

    await Promise.all(promises);
    console.log(`Successfully initialized ${sampleActivities.length} activities`);
    return { success: true, message: `Initialized ${sampleActivities.length} activities` };
  } catch (error) {
    console.error('Error initializing data:', error);
    return { success: false, error: error.message };
  }
}

// Make it available globally for easy access
if (typeof window !== 'undefined') {
  window.initSampleData = initSampleData;
}
