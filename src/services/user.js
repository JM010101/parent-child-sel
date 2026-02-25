import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

export class UserService {
  async getUserProfile(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  async createUserProfile(userId, profileData) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating user profile:', error);
      return { success: false, error: error.message };
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error: error.message };
    }
  }

  async saveFocusAreas(userId, focusAreas) {
    return this.updateUserProfile(userId, { focusAreas });
  }

  async saveCalendarConnection(userId, calendarData) {
    return this.updateUserProfile(userId, { calendar: calendarData });
  }
}
