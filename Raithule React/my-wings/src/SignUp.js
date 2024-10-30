// SignUp.js
import React, { useState } from "react";

const SignUp = ({ setCurrentPage }) => {
  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentPage("signin");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => setCurrentPage("signin")}>Already have an account? Sign In</button>
    </div>
  );
};

export default SignUp;
