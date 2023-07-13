"use client";

import {
  updatePreferedLocation,
  useAppSelector,
} from "@/app/GlobalRedux/Features/userSlice";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useDispatch } from "react-redux";

function PreferedLocationSelector() {
  //TODO: Get list of locations from Redux populate Menu
  const userPreferedLocationId = useAppSelector(
    (state) => state.user.value.preferedLocationId
  );
  const dispatch = useDispatch();
  const handleChange = (e: SelectChangeEvent) => {
    dispatch(updatePreferedLocation(e.target.value));
  };
  return (
    <div className="selectors-container">
      <div>
        <Select
          className="selector"
          value={userPreferedLocationId}
          label="Location"
          onChange={handleChange}
        >
          <MenuItem value={"-1"} disabled>
            Set location
          </MenuItem>
          <MenuItem value={"FPT-Q9"}>FPT Q9</MenuItem>
          <MenuItem value={"NVH"}>NVH</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default PreferedLocationSelector;
