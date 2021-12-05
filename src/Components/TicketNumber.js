import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Button from "../Shared/FormElements/Button";
import MurdochLogo from "../newlogo.png";
import "./TicketNumber.css";

const TicketNumber = () => {
  const history = useHistory();
  const location = useLocation();
  const [ticketNumber, setTicketNumber] = useState();
  
  useEffect(() => {
    setTicketNumber(location.state);
  }, [ticketNumber, location.state]);

  const returnHandler = () => {
    history.push("/selection");
  };

  return (
    <React.Fragment>
      <div className="ticketno-container">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Your ticket number</h2>
        <div id="ticket-number">{ticketNumber}</div>

        <Button type="button" id="return" onClick={returnHandler}>
          Return to Main Menu
        </Button>
        <div className="ticket_info">
          <p>Please enter your ticket number in the text box </p>
          <p>after entering number please press check button </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TicketNumber;
