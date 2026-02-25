import { ActivitiesService } from '../services/activities.js';
import { AuthService } from '../services/auth.js';

export class LibraryScreen {
  constructor() {
    this.activitiesService = new ActivitiesService();
    this.authService = new AuthService();
    this.currentDate = new Date();
    this.selectedDate = new Date();
  }

  setRouter(router) {
    this.router = router;
  }

  async render(container) {
    container.innerHTML = `
      <div class="header">
        <button class="back-btn" data-route="/home">←</button>
        <h2 class="header-title">Your Library</h2>
        <div></div>
      </div>

      <div class="container">
        <p style="margin-bottom: 24px; color: var(--light-text);" id="missionCount">Loading...</p>

        <div class="calendar">
          <div class="calendar-header">
            <button class="back-btn" id="prevMonth">←</button>
            <h3 id="monthYear">${this.getMonthYear()}</h3>
            <button class="back-btn" id="nextMonth">→</button>
          </div>
          <div class="calendar-grid" id="calendarGrid">
            ${this.renderCalendar()}
          </div>
        </div>

        <div id="activityDetail">
          <p style="text-align: center; color: var(--light-text);">Select a date to view activities</p>
        </div>
      </div>
    `;

    await this.loadData();
    this.attachEventListeners();
  }

  getMonthYear() {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    let html = '<div class="calendar-day" style="font-weight: 600;">S</div>';
    html += '<div class="calendar-day" style="font-weight: 600;">M</div>';
    html += '<div class="calendar-day" style="font-weight: 600;">T</div>';
    html += '<div class="calendar-day" style="font-weight: 600;">W</div>';
    html += '<div class="calendar-day" style="font-weight: 600;">T</div>';
    html += '<div class="calendar-day" style="font-weight: 600;">F</div>';
    html += '<div class="calendar-day" style="font-weight: 600;">S</div>';

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      html += '<div class="calendar-day"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toDateString();
      const hasActivity = this.activitiesByDate && this.activitiesByDate[dateStr];
      const isSelected = dateStr === this.selectedDate.toDateString();
      
      html += `<div class="calendar-day ${hasActivity ? 'has-activity' : ''} ${isSelected ? 'selected' : ''}" 
                     data-date="${dateStr}">${day}</div>`;
    }

    return html;
  }

  async loadData() {
    // Check authentication using localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      this.router.navigate('/login');
      return;
    }

    // Load from localStorage instead of Firebase for MVP
    const completedActivities = JSON.parse(localStorage.getItem('completedActivities') || '[]');
    const completed = completedActivities.map(activity => ({
      ...activity,
      completedAt: activity.completedAt ? { toDate: () => new Date(activity.completedAt) } : null
    }));
    
    // Group activities by date
    this.activitiesByDate = {};
    completed.forEach(activity => {
      const date = activity.completedAt?.toDate ? activity.completedAt.toDate() : new Date(activity.completedAt);
      const dateStr = date.toDateString();
      if (!this.activitiesByDate[dateStr]) {
        this.activitiesByDate[dateStr] = [];
      }
      this.activitiesByDate[dateStr].push(activity);
    });

    document.getElementById('missionCount').textContent = `${completed.length} missions completed`;

    // Re-render calendar with activity indicators
    document.getElementById('calendarGrid').innerHTML = this.renderCalendar();
    this.attachCalendarListeners();

    // Show selected date's activities
    this.showActivitiesForDate(this.selectedDate);
  }

  attachEventListeners() {
    document.getElementById('prevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      document.getElementById('monthYear').textContent = this.getMonthYear();
      document.getElementById('calendarGrid').innerHTML = this.renderCalendar();
      this.attachCalendarListeners();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      document.getElementById('monthYear').textContent = this.getMonthYear();
      document.getElementById('calendarGrid').innerHTML = this.renderCalendar();
      this.attachCalendarListeners();
    });
  }

  attachCalendarListeners() {
    document.querySelectorAll('.calendar-day[data-date]').forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.getAttribute('data-date');
        this.selectedDate = new Date(dateStr);
        document.getElementById('calendarGrid').innerHTML = this.renderCalendar();
        this.attachCalendarListeners();
        this.showActivitiesForDate(this.selectedDate);
      });
    });
  }

  showActivitiesForDate(date) {
    const dateStr = date.toDateString();
    const activities = this.activitiesByDate[dateStr] || [];
    const detailEl = document.getElementById('activityDetail');

    if (activities.length === 0) {
      detailEl.innerHTML = `<p style="text-align: center; color: var(--light-text);">No activities on ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>`;
      return;
    }

    // Show first activity (or could show all)
    const activity = activities[0];
    const activityDate = activity.completedAt?.toDate ? activity.completedAt.toDate() : 
                         (activity.completedAt ? new Date(activity.completedAt) : new Date());
    
    detailEl.innerHTML = `
      <div class="card">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span>📅</span>
          <h3>${activityDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
        </div>
        
        <div style="margin-bottom: 16px;">
          <h4 style="margin-bottom: 4px;">${activity.activityTitle || 'Activity'}</h4>
          <p style="color: var(--light-text); font-size: 14px;">${activityDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
        </div>

        <div style="margin-bottom: 16px;">
          <p class="reflection-question">Activity</p>
          <p style="margin-top: 8px;">${activity.activityTitle || 'Completed activity'}</p>
        </div>

        ${activity.audioUrl ? `
          <div style="margin-bottom: 16px;">
            <p class="reflection-question">Audio Reflection</p>
            <audio controls style="width: 100%; margin-top: 8px;">
              <source src="${activity.audioUrl}" type="audio/webm">
            </audio>
          </div>
        ` : ''}

        ${activity.parentReflections ? `
          <div style="margin-bottom: 16px;">
            <p class="reflection-question">Your Reflection</p>
            <p style="margin-top: 8px; white-space: pre-wrap;">${activity.parentReflections}</p>
          </div>
        ` : ''}

        <div class="filter-group">
          ${(activity.skills || []).map(skill => `
            <span class="tag tag-unselected">${skill}</span>
          `).join('')}
        </div>
      </div>
    `;
  }
}
