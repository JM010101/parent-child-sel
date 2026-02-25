import './styles/main.css';
import { App } from './app.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
