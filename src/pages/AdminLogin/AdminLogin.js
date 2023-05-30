import React, { useState } from "react";
import "./AdminLogin.css";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import logo from "../../images/header-logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";
import Cookies from "js-cookie";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: "",
  });

  const handleLoginChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, [event.target.name]: value });
  };

  const Login = async () => {
    const loginData = {
      email: login.email,
      password: login.password,
    };

    setErrorMessage({ error: "" });
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/login`,
        loginData
      );

      setIsLoading(false);

      if (response.status == 200) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        Cookies.set("admin-token", response.data.token, {
          expires: oneWeek,
        });
        localStorage.setItem("admin-full-name", response.data.fullName);
        localStorage.setItem("admin-email", response.data.email);

        navigate("/dashboard");
      } else {
        console.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage({ error: "Email or password is invalid" });
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-logo">
          <img
            src={logo}
            alt="RMZNA logo"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h2>Login</h2>
        <div className="admin-login-form">
          <div style={{ color: "var(--accent-color)", textAlign: "center" }}>
            {errorMessage.error}
          </div>
          <div>
            <TextField
              type="email"
              style={{ width: "100%" }}
              id="email"
              label="Email"
              name="email"
              onChange={handleLoginChange}
            />
          </div>
          <div>
            <TextField
              type="password"
              style={{ width: "100%" }}
              id="password"
              label="Password"
              name="password"
              onChange={handleLoginChange}
            />
          </div>
          <div className="admin-login-page-button">
            <MainButton
              name="Login"
              style={{ width: "100%", padding: "15px 0" }}
              onClick={(e) => {
                e.preventDefault();
                Login();
              }}
            />
            {isLoading && (
              <Spinner
                style={{ width: "20px", height: "20px", marginTop: "10px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
