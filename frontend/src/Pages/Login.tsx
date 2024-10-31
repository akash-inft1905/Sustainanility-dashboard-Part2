import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginState {
  email: string;
  password: string;
  error: string;
}

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sustainanility-dashboard.onrender.com/api/auth/login",
        { email: loginState.email, password: loginState.password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setLoginState((prevState) => ({ ...prevState, error: "Invalid email or password." }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="welcome-text">
          <h1>Welcome to Oren Sustainability Dashboard</h1>
          <p>
            Oren is a leader in environmental sustainability, providing data-driven solutions for a greener future. Our "Sustainability Dashboard" helps businesses track and improve their environmental impact.
          </p>
          <p className="mission-text">Join us in our mission to create a cleaner, sustainable world.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <h2>Login to your Account</h2>
          {loginState.error && <p className="error-message">{loginState.error}</p>}
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={loginState.email}
              onChange={(e) => setLoginState((prevState) => ({ ...prevState, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={loginState.password}
              onChange={(e) => setLoginState((prevState) => ({ ...prevState, password: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
