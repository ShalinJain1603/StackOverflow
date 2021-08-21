import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="footer mt-auto">
        <div className="container-fluid bg-dark text-white">
          <div className="row ">
            <div className="col-auto">
              <p className="mx-5">© Copyright 2021 IITG StackOverflow</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
