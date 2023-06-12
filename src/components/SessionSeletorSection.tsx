"use client";

import { Box, Select, MenuItem, SelectChangeEvent, Menu } from "@mui/material";
import React from "react";
import { useState } from "react";

function SessionSeletorSection() {
  const sessionList = [
    { id: "0", title: "9:15AM" },
    { id: "1", title: "11:45AM" },
    { id: "2", title: "2:45PM" },
    { id: "3", title: "5:15PM" },
  ];

  const [selectedSessionId, setSelectedSessionId] = useState("0");

  const handleSessionChange = (e: SelectChangeEvent) => {
    setSelectedSessionId(e.target.value);
  };

  const [location, setLocation] = useState("FPT Q9");

  const handleLocationChange = (e: SelectChangeEvent) => {
    setLocation(e.target.value);
  };

  return (
    <div className="selectors-container flex flex-row justify-center w-[100%]">
      <div>
        <Select
          className="selector"
          value={location}
          label="Location"
          onChange={handleLocationChange}
          autoWidth
        >
          <MenuItem value={"FPT Q9"}>FPT Q9</MenuItem>
          <MenuItem value={"NVH"}>NVH</MenuItem>
        </Select>
        <Select
          className="selector"
          value={selectedSessionId}
          label="Session"
          onChange={handleSessionChange}
          autoWidth
        >
          {sessionList.map((session) => (
            <MenuItem key={session.id} value={session.id}>
              {session.title}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default SessionSeletorSection;
