import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement"; // Import the new component
import "./CSS.css";

function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage("usermanagement"); // Set page to "usermanagement" if authenticated
    }
  }, []);

  const handleSignIn = () => {
    localStorage.setItem("authToken", "your_token_here"); // Simulate setting a token
    setIsAuthenticated(true);
    setCurrentPage("usermanagement"); // Redirect to User Management on sign-in
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setCurrentPage("signin"); 
  };

  return (
    <div>
      {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      {currentPage === "signin" && <SignIn setAuth={handleSignIn} setCurrentPage={setCurrentPage} />}
      {isAuthenticated && currentPage === "usermanagement" && (
        <UserManagement handleLogout={handleLogout} />
      )}
      {isAuthenticated && currentPage === "dashboard" && (
        <Dashboard setCurrentPage={setCurrentPage} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
