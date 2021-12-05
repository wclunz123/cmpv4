import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import TriageNav from "./TriageNav";
import TicketDetails from "./TicketDetails";
import TicketTableHeader from "./TicketTableHeader";

import Button from "../Shared/FormElements/Button";
import Card from "../Shared/UIElements/Card";
import MurdochLogo from "../newlogo.png";
import "./ViewTickets.css";

const ViewTickets = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(location.state);
  }, [data, location.state]);

  const returnHandler = () => {
    history.push("/triage");
  };

  const printHandler = () => {
    window.frames["print_frame"].document.body.innerHTML =
      document.querySelector("#ticket-table").innerHTML;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
  };

  return (
    <React.Fragment>
      <TriageNav />
      <Card id="viewtickets">
        <img id="logo" src={MurdochLogo} alt="murdochlogo" />
        <h2>Service Request List</h2>
        <div className="ticket-list-container">
          <table id="ticket-table">
            <tbody>
              <TicketTableHeader />
              {data.map((ticket) => {
                return (
                  <TicketDetails
                    key={ticket.TicketId}
                    ticketId={ticket.TicketId || props.Ticketid}
                    ticketTitle={ticket.Title || props.Title}
                    ticketType={ticket.TicketType || props.TicketType}
                    ticketCategory={
                      ticket.TicketCategory || props.TicketCategory
                    }
                    ticketDate={ticket.TicketDate || props.TicketDate}
                    ticketStatus={ticket.TicketStatus || props.TicketStatus}
                    ticketPriority={
                      ticket.TicketPriority || props.TicketPriority
                    }
                    ticketDescription={ticket.Description || props.Description}
                    ticketDue={ticket.TicketDueDate || props.TicketDueDate}
                    ticketRequestor={ticket.Requestor || props.Requestor}
                    ticketAssign={ticket.TicketAssign || props.TicketAssign}
                    ticketFile={ticket.FileName || props.ticketFile}
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

          <Button type="button" id="return-triage" onClick={returnHandler}>
            Return to Main Menu
          </Button>
          <Button type="button" id="print-table" onClick={printHandler}>
            Print Report
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ViewTickets;
