import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import Auth from "../auth";

const Header = (props) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isloggedIn, setLogIn] = useState(false);
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
      <Navbar dark expand="md" className="bg-dark">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
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
            </Nav>
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
