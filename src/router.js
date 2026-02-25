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
    
    // Check for exact match first
    let ComponentClass = this.routes[path];
    
    // Check for activity route pattern
    if (!ComponentClass && window.activityRoutePattern && window.activityRoutePattern.test(path)) {
      ComponentClass = window.ActivityScreen;
    }
    
    // If exact match not found, check for dynamic routes (e.g., /activity/:id)
    if (!ComponentClass) {
      for (const [routePath, component] of Object.entries(this.routes)) {
        if (routePath.includes(':')) {
          // Convert route pattern to regex
          const pattern = '^' + routePath.replace(/:[^/]+/g, '([^/]+)') + '$';
          const regex = new RegExp(pattern);
          if (regex.test(path)) {
            ComponentClass = component;
            break;
          }
        }
      }
    }
    
    // Fallback to default route
    if (!ComponentClass) {
      ComponentClass = this.routes['/'] || this.routes['/login'];
    }
    
    if (ComponentClass) {
      const app = document.getElementById('app');
      app.innerHTML = '';
      const component = new ComponentClass();
      
      // Inject router first (most screens need this)
      if (window.appRouter) {
        if (component.setRouter) {
          component.setRouter(window.appRouter);
        }
        // Also set router property directly for compatibility
        component.router = window.appRouter;
      }
      
      // Inject services if method exists
      if (component.setServices && window.authService) {
        component.setServices(window.authService, window.appRouter);
      }
      
      component.render(app);
      this.currentRoute = path;
    }
  }
}
