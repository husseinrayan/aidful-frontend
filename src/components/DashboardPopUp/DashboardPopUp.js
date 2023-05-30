import React from "react";
import "./DashboardPopUp.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function DashboardPopUp(props) {
  return (
    <div className="dashboard-popup-overlay">
      <div className="dashboard-popup-body">
        <div className="dashboard-popup-title">
          <h2>{props.title}</h2>
        </div>
        <div className="dashboard-popup-close" onClick={props.onClick}>
          <CloseRoundedIcon />
        </div>
        <form onSubmit={props.onSubmit} className="dashboard-popup-form">
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default DashboardPopUp;
