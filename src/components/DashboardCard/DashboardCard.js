import React from "react";
import "./DashboardCard.css";

function DashboardCard(props) {
  return (
    // <div className="dashboard-admin-count">
    <div
      className="admin-count-card"
      style={props.style}
      onClick={props.onClick}
    >
      <h2>{props.title}</h2>
      <p data-admins-count={props.dataCount}></p>
    </div>
    // {/* </div> */}
  );
}

export default DashboardCard;
