import React from "react";
import { useHistory } from "react-router-dom";

import Card from "../Shared/UIElements/Card";
import Button from "../Shared/FormElements/Button";
import MurdochLogo from "../newlogo.png";
import "./LoginPublic.css";

const LoginPublic = () => {
  const history = useHistory();

  const loginHandler = () => {
    history.push("/login");
  };

  const publicHandler = () => {
    history.push("/selection");
  };

  return (
    <React.Fragment>
      <div className="public">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />

        <h2>Select your identity: </h2>
        <Card className="identity-container">
          <h4>Access the Complant Portal as Anonymous</h4>
          <div className="identity-content">
            We encourage anonymous feedbacks and no personal information would
            be collected while accessing the complaint as public. Murdoch
            University values all feedbacks and complaints.
          </div>
          <Button id="identity-button-pub" onClick={publicHandler}>
            Member of Public
          </Button>
        </Card>

        <Card className="identity-container" id="identity-public">
          <h4>Access the Complant Portal with Murdoch ID</h4>
          <div className="identity-content">
            You would be required to login using your Murdoch ID and Password.
            Murdoch University value all feedbacks and complaints.
          </div>
          <Button id="identity-button-login" onClick={loginHandler}>
            Student / Staff
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default LoginPublic;
