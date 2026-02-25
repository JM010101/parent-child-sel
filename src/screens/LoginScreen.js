export class LoginScreen {
  constructor() {
    this.authService = null;
    this.router = null;
  }

  setServices(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  setRouter(router) {
    this.router = router;
  }

  // Simple credential check - bypasses Firebase for MVP
  checkCredentials(email, password) {
    const testEmail = 'test_user@test.com';
    const testPassword = 'test-password';
    
    return email === testEmail && password === testPassword;
  }

  // Mock login - sets a flag in localStorage
  mockLogin() {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'test_user@test.com');
    return { success: true };
  }

  render(container) {
    container.innerHTML = `
      <div class="container">
        <div style="max-width: 400px; margin: 60px auto;">
          <h1 style="text-align: center; margin-bottom: 8px;">Welcome to ParenCEL</h1>
          <p style="text-align: center; margin-bottom: 32px;">Social Emotional Learning activities for families</p>
          
          <!-- Test Account Info -->
          <div style="background: var(--beige); padding: 16px; border-radius: var(--border-radius); margin-bottom: 24px; border: 2px dashed var(--primary-green);">
            <p style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--dark-text);">🧪 Test Account:</p>
            <p style="font-size: 13px; margin: 4px 0; color: var(--light-text);">
              <strong>Email:</strong> test_user@test.com<br>
              <strong>Password:</strong> test-password
            </p>
            <button id="fillTestBtn" class="btn-text" style="margin-top: 8px; font-size: 13px;">Click to fill test credentials</button>
          </div>
          
          <form id="loginForm" style="margin-bottom: 24px;">
            <label for="email" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--dark-text);">Email</label>
            <input type="email" id="email" class="input" placeholder="test_user@test.com" required>
            <label for="password" style="display: block; margin-bottom: 8px; margin-top: 16px; font-size: 14px; font-weight: 500; color: var(--dark-text);">Password</label>
            <input type="password" id="password" class="input" placeholder="test-password" required>
            <button type="submit" class="btn btn-primary" style="margin-top: 24px;">Sign In</button>
          </form>
          
          <div style="text-align: center; margin-bottom: 24px;">
            <p style="color: var(--light-text);">Don't have an account?</p>
            <button id="signUpBtn" class="btn btn-outline" style="width: 100%;">Sign Up</button>
          </div>
          
          <div id="errorMessage" style="color: #e57373; text-align: center; display: none;"></div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('loginForm');
    const signUpBtn = document.getElementById('signUpBtn');
    const fillTestBtn = document.getElementById('fillTestBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Get router reference (use window.appRouter as fallback)
    const router = this.router || window.appRouter;

    // Fill test credentials
    fillTestBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'test_user@test.com';
      document.getElementById('password').value = 'test-password';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      // Simple credential check - bypass Firebase
      if (this.checkCredentials(email, password)) {
        this.mockLogin();
        // Check if user has completed onboarding
        const hasOnboarding = localStorage.getItem('hasOnboarding') === 'true';
        if (hasOnboarding) {
          if (router) {
            router.navigate('/home');
          } else {
            window.location.href = '/home';
          }
        } else {
          if (router) {
            router.navigate('/onboarding');
          } else {
            window.location.href = '/onboarding';
          }
        }
      } else {
        errorMessage.textContent = 'Invalid credentials. Use test_user@test.com / test-password';
        errorMessage.style.display = 'block';
      }
    });

    signUpBtn.addEventListener('click', () => {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        errorMessage.textContent = 'Please enter email and password';
        errorMessage.style.display = 'block';
        return;
      }

      // For MVP, sign up also just checks credentials
      if (this.checkCredentials(email, password)) {
        this.mockLogin();
        if (router) {
          router.navigate('/onboarding');
        } else {
          window.location.href = '/onboarding';
        }
      } else {
        errorMessage.textContent = 'Please use test credentials: test_user@test.com / test-password';
        errorMessage.style.display = 'block';
      }
    });
  }
}
