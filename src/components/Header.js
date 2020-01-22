import React, { Fragment } from "react";

const Header = () => {
  return (
    <Fragment>
      <div className="jumbotron m-primary-bg d-none d-md-block">
        <center>
          <div className="container">
            <img
              src="images.jpeg"
              alt="KCT"
              style={{ float: "left", width: "150px" }}
            />
            <img
              src="ece_logo.png"
              alt="ECE"
              style={{ float: "right", width: "150px" }}
            />
            <h1 className="m-text-light">
              Department of Electronics & Communication Engineering
            </h1>
            <h2 className="m-text-light">Kumaraguru College of Technology</h2>
          </div>
        </center>
      </div>
      <div className="jumbotron m-primary-bg d-block d-md-none">
        <center>
          <div className="container">
            <img
              src="images.jpeg"
              alt="KCT"
              style={{ float: "left", width: "50px" }}
            />
            <img
              src="ece_logo.png"
              alt="ECE"
              style={{ float: "right", width: "75px" }}
            />
            <br />
            <h1 className="m-text-light text-center">KCT ECE</h1>
            <h3 className="m-text-light text-center">
              Student Mentor Portal - Log in
            </h3>
          </div>
        </center>
      </div>
    </Fragment>
  );
};

export default Header;
