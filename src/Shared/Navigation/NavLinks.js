import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const [studentName, setStudentName] = useState();
  const [triageName, setTriageName] = useState();
  const [staffName, setStaffName] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (auth.isLoggedIn) {
      async function fetchData() {
        if (typeof auth.userId === "string") {
          let response;
          let identity = auth.userId.charAt(0);
          if (identity === "3") {
            response = await axios.post("/student", {
              studentId: auth.userId,
            });
            setStudentName(response.data.studentName);
            setTriageName(null);
            setStaffName(null);
          } else if (identity === "7") {
            response = await axios.post("/staff", {
              staffId: auth.userId,
            });
            setStaffName(response.data.staffName);
            setTriageName(null);
            setStudentName(null);
          } else {
            response = await axios.post("/staff", {
              staffId: auth.userId,
            });
            setTriageName(response.data.staffName);
            setStudentName(null);
            setStaffName(null);
          }
        }
      }
      fetchData();
    }
  }, [auth.userId, auth.isLoggedIn]);

  const logoutHandler = () => {
    auth.logout();
    history.push("/");
  };

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          {triageName && (
            <NavLink to="/triage" exact>
              Welcome, {triageName}
            </NavLink>
          )}
          {studentName && (
            <NavLink to="/selection" exact>
              Welcome, {studentName}
            </NavLink>
          )}
          {staffName && (
            <NavLink to="/selection" exact>
              Welcome, {staffName}
            </NavLink>
          )}
        </li>
      )}

      {auth.isLoggedIn && props.username && (
        <li>
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
