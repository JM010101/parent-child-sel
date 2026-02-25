import { Router } from './router.js';
import { AuthService } from './services/auth.js';
import { LoginScreen } from './screens/LoginScreen.js';
import { OnboardingScreen } from './screens/OnboardingScreen.js';
import { HomeScreen } from './screens/HomeScreen.js';
import { MissionsScreen } from './screens/MissionsScreen.js';
import { ActivityScreen } from './screens/ActivityScreen.js';
import { LibraryScreen } from './screens/LibraryScreen.js';
import { CommunityScreen } from './screens/CommunityScreen.js';

export class App {
  constructor() {
    this.router = new Router();
    this.authService = new AuthService();
  }

  async init() {
    // Register routes
    this.router.register('/', LoginScreen);
    this.router.register('/login', LoginScreen);
    this.router.register('/onboarding', OnboardingScreen);
    this.router.register('/home', HomeScreen);
    this.router.register('/missions', MissionsScreen);
    this.router.register('/library', LibraryScreen);
    this.router.register('/community', CommunityScreen);
    
    // Register dynamic activity route - handle in ActivityScreen
    // We'll match any /activity/* path
    window.activityRoutePattern = /^\/activity\/(.+)$/;

    // Initialize router
    this.router.init();

    // Check authentication status
    this.authService.onAuthStateChanged((user) => {
      const path = window.location.pathname;
      const publicRoutes = ['/', '/login'];
      
      if (!user && !publicRoutes.includes(path)) {
        this.router.navigate('/login');
      } else if (user && (path === '/' || path === '/login')) {
        this.router.navigate('/home');
      }
    });

    // Set up services for screens that need them
    this.setupScreenServices();
  }

  setupScreenServices() {
    // Make router and services available globally for screens
    window.appRouter = this.router;
    window.authService = this.authService;
    window.ActivityScreen = ActivityScreen;
  }
}
