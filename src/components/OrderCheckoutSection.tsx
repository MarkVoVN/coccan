import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import { Button, Typography } from "@mui/material";
import React from "react";

function OrderCheckoutSection() {
  const orderInfo = useAppSelector((state) => state.order.value);
  const userInfo = useAppSelector((state) => state.user.value);
  return (
    <div className="w-full flex flex-row justify-center mt-12">
      <div className="order-checkout-container w-[80vw] ">
        <div className="info-container flex flex-row justify-evenly">
          <div className="order-info-container w-fit">
            <Typography variant="h5">Order Information</Typography>
            <div className="w-full flex flex-row mt-4">
              <div className="w-1/2 py-4">Location:</div>
              <div className="w-1/2 py-4">{orderInfo.locationId}</div>
            </div>
            <div className="w-full flex flex-row">
              <div className="w-1/2 py-4">Timeslot:</div>
              <div className="w-1/2 py-4">{orderInfo.sessionId}</div>
            </div>
          </div>
          <div className="recipient-info-contaier w-fit">
            <Typography variant="h5">Delivery Information</Typography>
            <div className="w-full flex flex-row  mt-4">
              <div className="w-1/2 py-4">Name:</div>
              <div className="w-1/2 py-4">{userInfo.displayName}</div>
            </div>
            <div className="w-full flex flex-row">
              <div className="w-1/2 py-4">Phone number:</div>
              <div className="w-1/2 py-4">0912345678</div>
            </div>
          </div>
        </div>
        <div className="order-checkout-btn-container flex flex-row-reverse pr-32 mt-12 mb-32">
          <Button variant="outlined" size="large">
            CHECK OUT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderCheckoutSection;
