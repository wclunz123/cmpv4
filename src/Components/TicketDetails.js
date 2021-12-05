import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../Shared/FormElements/Button";
import Modal from "../Shared/UIElements/Modal";

import "./TicketDetails.css";

const TicketDetails = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [assign, setAssign] = useState();
  const [requestor, setRequestor] = useState();
  const [isClosed, setIsClosed] = useState();

  useEffect(() => {
    if (props.ticketAssign != null) setAssign(props.ticketAssign);
    else setAssign(null);

    if (props.ticketRequestor != null) setRequestor(props.ticketRequestor);
    else setRequestor(null);

    if (props.ticketStatus === "Approved" || props.ticketStatus === "Rejected")
      setIsClosed(true);
    else setIsClosed(false);
  }, [assign, requestor, props.ticketAssign, props.ticketRequestor, props.ticketStatus]);

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const openConfirmModal = () => {
    setShowModal(true);
  };

  const forwardHandler = () => {
    if (props.ticketEmail.length !== 0 || props.ticketEmail !== null) {
      console.log(props.ticketEmail);
      var emailContent = "mailto:" + props.ticketEmail;
      window.open(emailContent);
    } else closeConfirmModal();
  };

  const updateHandler = async () => {
    let category = document.getElementById(
      "ticket-details_header-category"
    ).value;
    let status = document.getElementById("ticket-details_header-status").value;
    let priority = document.getElementById(
      "ticket-details_header-priority"
    ).value;
    let duedate = document.getElementById(
      "ticket-details_header-duedate"
    ).value;
    let department = document.getElementById(
      "ticket-details_header-department"
    ).value;

    if (
      category !== props.ticketCategory ||
      status !== props.ticketStatus ||
      priority !== props.ticketPriority ||
      duedate !== props.ticketDue ||
      department !== props.ticketDepartment
    ) {
      try {
        console.log(props.ticketId);
        const response = await axios.patch("/ticket/" + props.ticketId, {
          TicketCategory: category,
          TicketStatus: status,
          TicketPriority: priority,
          TicketDueDate: duedate,
          TicketDepartment: department,
        });
        console.log(response);
        if (response.status === 200) {
          closeConfirmModal();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeConfirmModal}
        header="View Service Request"
        footer={
          <div className="ticket-details_button-container">
            <Button className="ticket-details_button" onClick={updateHandler}>
              Update
            </Button>
            {props.ticketEmail && (
              <Button
                className="ticket-details_button"
                onClick={forwardHandler}
              >
                Forward
              </Button>
            )}
            <Button
              className="ticket-details_button"
              onClick={closeConfirmModal}
            >
              Cancel
            </Button>
          </div>
        }
      >
        <form className="ticket-details_form">
          <div className="ticket-details_header">
            <label>Ticket ID</label>
            <br />
            <input value={props.ticketId} disabled />
          </div>

          <div className="ticket-details_header">
            <label>Ticket Type</label>
            <br />
            <input value={props.ticketType} disabled />
          </div>

          <div className="ticket-details_header">
            <label>Category</label>
            <br />
            <select
              id="ticket-details_header-category"
              defaultValue={props.ticketCategory}
              disabled={isClosed && `disabled`}
            >
              <option> </option>
              <option>Building</option>
              <option>Cleanliness</option>
              <option>Facilities</option>
              <option>Staff</option>
              <option>Lecturer</option>
              <option>Results</option>
              <option>Others</option>
            </select>
          </div>

          <div className="ticket-details_header">
            <label>Status</label>
            <br />
            <select
              id="ticket-details_header-status"
              defaultValue={props.ticketStatus}
              disabled={isClosed && `disabled`}
            >
              <option> </option>
              <option>Submitted</option>
              <option>Pending</option>
              <option>Acknowledged</option>
              <option>Completed</option>
              <option>Rejected</option>
              <option>Approved</option>
            </select>
          </div>

          <div className="ticket-details_header">
            <label>Priority</label>
            <br />
            <select
              id="ticket-details_header-priority"
              defaultValue={props.ticketPriority}
              disabled={isClosed && `disabled`}
            >
              <option> </option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="ticket-details_header">
            <label>Title</label>
            <br />
            <input
              id="ticket-details_header-title"
              value={props.ticketTitle}
              disabled
            />
          </div>

          <div className="ticket-details_desc">
            <label>Description</label>
            <div id="ticket-details_desc-content">
              {props.ticketDescription}
            </div>
          </div>

          <div className="ticket-details_footer">
            <label>Ticket Date</label>
            <br />
            <input
              type="date"
              value={props.ticketDate.split("T")[0]}
              disabled
            />
          </div>

          <div className="ticket-details_footer">
            <label>Ticket Due Date</label>
            <br />
            <input
              id="ticket-details_header-duedate"
              type="date"
              defaultValue={props.ticketDue.split("T")[0]}
              disabled={isClosed && `disabled`}
            />
          </div>

          <div className="ticket-details_footer">
            <label>Reported by</label>
            <br />
            <input value={requestor || "Anonymous"} disabled />
          </div>

          <div className="ticket-details_footer">
            <label>Department Assigned</label>
            <br />
            <select
              id="ticket-details_header-department"
              defaultValue={assign}
              disabled={assign || (isClosed && `disabled`)}
            >
              <option> </option>
              <option>Complaint Department</option>
              <option>Appeal Department</option>
              <option>Feedback Department</option>
              <option>Facility Management</option>
              <option>Administration</option>
              <option>General Affairs</option>
              <option>Human Resources</option>
            </select>
          </div>

          <div className="ticket-details_footer">
            <label>Files: </label>
            <br />
            {props.ticketFile && (
              <p>
                <a href={props.ticketFile} download>
                  Download Document
                </a>
              </p>
            )}

            {!props.ticketFile && <p>N/A</p>}
          </div>
        </form>
      </Modal>

      <tr onClick={openConfirmModal}>
        <td>{props.ticketId}</td>
        <td>{props.ticketType}</td>
        <td>{props.ticketDate && props.ticketDate.split("T")[0]}</td>
        <td>{props.ticketDue && props.ticketDue.split("T")[0]}</td>
        <td>{props.ticketCategory}</td>
        <td>{props.ticketStatus}</td>
        <td>{props.ticketPriority}</td>
        <td>{props.ticketRequestor}</td>
        <td>{props.ticketAssign}</td>
      </tr>
    </React.Fragment>
  );
};

export default TicketDetails;
