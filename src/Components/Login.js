import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Shared/context/auth-context";

import Button from "../Shared/FormElements/Button";
import MurdochLogo from "../newlogo.png";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [errorMessage, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validateEmail = regex.test(
        String(event.target.username.value).toLowerCase()
      );
      const validatePassword = event.target.password.value.length > 5;
      if (validatePassword && validateEmail) {
        const response = await axios.post("/login", {
          username: event.target.username.value,
          password: event.target.password.value,
        });

        if (response.status === 200) {
          auth.login(response.data.username, response.data.token);
          setError(" ");
          if (response.data.usertype === "Student" ||
              response.data.usertype === "Staff") {
            history.push({ pathname: "/selection", state: "true" });
          } else {
            history.push("/triage");
          }
        } 
      } else if (event.target.username.value.length === 0 || event.target.password.value === 0) {
        setError("You must enter your email and password to login.");
      } else {
        setError("Your entered email or password is invalid.");
      }
    } catch (err) {
      setError("Wrong username or password.");
    }
  };

  return (
    <React.Fragment>
      <div className="login">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <form id="login" onSubmit={submitHandler}>
          <h2>Sign In </h2>

          <input
            type="text"
            name="username"
            id="username"
            placeholder="Murdoch Username"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <br />

          <div id="error-message">{errorMessage}</div>

          {/* <input
            type="checkbox"
            id="anonymous-login"
            onClick={anonymousLoginHandler}
          />
          <label for="anonymous-login">Tick here to login anonymously</label>
          <br /> */}
          <Button id="account-login" type="submit">
            Login
          </Button>
        </form>
        <div className="login_info">
          <p>Murdoch username in the form</p>
          <p>student_number@student.murdoch.edu.au or</p>
          <p>staff_number@murdoch.edu.au or</p>
          <p>triage_number@murdoch.edu.au</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
