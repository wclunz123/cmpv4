import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import MurdochLogo from "../../murdoch.jpeg";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isStudent, setIsStudent] = useState();

  useEffect(() => {
    if (typeof auth.userId === "string") {
      let identity = auth.userId.charAt(0);
      if (identity !== "8") setIsStudent(true);
      else setIsStudent(false);
    }
  }, [auth.userId]);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>

        {!auth.isLoggedIn && (
          <Link to="/">
            <img id="image-logo" src={MurdochLogo} alt="murdochlogo" />
          </Link>
        )}

        {auth.isLoggedIn && isStudent && (
          <Link to="/selection">
            <img id="image-logo" src={MurdochLogo} alt="murdochlogo" />
          </Link>
        )}

        {auth.isLoggedIn && !isStudent && (
          <Link to="/triage">
            <img id="image-logo" src={MurdochLogo} alt="murdochlogo" />
          </Link>
        )}

        <h1 className="main-navigation__title">
          {!auth.isLoggedIn && (
            <Link to="/">
              <span id="header-title-span">Complaint</span>Portal
            </Link>
          )}

          {auth.isLoggedIn && isStudent && (
            <Link to="/selection">
              <span id="header-title-span">Complaint</span>Portal
            </Link>
          )}

          {auth.isLoggedIn && !isStudent && (
            <Link to="/triage">
              <span id="header-title-span">Complaint</span>Portal
            </Link>
          )}
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks username={props.username} />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
