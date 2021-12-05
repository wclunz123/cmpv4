import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../Shared/context/auth-context";
import Button from "../Shared/FormElements/Button";

import MurdochLogo from "../newlogo.png";
import "./Feedback.css";

const Feedback = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [studentId, setStudentId] = useState();

  let requestor;
  let currentUser = location.state;
  if (currentUser.studentId === undefined || currentUser.studentId === null) {
    requestor = "Anonymous";
  }

  useEffect(() => {
    setStudentId(currentUser.studentId);
  }, [studentId, currentUser.studentId]);

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/ticket", {
        ticketType: "Feedback",
        ticketTitle: event.target.title.value,
        ticketCategory: event.target.category.value,
        ticketDescription: event.target.description.value,
        requestor: requestor,
        email: event.target.email.value,
      })
      .then((response) => {
        history.push({
          pathname: "/ticketnumber",
          state: response.data[0].TicketId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const returnHandler = () => {
    const currentUser = window.localStorage.getItem("userData");
    if (currentUser) history.push({ pathname: "/selection", state: "true" });
    else history.push("/selection");
  };

  return (
    <React.Fragment>
      <div className="feedback-container">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Feedback</h2>
        <form id="feedback-form" onSubmit={submitHandler}>
          <table>
            <tbody>
              {auth.isLoggedIn && (
                <tr>
                  <td>
                    <label>Student ID: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={studentId}
                      disabled
                    />
                  </td>
                </tr>
              )}
              
              <tr>
                <td>
                  <label>Title: </label>
                </td>
                <td>
                  <input type="text" id="title" name="title" required />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Category: </label>
                </td>
                <td>
                  <select type="text" id="category" name="category">
                    <option>Building</option>
                    <option>Environment</option>
                    <option>Facilities</option>
                    <option>Courses</option>
                    <option>Staff</option>
                    <option>Others</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label>Description: </label>
                </td>
                <td>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    rows="5"
                    cols="32"
		    required
                  ></textarea>
                </td>
              </tr>

              {!auth.isLoggedIn && (
                <tr>
                  <td>
                    <label>Email (optional): </label>
                  </td>
                  <td>
                    <input type="text" name="email" id="email" />
                  </td>
                </tr>
              )}

              <tr>
                <td></td>
                <td>
                  <Button type="submit" id="feedback-submit">
                    Submit Feedback
                  </Button>
                  <Button
                    type="button"
                    id="feedback-return"
                    onClick={returnHandler}
                  >
                    Return to Main Menu
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Feedback;
