import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../Shared/context/auth-context";
import Button from "../Shared/FormElements/Button";

import MurdochLogo from "../newlogo.png";
import "./Complaint.css";

const Complaint = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [studentId, setStudentId] = useState();
  // const [currentUser, setCurrentUser] = useState();

  let requestor;
  let currentUser = location.state;
  if (currentUser.studentId === undefined || currentUser.studentId === null) {
    requestor = "Anonymous";
  }

  useEffect(() => {
    setStudentId(currentUser.studentId);
  }, [studentId, currentUser.studentId]);

  const submitHandler = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("ticketType", "Complaint");
    formData.append("ticketTitle", event.target.title.value);
    formData.append("ticketCategory", event.target.category.value);
    formData.append("ticketDescription", event.target.description.value);
    formData.append("requestor", requestor);
    formData.append("email", event.target.email.value);
    // formData.append("file", event.target.upload.files[0]);

    try {
      const res = await axios({
        method: "POST",
        url: "/ticket",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push({
        pathname: "/ticketnumber",
        state: res.data[0].TicketId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const returnHandler = () => {
    const currentUser = window.localStorage.getItem("userData");
    if (currentUser) history.push({ pathname: "/selection", state: "true" });
    else history.push("/selection");
  };

  return (
    <React.Fragment>
      <div className="complaint-container">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Complaint</h2>
        <form
          id="complaint-form"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <table>
            <tbody>
              {auth.isLoggedIn && (
                <tr>
                  <td>
                    <label>User ID: </label>
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
                  <input type="text" id="title" name="title" required/>
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
                  <Button type="submit" id="complaint-submit">
                    Submit Complaint
                  </Button>
                  <Button
                    type="button"
                    id="complaint-return"
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

export default Complaint;
