import React from "react";
import { Link } from "react-router-dom";
import Auth from "../auth";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login() {
    Auth.authenticate();
  }
  logout() {
    Auth.signout();
  }
  componentDidMount() {
    document.getElementById("login").click();
  }
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <br />
        <Link to="Public">Public</Link>
        <br />
        <Link to="protected">Protected</Link>
        <br />
        <button onClick={this.login} id="login">
          <a href="http://localhost:4000/auth/outlook">Login</a>
        </button>
        <br />
        <button onClick={this.logout}>
          <a href="http://localhost:4000/logout">Logout</a>
        </button>
      </div>
    );
  }
}
export default Header;
