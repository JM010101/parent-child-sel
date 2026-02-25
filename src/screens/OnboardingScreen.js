import { UserService } from '../services/user.js';
import { AuthService } from '../services/auth.js';

export class OnboardingScreen {
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
    this.selectedSkills = [];
    this.selectedTimeWindows = [];
    this.selectedActivityTypes = [];
    this.calendarConnected = false;
  }

  setRouter(router) {
    this.router = router;
  }

  render(container) {
    container.innerHTML = `
      <div class="container">
        <h1 style="margin-bottom: 24px;">Let's Get Started</h1>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 32px;">
          <!-- Calendar Connection -->
          <div class="card">
            <h2 style="margin-bottom: 8px;">Connect Your Calendar</h2>
            <p style="margin-bottom: 20px;">We'll gently suggest moments when you already have time together.</p>
            
            <button id="connectGoogle" class="btn btn-outline" style="width: 100%; margin-bottom: 12px;">
              <span>📅</span> Connect Google Calendar
            </button>
            <button id="connectApple" class="btn btn-outline" style="width: 100%; margin-bottom: 12px;">
              <span>🍎</span> Connect Apple Calendar
            </button>
            <button id="skipCalendar" class="btn-text" style="width: 100%;">Skip for Now</button>
          </div>

          <!-- Focus Areas -->
          <div class="card">
            <h2 style="margin-bottom: 8px;">Choose Focus Areas</h2>
            <p style="margin-bottom: 20px;">Select what matters most right now</p>

            <!-- Skills to explore -->
            <div class="section">
              <h3 class="section-title">Skills to explore</h3>
              <div class="filter-group" id="skillsGroup">
                ${this.renderSkillTags()}
              </div>
            </div>

            <!-- Preferred time windows -->
            <div class="section">
              <h3 class="section-title">Preferred time windows</h3>
              <div class="filter-group" id="timeWindowsGroup">
                ${this.renderTimeWindowTags()}
              </div>
            </div>

            <!-- Preferred activity types -->
            <div class="section">
              <h3 class="section-title">Preferred activity types</h3>
              <div class="filter-group" id="activityTypesGroup">
                ${this.renderActivityTypeTags()}
              </div>
            </div>

            <button id="buildPlanBtn" class="btn btn-primary" style="margin-top: 24px;">Build My Plan</button>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  renderSkillTags() {
    const skills = [
      'Self-Awareness',
      'Self-Management',
      'Social Awareness',
      'Relationship Skills',
      'Responsible Decision-Making'
    ];
    return skills.map(skill => `
      <span class="tag tag-unselected" data-skill="${skill}">
        ${skill} <span style="opacity: 0.6;">ℹ️</span>
      </span>
    `).join('');
  }

  renderTimeWindowTags() {
    const windows = ['After School', 'Evenings', 'Weekends'];
    return windows.map(window => `
      <span class="tag tag-unselected" data-time="${window}">${window}</span>
    `).join('');
  }

  renderActivityTypeTags() {
    const types = [
      'Conversation',
      'Storytelling',
      'Role-Play',
      'Physical Play',
      'Games',
      'Arts & Crafts',
      'Chores',
      'Cooking',
      'Outdoor',
      'Mindfulness'
    ];
    return types.map(type => `
      <span class="tag tag-unselected" data-type="${type}">${type}</span>
    `).join('');
  }

  attachEventListeners() {
    // Skills
    document.querySelectorAll('[data-skill]').forEach(tag => {
      tag.addEventListener('click', () => {
        const skill = tag.getAttribute('data-skill');
        if (this.selectedSkills.includes(skill)) {
          this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
          tag.classList.remove('tag-selected');
          tag.classList.add('tag-unselected');
        } else {
          this.selectedSkills.push(skill);
          tag.classList.remove('tag-unselected');
          tag.classList.add('tag-selected');
        }
      });
    });

    // Time windows
    document.querySelectorAll('[data-time]').forEach(tag => {
      tag.addEventListener('click', () => {
        const time = tag.getAttribute('data-time');
        if (this.selectedTimeWindows.includes(time)) {
          this.selectedTimeWindows = this.selectedTimeWindows.filter(t => t !== time);
          tag.classList.remove('tag-selected');
          tag.classList.add('tag-unselected');
        } else {
          this.selectedTimeWindows.push(time);
          tag.classList.remove('tag-unselected');
          tag.classList.add('tag-selected');
        }
      });
    });

    // Activity types
    document.querySelectorAll('[data-type]').forEach(tag => {
      tag.addEventListener('click', () => {
        const type = tag.getAttribute('data-type');
        if (this.selectedActivityTypes.includes(type)) {
          this.selectedActivityTypes = this.selectedActivityTypes.filter(t => t !== type);
          tag.classList.remove('tag-selected');
          tag.classList.add('tag-unselected');
        } else {
          this.selectedActivityTypes.push(type);
          tag.classList.remove('tag-unselected');
          tag.classList.add('tag-selected');
        }
      });
    });

    // Calendar buttons
    document.getElementById('connectGoogle').addEventListener('click', () => {
      this.connectCalendar('google');
    });

    document.getElementById('connectApple').addEventListener('click', () => {
      this.connectCalendar('apple');
    });

    document.getElementById('skipCalendar').addEventListener('click', () => {
      this.calendarConnected = false;
    });

    // Build plan button
    document.getElementById('buildPlanBtn').addEventListener('click', () => {
      this.saveFocusAreas();
    });
  }

  async connectCalendar(type) {
    // In a real app, this would integrate with Google/Apple Calendar APIs
    alert(`${type === 'google' ? 'Google' : 'Apple'} Calendar integration coming soon!`);
    this.calendarConnected = true;
  }

  async saveFocusAreas() {
    // Check if user is authenticated (using localStorage)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      this.router.navigate('/login');
      return;
    }

    const focusAreas = {
      skills: this.selectedSkills,
      timeWindows: this.selectedTimeWindows,
      activityTypes: this.selectedActivityTypes,
      calendarConnected: this.calendarConnected
    };

    // Save to localStorage instead of Firebase for MVP
    localStorage.setItem('focusAreas', JSON.stringify(focusAreas));
    localStorage.setItem('hasOnboarding', 'true');
    
    this.router.navigate('/home');
  }
}
