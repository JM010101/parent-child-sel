import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { AuthService } from '../services/auth.js';
import { AudioService } from '../services/audio.js';

export class CommunityScreen {
  constructor() {
    this.authService = new AuthService();
    this.reflections = [];
  }

  setRouter(router) {
    this.router = router;
  }

  async render(container) {
    container.innerHTML = `
      <div class="header">
        <button class="back-btn" data-route="/home">←</button>
        <h2 class="header-title">Community</h2>
        <div></div>
      </div>

      <div class="container">
        <p style="margin-bottom: 24px; color: var(--light-text);">
          Anonymous reflections shared by other parents. No likes, no comments—just support.
        </p>

        <div class="card" style="background: var(--lighter-green); margin-bottom: 24px;">
          <h3 style="margin-bottom: 8px;">Share Your Reflection</h3>
          <p style="margin-bottom: 16px; font-size: 14px;">Help other parents by sharing what you've learned.</p>
          <button id="shareBtn" class="btn btn-primary">Share (Optional)</button>
        </div>

        <div id="reflectionsList">
          <div class="spinner"></div>
        </div>
      </div>

      <!-- Share Modal -->
      <div id="shareModal" class="hidden" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
        <div class="card" style="max-width: 400px; margin: 20px; max-height: 80vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3>Share Your Reflection</h3>
            <button id="closeModal" class="back-btn">✕</button>
          </div>
          
          <input type="text" id="activityTitle" class="input" placeholder="Activity title (e.g., Role Swap Conflict)">
          
          <textarea id="reflectionText" class="textarea" placeholder="Share your reflection..."></textarea>
          
          <div class="audio-recorder" id="communityAudioRecorder">
            <span style="font-size: 24px;">🎤</span>
            <div style="flex: 1;">
              <p style="margin: 0; font-weight: 600;">Record audio (optional)</p>
              <p id="communityRecordingStatus" style="margin: 4px 0 0 0; font-size: 14px; color: var(--light-text);">Tap to start</p>
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <button id="submitShare" class="btn btn-primary" style="flex: 1;">Share</button>
            <button id="cancelShare" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    `;

    await this.loadReflections();
    this.attachEventListeners();
  }

  async loadReflections() {
    try {
      const reflectionsRef = collection(db, 'communityReflections');
      const q = query(reflectionsRef, orderBy('createdAt', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      this.reflections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.renderReflections();
    } catch (error) {
      console.error('Error loading reflections:', error);
      document.getElementById('reflectionsList').innerHTML = '<p style="text-align: center; color: var(--light-text);">Error loading reflections.</p>';
    }
  }

  renderReflections() {
    const listEl = document.getElementById('reflectionsList');

    if (this.reflections.length === 0) {
      listEl.innerHTML = '<p style="text-align: center; color: var(--light-text);">No reflections shared yet. Be the first!</p>';
      return;
    }

    listEl.innerHTML = this.reflections.map(reflection => `
      <div class="activity-card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <h4 style="margin: 0;">${reflection.activityTitle || 'Activity Reflection'}</h4>
          ${reflection.audioUrl ? '<span style="font-size: 14px; color: var(--light-text);">🎤 1 min</span>' : ''}
        </div>
        <p style="margin-bottom: 0;">${reflection.text || ''}</p>
        ${reflection.audioUrl ? `
          <audio controls style="width: 100%; margin-top: 12px;">
            <source src="${reflection.audioUrl}" type="audio/webm">
          </audio>
        ` : ''}
        <p style="margin-top: 12px; font-size: 12px; color: var(--light-text);">Shared by another parent</p>
      </div>
    `).join('');
  }

  attachEventListeners() {
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.getElementById('closeModal');
    const cancelShare = document.getElementById('cancelShare');
    const submitShare = document.getElementById('submitShare');
    const audioRecorder = document.getElementById('communityAudioRecorder');

    shareBtn.addEventListener('click', () => {
      shareModal.classList.remove('hidden');
      shareModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
      shareModal.classList.add('hidden');
      shareModal.style.display = 'none';
    });

    cancelShare.addEventListener('click', () => {
      shareModal.classList.add('hidden');
      shareModal.style.display = 'none';
    });

    submitShare.addEventListener('click', async () => {
      await this.submitReflection();
      shareModal.classList.add('hidden');
      shareModal.style.display = 'none';
    });

    // Audio recording
    let recording = false;
    let audioService = null;
    let audioBlob = null;

    audioRecorder.addEventListener('click', async () => {
      if (!audioService) {
        audioService = new AudioService();
      }

      if (!recording) {
        const result = await audioService.startRecording();
        if (result.success) {
          recording = true;
          audioRecorder.classList.add('recording');
          document.getElementById('communityRecordingStatus').textContent = 'Recording... Tap to stop';
        }
      } else {
        const result = await audioService.stopRecording();
        if (result.success && result.audioBlob) {
          recording = false;
          audioRecorder.classList.remove('recording');
          document.getElementById('communityRecordingStatus').textContent = 'Recording saved';
          audioBlob = result.audioBlob;
        }
      }
    });

    // Store audioBlob for submission
    this.communityAudioBlob = null;
    audioRecorder.addEventListener('click', async () => {
      // This will be handled by the click handler above
    });
  }

  async submitReflection() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Please log in to share reflections');
      return;
    }

    const activityTitle = document.getElementById('activityTitle').value.trim();
    const reflectionText = document.getElementById('reflectionText').value.trim();

    if (!activityTitle && !reflectionText && !this.communityAudioBlob) {
      alert('Please add some content to share');
      return;
    }

    try {
      // Upload audio if recorded
      let audioUrl = null;
      if (this.communityAudioBlob) {
        const audioService = new AudioService();
        const result = await audioService.uploadAudio(user.uid, 'community', this.communityAudioBlob);
        if (result.success) {
          audioUrl = result.url;
        }
      }

      // Save to Firestore
      await addDoc(collection(db, 'communityReflections'), {
        activityTitle,
        text: reflectionText,
        audioUrl,
        createdAt: new Date(),
        anonymous: true
      });

      // Clear form
      document.getElementById('activityTitle').value = '';
      document.getElementById('reflectionText').value = '';
      this.communityAudioBlob = null;

      // Reload reflections
      await this.loadReflections();
    } catch (error) {
      console.error('Error submitting reflection:', error);
      alert('Error sharing reflection: ' + error.message);
    }
  }
}
