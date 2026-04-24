"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      console.log("Login successful:", userCredential.user);
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      
      // Redirect to dashboard or home page after successful login
      router.push("/modules");
    } catch (err: any) {
      let errorMessage = "Login failed. Please try again.";
      
      if (err.code === "auth/user-not-found") {
        errorMessage = "Email not found. Please create an account.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      }
      
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      <section className="login-card">
        <h1>Login to your account</h1>

        {error && <div className="error-message" style={{ color: "red", marginBottom: "1rem", padding: "0.5rem", backgroundColor: "#ffecec", borderRadius: "4px" }}>{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="charles@xyz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#">Forgot Your Password?</a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-row">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
            New? <a href="/signup">Create an account</a>
          </p>
        </form>
      </section>
    </main>
  );
}