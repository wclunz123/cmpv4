import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import TriageNav from "./TriageNav";
import TicketDetails from "../TicketDetails";
import TicketTableHeader from "../TicketTableHeader";
import DashboardItem from "../DashboardItem";
import Card from "../../Shared/UIElements/Card";

import "./Triage.css";

const Triage = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [acknowledgedData, setAcknowledgedData] = useState([]);
  const [complaint, setComplaint] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [appeal, setAppeal] = useState([]);
  const [navData, setNavData] = useState({});

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get("/ticket");
        if (response.status === 200 && response.data != null) {
          setData(response.data);

          let newArray = [];
          let today = new Date(new Date().toISOString().slice(0, 10));
          let pendingArray = [];
          let closedArray = [];
          let acknowledgedArray = [];
          let comArray = [],
            feedArray = [],
            appArray = [];

          response.data.map((ticket) => {
            if (ticket.TicketStatus === "Pending") {
              pendingArray.push(ticket);
            } else if (ticket.TicketStatus === "Completed") {
              closedArray.push(ticket);
            } else if (ticket.TicketStatus === "Acknowledged") {
              acknowledgedArray.push(ticket);
            }

            today.setDate(today.getDate() - 7);
            let ticketDateObj = new Date(ticket.TicketDate.split("T")[0]);
            if (ticketDateObj > today) {
              newArray.push(ticket);
            }

            if (ticket.TicketType === "Complaint") {
              comArray.push(ticket);
            } else if (ticket.TicketType === "Feedback") {
              feedArray.push(ticket);
            } else {
              appArray.push(ticket);
            }

            return 0;
          });
          setPendingData(pendingArray);
          setAcknowledgedData(acknowledgedArray);
          setNewData(newArray);
          setComplaint(comArray);
          setFeedback(feedArray);
          setAppeal(appArray);
          let temp = {
            allData: data,
            pendingData: pendingData,
            closedData: pendingData,
          };
          setNavData(temp);
        } else setData([]);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [data, pendingData]);

  const pendingTicketHandler = async () => {
    history.push({ pathname: "/viewtickets", state: pendingData });
  };

  const onholdTicketHandler = () => {
    history.push({ pathname: "/viewtickets", state: acknowledgedData });
  };

  return (
    <React.Fragment>
      <TriageNav data={navData} />
      <div id="adminnav">
        <Card className="card-header">
          <h2>Ticket Overview</h2>
          <div className="dashboard-item-container">
            <Link to="/complainttickets">
              <DashboardItem
                key="complaint"
                color="orange"
                header="Complaint"
                count={complaint.length}
              />
            </Link>

            <Link to="/feedbacktickets">
              <DashboardItem
                key="feedback"
                color="green"
                header="Feedback"
                count={feedback.length}
              />
            </Link>

            <Link to="/appealtickets">
              <DashboardItem
                key="appeal"
                color="blue"
                header="Appeal"
                count={appeal.length}
              />
            </Link>

            <Link to="/newtickets">
              <DashboardItem
                key="new"
                color="red"
                header="New"
                count={newData.length}
              />
            </Link>

            <Link to="/pendingtickets">
              <DashboardItem
                key="pending"
                color="purple"
                header="Pending"
                count={pendingData.length}
              />
            </Link>
          </div>
        </Card>

        <div className="dashboard-body">
          <Card className="card-shortcut">
            <div className="dashboard-body-div">
              <div className="dashboard-body_header">
                <h3>Queued Complaints</h3>
                <div id="queued-viewall" onClick={pendingTicketHandler}>
                  View All
                </div>
              </div>

              <div className="ticket-list-container dashboard-table-container">
                <table id="ticket-table">
                  <tbody>
                    <TicketTableHeader />
                    {pendingData.slice(pendingData.length-2, pendingData.length).map((ticket) => {
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
              </div>

              <div className="dashboard-body_header">
                <h3>On Hold Complaints</h3>
                <div id="onhold-viewall" onClick={onholdTicketHandler}>
                  View All
                </div>
              </div>
              <div className="ticket-list-container dashboard-table-container">
                <table id="ticket-table">
                  <tbody>
                    <TicketTableHeader />
                    {acknowledgedData.slice(acknowledgedData.length-2, acknowledgedData.length).map((ticket) => {
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
              </div>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Triage;
