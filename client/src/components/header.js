import { React, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import Auth from "../auth";
import classes from "./styles.module.css";

const Header = (props) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isloggedIn, setLogIn] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const login = () => {
    Auth.authenticate();
  };
  const logout = () => {
    Auth.signout();
  };
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  useEffect(() => {
    document.getElementById("login").click();
  });
  useEffect(() => {
    setTimeout(() => {
      const logger = Auth.getAuth();
      setLogIn(logger);
    }, 50);
  }, []);
  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        className={classes.offcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>StackOverflow</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/" onClick={handleClose}>
            Home
          </Link>
          <br />
          <Link to="/questions" onClick={handleClose}>
            All Questions
          </Link>
          <br />
          <Link to="/questions/new" onClick={handleClose}>
            New Question
          </Link>
          <br />
          <Link to="/user" onClick={handleClose}>
            Profile
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar dark expand="md" className="bg-dark ">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <span onClick={handleShow} className="me-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-menu-button-wide"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-13z" />
              <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
            </svg>
          </span>
          <NavbarBrand href="/">StackOverflow</NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar className="me-auto">
              <NavItem>
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/questions">
                  All Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/questions/new">
                  New Question
                </NavLink>
              </NavItem>
              <NavItem></NavItem>
            </Nav>
            <NavLink className="nav-link" to="/user" hidden={!isloggedIn}>
              Profile
            </NavLink>
            <button
              onClick={login}
              id="login"
              className="btn btn-link"
              hidden={isloggedIn}
            >
              <a href="http://localhost:4000/auth/outlook">SignUp / Login</a>
            </button>
            <br />
            <button
              onClick={logout}
              className="btn btn-link"
              hidden={!isloggedIn}
            >
              <a href="http://localhost:4000/logout">Logout</a>
            </button>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
