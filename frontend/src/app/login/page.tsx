import "../components/css/login.css";

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="brand">
        Cyber<span>Aware</span>
      </div>

      <section className="login-card">
        <h1>Login to your account</h1>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="charles@xyz.com" />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#">Forgot Your Password?</a>
            </div>
            <input id="password" type="password" placeholder="••••••" />
          </div>

          <div className="remember-row">
            <label>
              <input type="checkbox" />
              <span>Remember me on this device</span>
            </label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              Sign in With Google
            </button>
            <button type="button" className="social-btn">
              Sign in With Passkey
            </button>
            <button type="button" className="social-btn">
              Sign in With SSO
            </button>
          </div>

          <p className="signup-text">
            New? <a href="#">Create an account</a>
          </p>
        </form>
      </section>
    </main>
  );
}