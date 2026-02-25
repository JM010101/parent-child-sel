export class LoginScreen {
  constructor() {
    this.authService = null;
    this.router = null;
  }

  setServices(authService, router) {
    this.authService = authService;
    this.router = router;
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

    // Fill test credentials
    fillTestBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'test_user@test.com';
      document.getElementById('password').value = 'test-password';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const result = await this.authService.signIn(email, password);
      if (result.success) {
        this.router.navigate('/onboarding');
      } else {
        errorMessage.textContent = result.error;
        errorMessage.style.display = 'block';
      }
    });

    signUpBtn.addEventListener('click', async () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
        errorMessage.textContent = 'Please enter email and password';
        errorMessage.style.display = 'block';
        return;
      }

      const result = await this.authService.signUp(email, password);
      if (result.success) {
        this.router.navigate('/onboarding');
      } else {
        errorMessage.textContent = result.error;
        errorMessage.style.display = 'block';
      }
    });
  }
}
