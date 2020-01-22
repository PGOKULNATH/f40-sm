import React from "react";

export default function Loading() {
  return (
    <div className="container">
      <center>
        <span className="fa fa-spinner fa-pulse fa-3x fa-fw m-accent" />
        <p className="m-2">Loading....</p>
      </center>
    </div>
  );
}
