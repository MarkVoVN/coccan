import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  let navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(-1)} sx={{ color: "white" }}>
        Back
      </Button>
    </>
  );
};
