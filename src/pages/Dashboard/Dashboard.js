import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import "./Dashboard.css";
function DashboardPage() {
  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard-pages">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
