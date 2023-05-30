import React from "react";
import "./spinner.css";

function Spinner(props) {
  return <span className="loader" style={props.style}></span>;
}

export default Spinner;
