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
          
          <form id="loginForm" style="margin-bottom: 24px;">
            <input type="email" id="email" class="input" placeholder="Email" required>
            <input type="password" id="password" class="input" placeholder="Password" required>
            <button type="submit" class="btn btn-primary">Sign In</button>
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
    const errorMessage = document.getElementById('errorMessage');

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
