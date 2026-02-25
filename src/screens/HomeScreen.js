import { ActivitiesService } from '../services/activities.js';
import { AuthService } from '../services/auth.js';

export class HomeScreen {
  constructor() {
    this.activitiesService = new ActivitiesService();
    this.authService = new AuthService();
  }

  setRouter(router) {
    this.router = router;
  }

  async render(container) {
    container.innerHTML = `
      <div class="header">
        <h2 class="header-title">Welcome back</h2>
        <div style="display: flex; gap: 16px;">
          <button class="back-btn" data-route="/missions" style="font-size: 20px;">📚</button>
          <button class="back-btn" data-route="/library" style="font-size: 20px;">👤</button>
        </div>
      </div>

      <div class="container">
        <!-- Suggested Activity -->
        <div class="card" style="background: linear-gradient(135deg, var(--primary-green), var(--light-green)); color: white;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 24px;">⏰</span>
            <div>
              <p style="color: rgba(255,255,255,0.9); margin: 0;">You have 20 minutes free</p>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">Today at 6:30pm</p>
            </div>
          </div>
          <button id="startMissionBtn" class="btn" style="background: white; color: var(--primary-green); width: 100%;">
            ✨ Start a 10-Min Mission
          </button>
        </div>

        <div style="text-align: center; margin: 16px 0;">
          <a href="#" data-route="/missions" style="color: var(--primary-green); text-decoration: underline;">Browse All Missions</a>
        </div>

        <!-- Recent Activity -->
        <div class="section">
          <h3 class="section-title">Recent Activity</h3>
          <div id="recentActivities">
            <div class="spinner"></div>
          </div>
        </div>
      </div>
    `;

    await this.loadData();
    this.attachEventListeners();
  }

  async loadData() {
    // Check authentication using localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      this.router.navigate('/login');
      return;
    }

    // Load recent activities from localStorage (for MVP)
    const completedActivities = JSON.parse(localStorage.getItem('completedActivities') || '[]');
    const completed = completedActivities;
    const recentContainer = document.getElementById('recentActivities');
    
    if (completed.length === 0) {
      recentContainer.innerHTML = '<p style="text-align: center; color: var(--light-text);">No activities completed yet. Start your first mission!</p>';
      return;
    }

    recentContainer.innerHTML = completed.slice(0, 5).map(activity => `
      <div class="activity-card">
        <div style="display: flex; gap: 12px;">
          <div style="width: 60px; height: 60px; background: var(--grey); border-radius: 8px; flex-shrink: 0;"></div>
          <div style="flex: 1;">
            <h4 style="margin-bottom: 4px;">${activity.activityTitle || 'Activity'}</h4>
            <p style="font-size: 14px; color: var(--light-text); margin-bottom: 8px;">
              ${activity.parentReflections || activity.reflection || 'Completed activity'}
            </p>
            <div class="filter-group" style="margin: 0;">
              ${(activity.skills || []).map(skill => `
                <span class="tag tag-unselected" style="font-size: 12px;">${skill}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  attachEventListeners() {
    const startBtn = document.getElementById('startMissionBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        // Navigate to a random activity or suggested one
        this.router.navigate('/missions');
      });
    }
  }
}
