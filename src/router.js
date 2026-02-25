export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
  }

  init() {
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    // Handle initial load
    this.handleRoute();

    // Handle link clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-route]')) {
        e.preventDefault();
        const route = e.target.getAttribute('data-route');
        this.navigate(route);
      }
    });
  }

  register(route, component) {
    this.routes[route] = component;
  }

  navigate(route) {
    window.history.pushState({}, '', route);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname || '/';
    const route = this.routes[path] || this.routes['/'];
    
    if (route) {
      const app = document.getElementById('app');
      app.innerHTML = '';
      const component = new route();
      component.render(app);
      this.currentRoute = path;
    }
  }
}
