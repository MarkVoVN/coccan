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
  setSessionUnavailable,
} from "@/app/GlobalRedux/Features/orderSlice";
import { resetCart } from "@/app/GlobalRedux/Features/cartSlice";
import axios from "axios";

function SessionSeletorSection() {
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

  const [isError, setIsError] = useState(false);

  React.useEffect(() => {
    //timeslot list is empty, fetch it

    if (timeslotList.length <= 0) {
      axios
        .get("https://coccan-api.somee.com/api/timeslots")
        .then((response) => {
          setIsError(false);
          dispatch(setTimeslotList(response.data));
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        });
    }

    //location list is empty, fetch it
    if (locationList.length <= 0) {
      axios
        .get("https://coccan-api.somee.com/api/locations")
        .then((response) => {
          setIsError(false);
          dispatch(setLocationList(response.data));
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        });
    }

    if (orderInfo.isSetByUser) {
      axios
        .get("https://coccan-api.somee.com/api/sessions")
        .then((response) => {
          var item = response.data.find(
            (item: {
              id: string;
              date: string;
              timeSlotId: string;
              locationId: string;
              menuId: string;
            }) =>
              item.timeSlotId === timeslotId && item.locationId === locationId
          );
          if (item) {
            dispatch(updateSessionId(item.id));
            dispatch(updateMenuId(item.menuId));
          } else {
            // TODO: unable to find session => App closed
            dispatch(setSessionUnavailable());
          }
        })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        });
    }
  }, [timeslotList, locationList, orderInfo, isError]);

  return (
    <>
      <div className="selectors-container flex flex-row justify-center w-[100%]">
        <div>
          <FormControl>
            <InputLabel>Location</InputLabel>
            <Select
              className="session-selector"
              value={locationId}
              label="Location"
              onChange={handleLocationIdChange}
            >
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
