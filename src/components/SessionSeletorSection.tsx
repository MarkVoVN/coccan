"use client";

import useStorage from "@/hooks/useStorage";
import { Box, Select, MenuItem, SelectChangeEvent, Menu } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

function SessionSeletorSection() {
  const sessionList = [
    { id: "-1", title: "Set session" },
    { id: "0", title: "9:15AM" },
    { id: "1", title: "11:45AM" },
    { id: "2", title: "2:45PM" },
    { id: "3", title: "5:15PM" },
  ];

  const { getItem, setItem, removeItem } = useStorage();
  const defaultOrderInfo = getItem("orderInfo");
  const defaultSessionId: string = defaultOrderInfo
    ? JSON.parse(defaultOrderInfo).sessionId
    : "-1";
  const defaultLocationId: string = defaultOrderInfo
    ? JSON.parse(defaultOrderInfo).locationId
    : "None";
  const [selectedSessionId, setSelectedSessionId] =
    useState<string>(defaultSessionId);

  const handleSessionChange = (e: SelectChangeEvent) => {
    setSelectedSessionId(e.target.value);
  };

  const [location, setLocation] = useState<string>(defaultLocationId);

  const handleLocationChange = (e: SelectChangeEvent) => {
    setLocation(e.target.value);
  };

  useEffect(() => {
    if (location != "None" && selectedSessionId != "-1") {
      let orderInfo: {
        locationId: string;
        sessionId: string;
      } = {
        locationId: location,
        sessionId: selectedSessionId,
      };
      setItem("orderInfo", JSON.stringify(orderInfo));
    }
  }, [selectedSessionId, location, setItem]);

  return (
    <div className="selectors-container flex flex-row justify-center w-[100%]">
      <div>
        <Select
          className="selector"
          value={location}
          label="Location"
          onChange={handleLocationChange}
        >
          <MenuItem value={"None"} disabled>
            Set location
          </MenuItem>
          <MenuItem value={"FPT-Q9"}>FPT Q9</MenuItem>
          <MenuItem value={"NVH"}>NVH</MenuItem>
        </Select>
        <Select
          className="selector"
          value={selectedSessionId}
          label="Session"
          onChange={handleSessionChange}
        >
          {sessionList.map((session) => (
            <MenuItem
              key={session.id}
              value={session.id}
              disabled={session.id == "-1"}
            >
              {session.title}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default SessionSeletorSection;
