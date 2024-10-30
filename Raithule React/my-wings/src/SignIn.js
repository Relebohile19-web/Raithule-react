// SignIn.js
import React, { useState } from "react";

const SignIn = ({ setAuth, setCurrentPage }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === credentials.username && storedUser.password === credentials.password) {
      localStorage.setItem("authToken", "authenticated");
      setAuth();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => setCurrentPage("signup")}>Don't have an account? Sign Up</button>
    </div>
  );
};

export default SignIn;
