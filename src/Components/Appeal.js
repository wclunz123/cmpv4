import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import Button from "../Shared/FormElements/Button";

import MurdochLogo from "../newlogo.png";
import "./Appeal.css";

const Appeal = () => {
  const [studentId, setStudentId] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const location = useLocation();

  let currentUser = location.state;
  useEffect(() => {
    setStudentId(currentUser.studentId);
  }, [studentId, currentUser.studentId]);

  const submitHandler = async (event) => {
    event.preventDefault();
    let ext, filename;

    if (event.target.upload.files[0]) {
	filename = event.target.upload.files[0].name;
	let extArray = filename.split(".");
	ext = extArray[extArray.length - 1].toUpperCase();
    }

    if (filename != null && ext !== "DOC" && ext !== "DOCX" && ext !== "PDF") {
      setErrorMessage("Invalid file type.");
    } else if (filename && (ext === "DOC" || ext === "PDF" || ext === "DOCX")) {
      setErrorMessage(" ");

      try {
        let formData = new FormData();
        formData.append("unitCode", event.target.unitcode.value);
        formData.append("ticketType", "Appeal");
        formData.append("ticketTitle", event.target.title.value);
        formData.append("ticketCategory", "Result");
        formData.append("ticketDescription", event.target.description.value);
        formData.append("requestor", currentUser.studentName);
        formData.append("email", currentUser.studentId);
        formData.append("file", event.target.upload.files[0]);

        const response = await axios({
          method: "POST",
          url: "/ticket",
          data: formData,
          contentType: false,
          processData: false,
          headers: { "Content-Type": "multipart/form-data" },
        });

        history.push({
          pathname: "/ticketnumber",
          state: response.data[0].TicketId,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage(" ");

      let formData = new FormData();
      formData.append("unitCode", event.target.unitcode.value);
      formData.append("ticketType", "Appeal");
      formData.append("ticketTitle", event.target.title.value);
      formData.append("ticketCategory", "Result");
      formData.append("ticketDescription", event.target.description.value);
      formData.append("requestor", currentUser.studentName);
      formData.append("email", currentUser.studentId);

      try {
        const response = await axios({
          method: "POST",
          url: "/ticket",
          data: formData,
          contentType: false,
          processData: false,
          headers: { "Content-Type": "multipart/form-data" },
        });
        history.push({
          pathname: "/ticketnumber",
          state: response.data[0].TicketId,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const returnHandler = () => {
    const currentUser = window.localStorage.getItem("userData");
    if (currentUser) history.push({ pathname: "/selection", state: "true" });
    else history.push("/selection");
  };

  return (
    <React.Fragment>
      <div className="appeal-container">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Appeal</h2>
        <form
          id="appeal-form"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Student ID: </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="studentid"
                    name="studentid"
                    value={currentUser.studentId}
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Unit Code: </label>
                </td>
                <td>
                  <input type="text" id="unitcode" name="unitcode" required/>
                </td>
              </tr>

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

              <tr>
                <td>
                  <label>Upload: </label>
                </td>
                <td>
                  <input
                    type="file"
                    id="upload"
                    className="upload"
                    accept=".doc,.docx,.pdf"
                  />
                  <div id="upload-note">
                    Accepted file .doc, .docx, and .pdf only.
                  </div>
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <div id="error-message">{errorMessage}</div>
                  <Button type="submit" id="appeal-submit">
                    Submit Appeal
                  </Button>
                  <Button
                    type="button"
                    id="appeal-return"
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

export default Appeal;
