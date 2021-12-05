import React from "react";
import { Link } from "react-router-dom";

import "./TriageNav.css";

const TriageNav = () => {

  return (
    <React.Fragment>
      <div className="sidenav">
        <div className="sidenav-container">
          <Link to="/triage">
            <div>Home</div>
          </Link>
        </div>

        <div className="sidenav-container">
          <Link to="/dashboard">
            <div>Dashboard</div>
          </Link>
        </div>

        <div className="sidenav-container">
          <Link to="/complainttickets">
            <div>Complaint</div>
          </Link>
        </div>

        <div className="sidenav-container">
          <Link to="/feedbacktickets">
            <div>Feedback</div>
          </Link>
        </div>

        <div className="sidenav-container">
          <Link to="/appealtickets">
            <div>Appeal</div>
          </Link>
        </div>

        <div className="sidenav-container">
          <Link to="/alltickets">
            <div>All Tickets</div>
          </Link>
        </div>

        <div className="sidenav-container">
          <Link to="/closedtickets">
            <div>Archived Tickets</div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TriageNav;
