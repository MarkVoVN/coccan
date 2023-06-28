"use client";

import {
  updateLocationId,
  updateTimeslotId,
} from "@/app/GlobalRedux/Features/orderSlice";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import "../style/SessionSelectorSection.scss";
import React, { useState } from "react";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import {
  setTimeslotList,
  setLocationList,
  updateSessionId,
  updateMenuId,
} from "@/app/GlobalRedux/Features/orderSlice";
import { resetCart } from "@/app/GlobalRedux/Features/cartSlice";

function SessionSeletorSection() {
  const sessionList = [
    { id: "-1", title: " " },
    { id: "0", title: "9:15AM" },
    { id: "1", title: "11:45AM" },
    { id: "2", title: "2:45PM" },
    { id: "3", title: "5:15PM" },
  ];
  const cartInfo = useAppSelector((state) => state.cart);
  const orderInfo = useAppSelector((state) => state.order.value);
  const timeslotList = useAppSelector((state) => state.order.timeslotList);
  const locationList = useAppSelector((state) => state.order.locationList);

  const timeslotId = useAppSelector((state) => state.order.value.timeslotId);

  const locationId = useAppSelector((state) => state.order.value.locationId);

  const dispatch = useDispatch();
  const handleLocationIdChange = (e: SelectChangeEvent) => {
    if (cartInfo.countOfItemQuantity > 0) {
      setSessionChangeConfirmationDialogOpen(true);
      setDesiredLocationId(e.target.value);
    } else {
      dispatch(updateLocationId(e.target.value));
    }
  };

  const handleTimeslotIdChange = (e: SelectChangeEvent) => {
    if (cartInfo.countOfItemQuantity > 0) {
      setSessionChangeConfirmationDialogOpen(true);
      setDesiredTimeslotId(e.target.value);
    } else {
      dispatch(updateTimeslotId(e.target.value));
    }
  };

  const [
    SessionChangeConfirmationDialogOpen,
    setSessionChangeConfirmationDialogOpen,
  ] = useState(false);

  const [DesiredLocationId, setDesiredLocationId] = useState("");
  const [DesiredTimeslotId, setDesiredTimeslotId] = useState("");

  const [SessionChangeConfirm, setSessionChangeConfirm] = useState(false);

  const handleSessionChangeConfirmationDialogClose = () => {
    setSessionChangeConfirmationDialogOpen(false);
  };

  const handleSessionChangeConfirmationDialogOK = () => {
    setSessionChangeConfirmationDialogOpen(false);
    setSessionChangeConfirm(true);
  };

  React.useEffect(() => {
    if (SessionChangeConfirm) {
      if (DesiredLocationId.length > 0) {
        dispatch(updateLocationId(DesiredLocationId));
        dispatch(resetCart());
        setDesiredLocationId("");
        setSessionChangeConfirm(false);
      }
      if (DesiredTimeslotId.length > 0) {
        dispatch(updateTimeslotId(DesiredTimeslotId));
        dispatch(resetCart());
        setDesiredTimeslotId("");
        setSessionChangeConfirm(false);
      }
    }
  }, [SessionChangeConfirm]);

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

    if (orderInfo.isSetByUser) {
      fetchApi("https://coccan-api.somee.com/api/sessions").then(
        (response: {
          data: {
            id: string;
            date: string;
            timeSlotId: string;
            locationId: string;
            menuId: string;
          }[];
          status: string;
          title: string;
          errorMessages: [];
        }) => {
          var item = response.data.find(
            (item) =>
              item.timeSlotId === timeslotId && item.locationId === locationId
          );
          if (item) {
            dispatch(updateSessionId(item.id));
            dispatch(updateMenuId(item.menuId));
          }
        }
      );
    }
  }, [timeslotList, locationList, orderInfo]);

  return (
    <>
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
            <InputLabel>Timeslot</InputLabel>
            <Select
              className="selector"
              value={timeslotId}
              label="Timeslot"
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
      {/* Dialog box for confirming session change when there is conflict between orderInfo and cartInfo */}
      <Dialog
        open={SessionChangeConfirmationDialogOpen}
        onClose={handleSessionChangeConfirmationDialogClose}
      >
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Typography variant="h5" fontWeight="500">
            You are changing your timeslot or location
          </Typography>
          <Typography variant="subtitle2" color="gray">
            Changing your timeslot or location will affect the available dishes
            .Therefore, your cart will be reset. Continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSessionChangeConfirmationDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSessionChangeConfirmationDialogOK}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SessionSeletorSection;
