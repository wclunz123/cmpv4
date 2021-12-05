import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "../Shared/FormElements/Button";
import Modal from "../Shared/UIElements/Modal";

import MurdochLogo from "../newlogo.png";
import "./TicketStatus.css";

const TicketStatus = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState();

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const openConfirmModal = () => {
    setShowModal(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let TicketId = document.getElementById("TicketId").value;
	console.log(TicketId);
    if (TicketId !== null && TicketId.length !== 0 && TicketId !== " ") {
      axios
        .get("/ticket/" + TicketId)
        .then((response) => {
          if (response.status === 201) {
            setFound(false);
            setMessage("No result found.");
          } else {
            setFound(true);
            setMessage("Your result ");
            setData(response.data[0]);
          }
          openConfirmModal();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
	setMessage("No result found.");
	openConfirmModal();
    }
  };

  const returnHandler = () => {
    const currentUser = window.localStorage.getItem("userData");
    if (currentUser) history.push({ pathname: "/selection", state: "true" });
    else history.push("/selection");
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeConfirmModal}
        header="Ticket Status"
        footer={<Button onClick={closeConfirmModal}>CLOSE</Button>}
      >
        {message && (<div className="ticket-status_header">
          {message}
          </div>)}

        {data && found && (
          <div className="ticket-status_content">
            <div className="ticket-status_body">Ticket ID: {data.TicketId}</div>
            <div className="ticket-status_body">
              Ticket Status: 
              <span id="ticket-status_span"> {data.TicketStatus}</span>
            </div>
            <div className="ticket-status_body">
              Ticket Due Date: {data.TicketDueDate.split('T')[0]}
            </div>
            <div className="ticket-status_body">Department: {data.TicketAssign ? data.TicketAssign : "Un-Assigned"}</div>
          </div>
        )}
      </Modal>

      <div className="ticket-container" onSubmit={submitHandler}>
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Check ticket status</h2>
        <form id="ticket-form">
          <label htmlFor="TicketId">Ticket No: </label>
          <input name="TicketId" id="TicketId"></input>

          <Button type="submit" name="submit" id="check-ticket">
            Check Status
          </Button>
          <Button type="button" id="return" onClick={returnHandler}>
            Return to Main Menu
          </Button>
        </form>

        <div className="ticket_info">
          <p>Please enter your ticket number in the text box </p>
          <p>after entering number please press check button </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TicketStatus;
