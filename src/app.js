import { Router } from './router.js';
import { AuthService } from './services/auth.js';

export class App {
  constructor() {
    this.router = new Router();
    this.authService = new AuthService();
  }

  async init() {
    // Check authentication status
    this.authService.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate('/home');
      } else {
        this.router.navigate('/onboarding');
      }
    });

    // Initialize router
    this.router.init();
  }
}
