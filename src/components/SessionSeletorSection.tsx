"use client";

import {
  updateLocationId,
  updateSessionId,
} from "@/app/GlobalRedux/Features/orderSlice";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useDispatch } from "react-redux";

function SessionSeletorSection() {
  const sessionList = [
    { id: "-1", title: "Set session" },
    { id: "0", title: "9:15AM" },
    { id: "1", title: "11:45AM" },
    { id: "2", title: "2:45PM" },
    { id: "3", title: "5:15PM" },
  ];

  // const { getItem, setItem, removeItem } = useStorage();
  // const defaultOrderInfo = getItem("orderInfo");

  const sessionId = useAppSelector((state) => state.order.value.sessionId);

  const locationId = useAppSelector((state) => state.order.value.locationId);

  // useEffect(() => {
  //   if (location != "None" && selectedSessionId != "-1") {
  //     let orderInfo: {
  //       locationId: string;
  //       sessionId: string;
  //     } = {
  //       locationId: location,
  //       sessionId: selectedSessionId,
  //     };
  //     setItem("orderInfo", JSON.stringify(orderInfo));
  //   }
  // }, [selectedSessionId, location, setItem]);
  const dispatch = useDispatch();
  const handleLocationIdChange = (e: SelectChangeEvent) => {
    dispatch(updateLocationId(e.target.value));
  };

  const handleSessionIdChange = (e: SelectChangeEvent) => {
    dispatch(updateSessionId(e.target.value));
  };

  return (
    <div className="selectors-container flex flex-row justify-center w-[100%]">
      <div>
        <Select
          className="selector"
          value={locationId}
          label="Location"
          onChange={handleLocationIdChange}
        >
          <MenuItem value={"-1"} disabled>
            Set location
          </MenuItem>
          <MenuItem value={"FPT-Q9"}>FPT Q9</MenuItem>
          <MenuItem value={"NVH"}>NVH</MenuItem>
        </Select>
        <Select
          className="selector"
          value={sessionId}
          label="Session"
          onChange={handleSessionIdChange}
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
