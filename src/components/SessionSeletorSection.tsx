"use client";

import {
  updateLocationId,
  updateTimeslotId,
} from "@/app/GlobalRedux/Features/orderSlice";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import "../style/SessionSelectorSection.scss";
import React from "react";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import {
  setTimeslotList,
  setLocationList,
} from "@/app/GlobalRedux/Features/orderSlice";

function SessionSeletorSection() {
  const sessionList = [
    { id: "-1", title: " " },
    { id: "0", title: "9:15AM" },
    { id: "1", title: "11:45AM" },
    { id: "2", title: "2:45PM" },
    { id: "3", title: "5:15PM" },
  ];

  const timeslotList = useAppSelector((state) => state.order.timeslotList);
  const locationList = useAppSelector((state) => state.order.locationList);

  const timeslotId = useAppSelector((state) => state.order.value.timeslotId);


  const locationId = useAppSelector((state) => state.order.value.locationId);

  const dispatch = useDispatch();
  const handleLocationIdChange = (e: SelectChangeEvent) => {
    dispatch(updateLocationId(e.target.value));
  };

  const handleTimeslotIdChange = (e: SelectChangeEvent) => {
    dispatch(updateTimeslotId(e.target.value));
  };

  async function fetchApi(url: string) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  React.useEffect(() => {
    //timeslot list is empty, fetch it
    if (timeslotList.length <= 0) {
      fetchApi("http://coccan-api.somee.com/api/timeslots").then(
        (response: { id: string; startTime: string; endTime: string }[]) => {
          dispatch(setTimeslotList(response));
        }
      );
    }

    //location list is empty, fetch it
    if (locationList.length <= 0) {
      fetchApi("http://coccan-api.somee.com/api/locations").then(
        (response: {
          data: {
            id: string;
            name: string;
            address: string;
            status: number;
          }[];
          status: string;
          title: string;
          errorMessages: [];
        }) => {
          dispatch(setLocationList(response.data));
        }
      );
    }
  }, [timeslotList, locationList]);

  return (
    <div className="selectors-container flex flex-row justify-center w-[100%]">
      <div>
        <FormControl>
          <InputLabel>Location</InputLabel>
          <Select
            className="selector"
            value={locationId}
            label="Location"
            onChange={handleLocationIdChange}
          >
            <MenuItem value={"-1"} disabled></MenuItem>
            {locationList.length > 0 &&
              locationList.map((location) => (
                <MenuItem
                  key={location.id}
                  value={location.id}
                  disabled={location.status === 0}
                >
                  {location.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Session</InputLabel>
          <Select
            className="selector"
            value={timeslotId}
            label="Session"
            onChange={handleTimeslotIdChange}
          >
            {timeslotList.length > 0 &&
              timeslotList.map((timeslot) => (
                <MenuItem key={timeslot.id} value={timeslot.id}>
                  {timeslot.startTime + " - " + timeslot.endTime}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default SessionSeletorSection;
