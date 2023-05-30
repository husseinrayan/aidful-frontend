import React from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../../components/button/button";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Programmatically navigate to the About page
    navigate("/admin-login");
  };
  return (
    <div className="not-found">
      <div className="not-found-page-container">
        <h1 className="unauthorized-heading">Unauthorized</h1>
        <p className="unauthorized-e">
          401 - You don't have access to this page
        </p>
        <p style={{ width: "400px", textAlign: "center", marginTop: "20px" }}>
          This page is not publicly available.
        </p>
        <p style={{ width: "400px", textAlign: "center", marginTop: "20px" }}>
          To access it please login first.
        </p>
        <MainButton
          name="Login"
          style={{ marginTop: "20px" }}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default Unauthorized;
