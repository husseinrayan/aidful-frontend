import React from "react";
import "./DashboardHeroSection.css";

function DashboardHeroSection(props) {
  return (
    <div className="dashboard-hero-section">
      <h2>{props.title}</h2>
    </div>
  );
}

export default DashboardHeroSection;
