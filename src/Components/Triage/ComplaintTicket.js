import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../../Shared/UIElements/Card";
import Button from "../../Shared/FormElements/Button";
import TicketDetails from "../TicketDetails";
import TicketTableHeader from "../TicketTableHeader";
import TriageNav from "../TriageNav";

import MurdochLogo from "../../newlogo.png";

const ComplaintTicket = () => {
  const [complaintTicket, setComplaintTicket] = useState();

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get("/ticket");
        if (response.status === 200 && response.data != null) {
          let complaintArray = [];
          response.data.map((ticket) => {
            if (ticket.TicketType === "Complaint") {
              complaintArray.push(ticket);
            }
          });
          setComplaintTicket(complaintArray);
        }
      }
      fetchData();
    } catch (err) {
      throw err;
    }
  }, [complaintTicket]);

  const printHandler = () => {
    window.frames["print_frame"].document.body.innerHTML =
      document.querySelector("#viewtickets").innerHTML;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
  };

  return (
    <React.Fragment>
      <TriageNav />
      <Card id="viewtickets">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Complaint Tickets</h2>
        <div className="ticket-list-container">
          <table id="ticket-table">
            <tbody>
              <TicketTableHeader />
              {complaintTicket &&
                complaintTicket.map((ticket) => {
                  return (
                    <TicketDetails
                      key={ticket.TicketId}
                      ticketId={ticket.TicketId}
                      ticketTitle={ticket.Title}
                      ticketType={ticket.TicketType}
                      ticketCategory={ticket.TicketCategory}
                      ticketDate={ticket.TicketDate}
                      ticketStatus={ticket.TicketStatus}
                      ticketPriority={ticket.TicketPriority}
                      ticketDescription={ticket.Description}
                      ticketDue={ticket.TicketDueDate}
                      ticketRequestor={ticket.Requestor}
                      ticketAssign={ticket.TicketAssign}
                      ticketFile={ticket.FileName}
                      ticketEmail={ticket.Email}
                    />
                  );
                })}
            </tbody>
          </table>

          <iframe
            name="print_frame"
            title="Printframe"
            width="0"
            height="0"
            frameborder="0"
            src="about:blank"
          ></iframe>

          <Link to="/triage">
            <Button type="button" id="return-triage">
              Return to Main Menu
            </Button>
          </Link>

          <Button type="button" id="print-table" onClick={printHandler}>
            Print Report
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ComplaintTicket;
