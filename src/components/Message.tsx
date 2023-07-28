import { Typography } from "@mui/material";
import React from "react";

function Message({ text }: { text: string }) {
  return (
    <div>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/coccan-b34bb.appspot.com/o/Computer%20troubleshooting-pana.svg?alt=media&token=cfe605c8-43ca-4e76-a801-bae2c6f6c85b"
        alt="error"
      ></img>
      <Typography variant="h5" textAlign={"center"}>
        {text ? text : "Error... Please refresh the page"}
      </Typography>
    </div>
  );
}

export default Message;
