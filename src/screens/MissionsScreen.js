import { ActivitiesService } from '../services/activities.js';

export class MissionsScreen {
  constructor() {
    this.activitiesService = new ActivitiesService();
    this.filters = {
      skill: 'all',
      scenario: 'all'
    };
    this.activities = [];
  }

  setRouter(router) {
    this.router = router;
  }

  async render(container) {
    container.innerHTML = `
      <div class="header">
        <button class="back-btn" data-route="/home">←</button>
        <h2 class="header-title">All Missions</h2>
        <button class="back-btn" id="filterBtn" style="font-size: 20px;">🔽</button>
      </div>

      <div class="container">
        <!-- Filter by Skill -->
        <div class="section">
          <h3 class="section-title">Filter by Skill</h3>
          <div class="filter-group" id="skillFilters">
            ${this.renderSkillFilters()}
          </div>
        </div>

        <!-- Filter by Scenario -->
        <div class="section">
          <h3 class="section-title">Filter by Scenario</h3>
          <div class="filter-group" id="scenarioFilters">
            ${this.renderScenarioFilters()}
          </div>
        </div>

        <!-- Mission Count -->
        <p id="missionCount" style="margin-bottom: 16px; color: var(--light-text);">Loading missions...</p>

        <!-- Mission List -->
        <div id="missionsList">
          <div class="spinner"></div>
        </div>
      </div>
    `;

    await this.loadActivities();
    this.attachEventListeners();
  }

  renderSkillFilters() {
    const skills = ['All', 'Self-Awareness', 'Self-Management', 'Social Awareness', 'Relationship Skills', 'Responsible Decision-Making'];
    return skills.map(skill => {
      const skillValue = skill === 'All' ? 'all' : skill;
      const isSelected = this.filters.skill === skillValue || (skill === 'All' && this.filters.skill === 'all');
      return `
        <span class="tag ${isSelected ? 'tag-selected' : 'tag-unselected'}" 
              data-skill="${skillValue}">
          ${skill}
        </span>
      `;
    }).join('');
  }

  renderScenarioFilters() {
    const scenarios = ['All', 'Bedtime', 'Free Time', 'On the Way to School', 'After School', 'Weekend Morning', 'Mealtime'];
    return scenarios.map(scenario => {
      const scenarioValue = scenario === 'All' ? 'all' : scenario;
      const isSelected = this.filters.scenario === scenarioValue || (scenario === 'All' && this.filters.scenario === 'all');
      return `
        <span class="tag ${isSelected ? 'tag-selected' : 'tag-unselected'}" 
              data-scenario="${scenarioValue}">
          ${scenario}
        </span>
      `;
    }).join('');
  }

  async loadActivities() {
    this.activities = await this.activitiesService.filterActivities(this.filters);
    // Re-render filters to update selected state
    document.getElementById('skillFilters').innerHTML = this.renderSkillFilters();
    document.getElementById('scenarioFilters').innerHTML = this.renderScenarioFilters();
    this.attachEventListeners();
    this.renderActivities();
  }

  renderActivities() {
    const countEl = document.getElementById('missionCount');
    const listEl = document.getElementById('missionsList');

    countEl.textContent = `${this.activities.length} missions found`;

    if (this.activities.length === 0) {
      listEl.innerHTML = '<p style="text-align: center; color: var(--light-text);">No missions match your filters.</p>';
      return;
    }

    listEl.innerHTML = this.activities.map(activity => `
      <div class="activity-card" data-activity-id="${activity.id}">
        <div class="activity-header">
          <h4 class="activity-title">${activity.title || 'Mission'}</h4>
        </div>
        <div class="activity-meta">
          <span>⏱️ ${activity.duration || '10'} min.</span>
          <span class="tag tag-unselected" style="font-size: 12px;">${activity.prepLevel || 'Low'} prep</span>
        </div>
        <p class="activity-description">${activity.description || 'No description available.'}</p>
        <div class="filter-group">
          ${(activity.skills || []).slice(0, 3).map(skill => `
            <span class="tag tag-unselected" style="font-size: 12px;">${skill}</span>
          `).join('')}
          ${(activity.skills || []).length > 3 ? `<span class="tag tag-unselected" style="font-size: 12px;">+${activity.skills.length - 3}</span>` : ''}
        </div>
      </div>
    `).join('');

    // Attach click listeners
    document.querySelectorAll('.activity-card').forEach(card => {
      card.addEventListener('click', () => {
        const activityId = card.getAttribute('data-activity-id');
        const router = this.router || window.appRouter;
        if (router) {
          router.navigate(`/activity/${activityId}`);
        } else {
          window.location.href = `/activity/${activityId}`;
        }
      });
    });
  }

  attachEventListeners() {
    // Skill filters
    document.querySelectorAll('[data-skill]').forEach(tag => {
      tag.addEventListener('click', () => {
        this.filters.skill = tag.getAttribute('data-skill');
        this.loadActivities();
      });
    });

    // Scenario filters
    document.querySelectorAll('[data-scenario]').forEach(tag => {
      tag.addEventListener('click', () => {
        this.filters.scenario = tag.getAttribute('data-scenario');
        this.loadActivities();
      });
    });
  }
}
