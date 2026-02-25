import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

export class ActivitiesService {
  async getAllActivities() {
    try {
      const activitiesRef = collection(db, 'activities');
      const snapshot = await getDocs(activitiesRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }

  async getActivityById(id) {
    try {
      const docRef = doc(db, 'activities', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching activity:', error);
      return null;
    }
  }

  async filterActivities(filters) {
    try {
      let activities = await this.getAllActivities();
      
      if (filters.skill && filters.skill !== 'all') {
        activities = activities.filter(a => 
          a.skills && a.skills.includes(filters.skill)
        );
      }

      if (filters.scenario && filters.scenario !== 'all') {
        activities = activities.filter(a => 
          a.scenarios && a.scenarios.includes(filters.scenario)
        );
      }

      if (filters.timeWindow && filters.timeWindow !== 'all') {
        activities = activities.filter(a => 
          a.timeWindows && a.timeWindows.includes(filters.timeWindow)
        );
      }

      return activities;
    } catch (error) {
      console.error('Error filtering activities:', error);
      return [];
    }
  }

  async saveCompletedActivity(userId, activityData) {
    try {
      const completedRef = collection(db, 'completedActivities');
      await addDoc(completedRef, {
        userId,
        ...activityData,
        completedAt: new Date(),
        createdAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error saving completed activity:', error);
      return { success: false, error: error.message };
    }
  }

  async getUserCompletedActivities(userId) {
    try {
      const completedRef = collection(db, 'completedActivities');
      const q = query(
        completedRef,
        where('userId', '==', userId),
        orderBy('completedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching completed activities:', error);
      return [];
    }
  }
}
