import React from "react";
import running from "../assets/icons/running.gif";
import { Typography } from "@material-ui/core";

export default function Loading() {
  return (
    <div
      height="100vh"
      style={{
        verticalAlign: "middle",
        display: "block",
        position: "absolute",
        top: "47%",
        left: "47%"
      }}
    >
      <img
        src={running}
        style={{ opacity: 0.5, width: "4rem", height: "4rem" }}
      />
      <Typography style={{ opacity: 0.5 }}>Loading...</Typography>
    </div>
  );
}
