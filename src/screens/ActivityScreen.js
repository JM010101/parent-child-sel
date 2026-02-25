import { ActivitiesService } from '../services/activities.js';
import { AuthService } from '../services/auth.js';

export class ActivityScreen {
  constructor() {
    this.activitiesService = new ActivitiesService();
    this.authService = new AuthService();
    this.currentStep = 1;
    this.activityId = null;
    this.activity = null;
  }

  setRouter(router) {
    this.router = router;
  }

  async render(container) {
    // Extract activity ID from URL
    const path = window.location.pathname;
    const match = path.match(/\/activity\/(.+)/);
    this.activityId = match ? match[1] : null;

    if (!this.activityId) {
      container.innerHTML = '<p>Activity not found</p>';
      return;
    }

    this.activity = await this.activitiesService.getActivityById(this.activityId);
    if (!this.activity) {
      container.innerHTML = '<p>Activity not found</p>';
      return;
    }

    this.renderStep(container);
  }

  renderStep(container) {
    if (this.currentStep === 1) {
      this.renderStep1(container);
    } else if (this.currentStep === 2) {
      this.renderStep2(container);
    } else if (this.currentStep === 3) {
      this.renderStep3(container);
    }
  }

  renderStep1(container) {
    container.innerHTML = `
      <div class="header">
        <button class="back-btn" data-route="/missions">←</button>
        <h2 class="header-title">Step 1 of 3</h2>
        <div></div>
      </div>

      <div class="container">
        <h2 style="margin-bottom: 8px;">${this.activity.title || 'Mission'}</h2>
        <div class="activity-meta" style="margin-bottom: 16px;">
          <span>⏱️ ${this.activity.duration || '10'} min.</span>
          <span class="tag tag-unselected">${this.activity.prepLevel || 'Low'} prep</span>
        </div>

        <div class="card">
          <h3 style="margin-bottom: 12px;">📋 Activity</h3>
          <p style="white-space: pre-wrap;">${this.activity.instructions || this.activity.description || 'No instructions available.'}</p>
        </div>

        ${this.activity.materials ? `
          <div class="card">
            <h3 style="margin-bottom: 12px;">📦 Materials Needed</h3>
            <p>${this.activity.materials}</p>
          </div>
        ` : ''}

        <button id="continueBtn" class="btn btn-primary" style="margin-top: 24px;">Continue</button>
      </div>
    `;

    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.currentStep = 2;
        this.renderStep(container);
      });
    }
  }

  renderStep2(container) {
    container.innerHTML = `
      <div class="header">
        <button class="back-btn" id="backBtn">←</button>
        <h2 class="header-title">Step 2 of 3</h2>
        <div></div>
      </div>

      <div class="container">
        <h2 style="margin-bottom: 24px;">While You Talk</h2>

        <div class="reflection-section">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 20px;">💡</span>
            <h3>Parent Tips</h3>
          </div>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;">• Let your child answer first</li>
            <li style="margin-bottom: 8px;">• Stay curious</li>
            <li style="margin-bottom: 8px;">• Avoid correcting</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">Reflection Prompts</h3>
          ${(this.activity.reflectionPrompts || [
            'How could you tell what feeling that was?',
            'Do different people show the same feeling in different ways?',
            'Have you felt this way before?'
          ]).map(prompt => `
            <div class="card" style="margin-bottom: 12px;">
              <p style="margin: 0;">${prompt}</p>
            </div>
          `).join('')}
        </div>

        <button id="continueBtn" class="btn btn-primary" style="margin-top: 24px;">Continue</button>
      </div>
    `;

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.currentStep = 1;
        this.renderStep(container);
      });
    }

    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.currentStep = 3;
        this.renderStep(container);
      });
    }
  }

  renderStep3(container) {
    container.innerHTML = `
      <div class="header">
        <button class="back-btn" id="backBtn">←</button>
        <h2 class="header-title">Step 3 of 3</h2>
        <div></div>
      </div>

      <div class="container">
        <h2 style="margin-bottom: 24px;">Reflect Together</h2>

        <div class="section">
          <h3 class="section-title">For Your Child</h3>
          ${(this.activity.childReflectionQuestions || [
            'What did you learn about reading emotions?',
            'Which feelings were easiest to guess?'
          ]).map((question, index) => `
            <div style="margin-bottom: 16px;">
              <p class="reflection-question">${question}</p>
              <textarea class="textarea" id="childReflection${index}" placeholder="Child's thoughts..."></textarea>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h3 class="section-title">For You</h3>
          ${(this.activity.parentReflectionQuestions || [
            'Did they pick up on subtle cues?',
            'What emotions came up naturally?',
            'How can this help in real situations?'
          ]).map((question, index) => `
            <div style="margin-bottom: 16px;">
              <p class="reflection-question">${question}</p>
              <textarea class="textarea" id="parentReflection${index}" placeholder="Your reflection..."></textarea>
            </div>
          `).join('')}
        </div>

        <div class="audio-recorder" id="audioRecorder">
          <span style="font-size: 24px;">🎤</span>
          <div style="flex: 1;">
            <p style="margin: 0; font-weight: 600;">Record a short voice reflection (optional)</p>
            <p id="recordingStatus" style="margin: 4px 0 0 0; font-size: 14px; color: var(--light-text);">Tap to start recording</p>
          </div>
        </div>

        <div style="display: flex; gap: 12px;">
          <button id="saveBtn" class="btn btn-primary" style="flex: 1;">Save</button>
          <button id="skipBtn" class="btn btn-secondary">Skip</button>
        </div>
      </div>
    `;

    this.attachStep3Listeners(container);
  }

  attachStep3Listeners(container) {
    document.getElementById('backBtn').addEventListener('click', () => {
      this.currentStep = 2;
      this.renderStep(container);
    });

    document.getElementById('skipBtn').addEventListener('click', () => {
      this.saveReflection(container, true);
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
      this.saveReflection(container, false);
    });

    // Audio recording
    const audioRecorder = document.getElementById('audioRecorder');
    let recording = false;
    let audioService = null;

    audioRecorder.addEventListener('click', async () => {
      if (!audioService) {
        const { AudioService } = await import('../services/audio.js');
        audioService = new AudioService();
      }

      if (!recording) {
        const result = await audioService.startRecording();
        if (result.success) {
          recording = true;
          audioRecorder.classList.add('recording');
          document.getElementById('recordingStatus').textContent = 'Recording... Tap to stop';
        }
      } else {
        const result = await audioService.stopRecording();
        if (result.success && result.audioBlob) {
          recording = false;
          audioRecorder.classList.remove('recording');
          document.getElementById('recordingStatus').textContent = 'Recording saved';
          this.audioBlob = result.audioBlob;
        }
      }
    });
  }

  async saveReflection(container, skip) {
    // Check authentication using localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      const router = this.router || window.appRouter;
      if (router) {
        router.navigate('/login');
      } else {
        window.location.href = '/login';
      }
      return;
    }
    
    const userId = 'test_user'; // Mock user ID for MVP

    // Collect reflections
    const childReflections = [];
    const parentReflections = [];
    
    document.querySelectorAll('[id^="childReflection"]').forEach(el => {
      if (el.value.trim()) childReflections.push(el.value.trim());
    });

    document.querySelectorAll('[id^="parentReflection"]').forEach(el => {
      if (el.value.trim()) parentReflections.push(el.value.trim());
    });

    // Upload audio if recorded (skip for MVP - just store blob reference)
    let audioUrl = null;
    if (this.audioBlob && !skip) {
      // For MVP, we'll just note that audio was recorded
      // In production, this would upload to Firebase Storage
      audioUrl = 'recorded'; // Placeholder
    }

    const activityData = {
      activityId: this.activityId,
      activityTitle: this.activity.title,
      skills: this.activity.skills || [],
      childReflections,
      parentReflections: parentReflections.join('\n\n'),
      audioUrl,
      completedAt: new Date().toISOString()
    };

    // Save to localStorage instead of Firebase for MVP
    const completedActivities = JSON.parse(localStorage.getItem('completedActivities') || '[]');
    completedActivities.push(activityData);
    localStorage.setItem('completedActivities', JSON.stringify(completedActivities));

    const router = this.router || window.appRouter;
    if (router) {
      router.navigate('/library');
    } else {
      window.location.href = '/library';
    }
  }
}
