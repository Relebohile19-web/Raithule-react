// Dashboard.js
import React from "react";

const Dashboard = ({ setCurrentPage, handleLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setCurrentPage("productmanagement")}>Go to Product Management</button>
      <button onClick={() => setCurrentPage("usermanagement")}>Go to User Management</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
