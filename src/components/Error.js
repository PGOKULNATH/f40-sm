import React from "react";

export default function Error() {
  return (
    <center className="m-2 m-md-5 shadow-sm m-negative-bg-25">
      <span aria-label="error" role="img" style={{ fontSize: "50px" }}>
        &#128577;
      </span>
      <h1>ERROR</h1>
      <h2>Oops! Some error has occured</h2>
      <p>Refresh the page or logout and login again to continue</p>
      <a href="/">Go To Homepage</a>
    </center>
  );
}
