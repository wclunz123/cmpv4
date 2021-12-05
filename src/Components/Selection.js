import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Shared/context/auth-context";
import MurdochLogo from "../newlogo.png";
import "./Selection.css";

const Selection = () => {
  const auth = useContext(AuthContext);
  const [studentName, setStudentName] = useState();
  const history = useHistory();

  useEffect(() => {
    try {
      if (auth.isLoggedIn) {
        async function fetchData() {
          axios
            .post("/student", {
              studentId: auth.userId,
            })
            .then((res) => {
              setStudentName(res.data.studentName);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  }, [auth.isLoggedIn, auth.userId]);

  const complaintHandler = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/complaint",
      state: {
        studentId: auth.userId,
        studentName: studentName,
      },
    });
  };

  const feedbackHandler = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/feedback",
      state: {
        studentId: auth.userId,
        studentName: studentName,
      },
    });
  };

  const appealHandler = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/appeal",
      state: {
        studentId: auth.userId,
        studentName: studentName,
      },
    });
  };

  const ticketStatusHandler = (event) => {
    event.preventDefault();
    history.push("/ticket-status");
  };

  return (
    <React.Fragment>
      <div className="selection">
        <img
          className="logo-selection"
          id="logo"
          src={MurdochLogo}
          alt="murdochlogo"
        />
        <h2>Select from the following</h2>
        <div className="center">
          <button id="complaint-button" onClick={complaintHandler}>
            Complaint
          </button>

          <button id="feedback-button" onClick={feedbackHandler}>
            Feedback
          </button>

          {auth.isLoggedIn && (
            <button id="appeal-button" onClick={appealHandler}>
              Appeal
            </button>
          )}

          <button id="ticket-status-button" onClick={ticketStatusHandler}>
            Ticket Status
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Selection;
