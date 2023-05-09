import React from "react";
import "./Auth.css";
import { useState } from "react";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import {
  handleLogIn,
  handleSignUp,
  authStatus,
} from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector(authStatus);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) alert("Please enter email and password");
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      try {
        dispatch(handleSignUp({ name, email, password })).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        dispatch(handleLogIn({ email, password })).unwrap();
        if (loginStatus === "success") {
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <form onSubmit={handleSubmit}>
        <div className="auth-container-2">
          {!isSignup && (
            <img src={icon} alt="stack overflow" className="login-logo"></img>
          )}
        </div>
        {isSignup && (
          <label htmlFor="name">
            <h4>Username</h4>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
        <label htmlFor="email">
          <h4>Email</h4>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label htmlFor="password">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Password</h4>
            {!isSignup && (
              <h4 style={{ color: "#007ac6", fontSize: "13px" }}>
                forgot password
              </h4>
            )}
          </div>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              Password must contain at least eight
              <br />
              characters, including at least 1 letter and 1<br />
              number.
            </p>
          )}
        </label>
        {isSignup && (
          <label htmlFor="check" className="Checking">
            <input type="checkbox" id="check"></input>
            <p style={{ color: "#666767", fontSize: "13px" }}>
              Opt-in to recieve occasional <br />
              product updates, user research invitation
              <br />
              company announcements, and digest{" "}
            </p>
          </label>
        )}
        {isSignup && (
          <p style={{ color: "#666767", fontSize: "13px" }}>
            By clicking "sign up", you agree to our{" "}
            <span style={{ color: "#007ac6" }}>
              terms of
              <br />
              services
            </span>
            , <span style={{ color: "#007ac6" }}>privacy policy</span> and{" "}
            <span style={{ color: "#007ac6" }}>cookie policy</span>
          </p>
        )}
        <button type="submit" className="auth-btn">
          {isSignup ? "Sign up" : "Login"}
        </button>
        <p>
          {isSignup ? "already have an account" : "Dont't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </form>
    </section>
  );
};

export default Auth;
