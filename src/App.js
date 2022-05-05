import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import LoginPublic from "./Components/LoginPublic";
import Login from "./Components/Login";
import Selection from "./Components/Selection";
import Complaint from "./Components/Complaint";
import Feedback from "./Components/Feedback";
import Appeal from "./Components/Appeal";
import TicketStatus from "./Components/TicketStatus";
import TicketNumber from "./Components/TicketNumber";

import Triage from "./Components/Triage/Triage";
import ViewTickets from "./Components/ViewTickets";
import DataDashboard from "./Components/DataDashboard";

import ComplaintTicket from "./Components/Triage/ComplaintTicket";
import FeedbackTicket from "./Components/Triage/FeedbackTicket";
import AppealTicket from "./Components/Triage/AppealTicket";
import NewTicket from "./Components/Triage/NewTicket";
import AllTicket from "./Components/Triage/AllTicket";
import PendingTicket from "./Components/Triage/PendingTicket";
import ClosedTicket from "./Components/Triage/ClosedTicket";

import MainNavigation from "./Shared/Navigation/MainNavigation";

import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  routes = (
    <Switch>
      <Route path="/" exact>
        <LoginPublic />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/selection" exact>
        <Selection />
      </Route>
      <Route path="/complaint" exact>
        <Complaint />
      </Route>
      <Route path="/feedback" exact>
        <Feedback />
      </Route>
      <Route path="/appeal" exact>
        <Appeal />
      </Route>
      <Route path="/ticket-status" exact>
        <TicketStatus />
      </Route>
      <Route path="/ticketnumber" exact>
        <TicketNumber />
      </Route>
      <Route path="/triage" exact>
        <Triage />
      </Route>
      <Route path="/viewtickets" exact>
        <ViewTickets />
      </Route>
      <Route path="/dashboard" exact>
        <DataDashboard />
      </Route>

      <Route path="/complainttickets" exact>
        <ComplaintTicket />
      </Route>
      <Route path="/feedbacktickets" exact>
        <FeedbackTicket />
      </Route>
      <Route path="/appealtickets" exact>
        <AppealTicket />
      </Route>
      <Route path="/newtickets" exact>
        <NewTicket />
      </Route>

      <Route path="/alltickets" exact>
        <AllTicket />
      </Route>
      <Route path="/pendingtickets" exact>
        <PendingTicket />
      </Route>
      <Route path="/closedtickets" exact>
        <ClosedTicket />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation username={userId} />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
