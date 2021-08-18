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
          <br />
          <Link to="/tags" onClick={handleClose}>
            Tags
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar dark expand="md" className="bg-dark ">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <span onClick={handleShow} className={classes.sidebarToggle}>
            <i class="fa fa-align-justify fa-lg text-light"></i>
          </span>
          <NavbarBrand href="/">StackOverflow</NavbarBrand>
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
              <a href="http://localhost:4000/auth/outlook">SignUp / Login</a>
            </button>
            <br />
            <button
              onClick={logout}
              className="btn btn-link"
              hidden={!isloggedIn}
            >
              <a href="http://localhost:4000/logout">
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
