import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import "./UserLogin.css";
import logo from "../../images/header-logo3.png";
import axios from "axios";
import Spinner from "../../components/spinner/spinner";
import Cookies from "js-cookie";
const UserLoginPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(-1);
  };

  const [signup, setSignup] = useState(false);
  const [userSignup, setUserSignup] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: "",
  });

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const emptySignupTextFields = () => {
    setUserSignup({
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  const emptyLoginTextFields = () => {
    setUserLogin({
      email: "",
      password: "",
    });
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setIsValid(validateEmail(email));
  };

  const handleSignUpChange = (event) => {
    const value = event.target.value;
    setUserSignup({ ...userSignup, [event.target.name]: value });
  };

  const handleCombinedChange = (event) => {
    handleInputChange(event);
    handleSignUpChange(event);
  };

  const handleLoginChange = (event) => {
    const value = event.target.value;
    setUserLogin({ ...userLogin, [event.target.name]: value });
  };

  const SignUp = async () => {
    const signUp = {
      fullName: userSignup.fullName,
      address: userSignup.address,
      phoneNumber: userSignup.phoneNumber,
      email: userSignup.email,
      password: userSignup.password,
    };
    setErrorMessage({ error: "" });
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        signUp
      );
      setIsLoading(false);
      setUserSignup({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
      setSignup(false);
    } catch (e) {
      console.log(e);
      setErrorMessage({ error: e.response.data.message });
      setIsLoading(false);
    }
  };

  const Login = async () => {
    const login = {
      email: userLogin.email,
      password: userLogin.password,
    };
    setErrorMessage({ error: "" });
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        login
      );
      setIsLoading(false);

      console.log(response);

      if (response.status === 200) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("user-token",response.data.token)
        Cookies.set("user-token", response.data.token, {
          expires: oneWeek,
        });
        Cookies.set("user-id", response.data.id);
      } else {
        console.error(response.data.message);
      }
      handleButtonClick();
    } catch (e) {
      console.log(e.message);
      setErrorMessage({ error: "Email or password is invalid" });
      console.log(errorMessage.error);
      setIsLoading(false);
    }
  };

  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(email);
    return emailRegex.test(email);
  };

  return (
    <div className="user-login-page">
      <div className="user-login-background-effect-left"></div>

      <div className="user-login-page-container">
        <div className="user-login-page-image"></div>
        {!signup ? (
          <div className="user-login-page-form">
            <div className="user-login-page-logo">
              <img src={logo} alt="RMZNA-logo" width="100%" height="100%" />
            </div>
            <h2 className="user-login-page-title">Login</h2>
            <form className="user-login-page-inputs">
              <div
                style={{
                  color: "var(--accent-color)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => setErrorMessage("")}
              >
                {errorMessage.error}
              </div>
              <div className="user-login-page-email">
                <TextField
                  label="Email"
                  type="email"
                  required={true}
                  style={{ fontSize: "16px", padding: "15px" }}
                  name="email"
                  onChange={handleLoginChange}
                  value={userLogin.email}
                />
              </div>
              <div className="user-login-page-password">
                <TextField
                  label="Password"
                  type="password"
                  required={true}
                  style={{ fontSize: "16px", padding: "15px" }}
                  name="password"
                  onChange={handleLoginChange}
                  value={userLogin.password}
                />
              </div>
              <div className="user-login-page-buttons">
                <MainButton
                  name="Login"
                  style={{ padding: "15px 20px" }}
                  onClick={(e) => {
                    Login();
                    e.preventDefault();
                  }}
                />
                {isLoading && (
                  <Spinner
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </div>
              <div>
                <p
                  onClick={() => {
                    setSignup(true);
                    emptyLoginTextFields();
                  }}
                  className="user-login-page-signup-nav"
                >
                  Don't have an account? signup
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div
            className="user-login-page-form"
            // style={{ padding: "20px 80px" }}
          >
            <div className="user-login-page-logo" style={{ marginBottom: 0 }}>
              <img
                src={logo}
                alt="RMZNA-logo"
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
            <h2
              className="user-login-page-title"
              style={{ marginBottom: "30px" }}
            >
              Sign Up
            </h2>
            <form className="user-login-page-inputs" style={{ gap: "20px" }}>
              <div
                style={{
                  color: "var(--accent-color)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setErrorMessage("");
                  setIsValid(true);
                }}
              >
                {errorMessage.error}
                {isValid ? null : (
                  <p>Invalid Email Address{console.log(isValid)}</p>
                )}
              </div>
              <div className="user-login-page-email">
                <TextField
                  label="Full Name"
                  type="text"
                  required={true}
                  style={{ fontSize: "16px", padding: "15px" }}
                  name="fullName"
                  onChange={handleSignUpChange}
                  value={userSignup.fullName}
                />
              </div>
              <div className="user-login-page-address-phone">
                <div>
                  <TextField
                    label="Address"
                    type="text"
                    required={true}
                    style={{ fontSize: "16px", padding: "15px" }}
                    name="address"
                    onChange={handleSignUpChange}
                    value={userSignup.address}
                  />
                </div>
                <div>
                  <TextField
                    label="Phone"
                    type="tel"
                    placeholder="00961 xxx xxxx"
                    required={true}
                    style={{ fontSize: "16px", padding: "15px" }}
                    name="phoneNumber"
                    onChange={handleSignUpChange}
                    value={userSignup.phoneNumber}
                  />
                </div>
              </div>
              <div>
                <TextField
                  label="Email"
                  type="email"
                  required={true}
                  style={{ fontSize: "16px", padding: "15px" }}
                  name="email"
                  onChange={handleCombinedChange}
                  value={userSignup.email}
                />
              </div>
              <div className="user-login-page-password">
                <TextField
                  label="Password"
                  type="password"
                  required={true}
                  style={{ fontSize: "16px", padding: "15px" }}
                  name="password"
                  onChange={handleSignUpChange}
                  value={userSignup.password}
                />
              </div>
              <div className="user-login-page-buttons">
                <MainButton
                  name="Sign Up"
                  style={{ padding: "15px 20px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    SignUp();
                  }}
                />
                {isLoading && (
                  <Spinner
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </div>
              <div>
                <p
                  onClick={() => {
                    setSignup(false);
                    emptySignupTextFields();
                  }}
                  className="user-login-page-signup-nav"
                >
                  Already have an account? login
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLoginPage;
