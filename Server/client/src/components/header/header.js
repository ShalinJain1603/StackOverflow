import { React, useEffect, useState } from "react";
import { Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import Auth from "../../auth";
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
    <div id="navbar_id">
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        className={classes.offcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>IITG StackOverflow</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/" onClick={handleClose} className={classes.linkDesign}>
            Home
          </Link>
          <br />
          <Link
            to="/questions"
            onClick={handleClose}
            className={classes.linkDesign}
          >
            All Questions
          </Link>
          <br />
          <Link
            to="/questions/new"
            onClick={handleClose}
            className={classes.linkDesign}
          >
            New Question
          </Link>
          <br />
          <Link to="/user" onClick={handleClose} className={classes.linkDesign}>
            Profile
          </Link>
          <br />
          <Link to="/tags" onClick={handleClose} className={classes.linkDesign}>
            Tags
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar dark expand="md" className="bg-dark ">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />

          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom`}>Sidebar</Tooltip>}
          >
            <span onClick={handleShow} className={classes.sidebarToggle}>
              <i class="fa fa-align-justify fa-lg text-light"></i>
            </span>
          </OverlayTrigger>

          <NavbarBrand href="/">
            <img src="/Images/Logo/Logo.png" className={classes.logo} />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar className="me-auto">
              <NavItem>
                <NavLink className="nav-link" to="/">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/questions">
                  <i class="fa fa-question-circle fa-lg"></i> All Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/questions/new">
                  <i class="fa fa-plus-circle fa-lg text-light"></i> New
                  Question
                </NavLink>
              </NavItem>
              <NavItem></NavItem>
            </Nav>
            <NavLink
              className="nav-link text-white"
              to="/user"
              hidden={!isloggedIn}
            >
              <i class="fa fa-user fa-lg"></i> Profile
            </NavLink>
            <button
              onClick={login}
              id="login"
              className="btn btn-link"
              hidden={isloggedIn}
            >
              <a
                href="http://localhost:4000/auth/outlook"
                className="text-white"
              >
                SignUp / Login
              </a>
            </button>
            <br />
            <button
              onClick={logout}
              className="btn btn-link"
              hidden={!isloggedIn}
            >
              <a href="http://localhost:4000/logout" className="text-white">
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </button>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
