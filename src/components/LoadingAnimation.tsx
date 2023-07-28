import { Typography } from "@mui/material";
import React from "react";
import "../style/LoadingAnimation.scss";

function LoadingAnimation() {
  return (
    <div className="animation-container">
      <div className="bounce-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Typography className="redirect-text" variant="h4">
        Loading...
      </Typography>
    </div>
  );
}

export default LoadingAnimation;
