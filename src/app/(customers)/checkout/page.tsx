"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
function CheckoutPage() {
  const orderInfo = useAppSelector((state) => state.order);
  const cartInfo = useAppSelector((state) => state.cart);
  const location = orderInfo.locationList.find(
    (location) => location.id == orderInfo.value.locationId
  );
  const timeslot = orderInfo.timeslotList.find(
    (timeslot) => timeslot.id == orderInfo.value.timeslotId
  );
  const userInfo = useAppSelector((state) => state.user.value);

  async function fetchApi(url: string) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  const [pickupspotList, setPickupspotList] = useState<
    {
      id: string;
      fullname: string;
      address: string;
      locationId: string;
      status: number;
    }[]
  >([]);

  const [selectedPickupspotId, setSelectedPickupspotId] = useState("");

  const handlePickspotSelect = (e: SelectChangeEvent) => {
    setSelectedPickupspotId(e.target.value);
  };

  const [phoneNumber, setPhoneNumber] = useState(
    userInfo.phoneNumber == "0123456789" ? "" : userInfo.phoneNumber
  );
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    var number = e.target.value;
    if (number === "0123456789") number = "";
    setPhoneNumber(number);

    if (/\D/.test(number)) {
      setIsPhoneNumberValid(false);
      setErrorMessage("phone number not contain characters");
      return;
    }

    if (!/^0\d{9,10}$/.test(number)) {
      setIsPhoneNumberValid(false);
      setErrorMessage("phone number is not valid");
      return;
    }

    setIsPhoneNumberValid(true);
    setErrorMessage("");
  };

  const [deliveryNote, setDeliveryNote] = useState("");

  const handleChangeDeliveryNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryNote(e.target.value);
  };

  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);

  React.useEffect(() => {
    if (pickupspotList.length <= 0 && location) {
      fetchApi("http://coccan-api.somee.com/api/pickupspots").then(
        (response: {
          data: {
            id: string;
            fullname: string;
            address: string;
            locationId: string;
            status: number;
          }[];
          status: string;
          title: string;
          errorMessages: [];
        }) => {
          var pickupspotList = response.data.filter(
            (item) => item.locationId == location.id
          );
          // if (pickupspotList.length > 0)
          //   setSelectedPickupspotId(pickupspotList[0].id);
          setPickupspotList(pickupspotList);
        }
      );
    }
    var total = 0;
    const uniqueStore = new Set();

    cartInfo.value.map((item) => {
      //get price from api
      const { storeName } = item;
      uniqueStore.add(storeName);
      total += item.price * item.quantity;
    });

    const numberOfStore = uniqueStore.size;
    var delivery = 0;
    if (numberOfStore <= 2) {
      delivery = 4000;
    } else delivery = 4000 + (numberOfStore - 2) * 4000;

    //service fee = platform + product value
    var service = 2000 + total * 0.15;

    setDeliveryFee(delivery);
    setServiceFee(service);
    setCartTotalAmount(total);
  }, []);

  return (
    <>
      {!userInfo.isAuth && <h2>You must login to checkout</h2>}
      {userInfo.isAuth && (
        <div>
          <div className="order-information-section">
            <Typography variant="h5">Order Information</Typography>
            <div>
              <span>Total amount:</span>
              <span>{cartTotalAmount}</span>
            </div>
            <div>
              <span>Delivery Fee:</span>
              <span>{deliveryFee}</span>
            </div>
            <div>
              <span> Service Fee:</span>
              <span>{serviceFee}</span>
            </div>
            <div>
              <span> Total:</span>
              <span>{cartTotalAmount + deliveryFee + serviceFee}</span>
            </div>
          </div>
          <div className="delivery-info-section">
            <Typography variant="h5">Delivery Information</Typography>
            <div>
              <span>Location:</span>
              <span>{location?.name}</span>
            </div>
            <div>
              <span>Timeslot:</span>
              <span>{timeslot?.startTime + "-" + timeslot?.endTime}</span>
            </div>
            <div>
              <span>
                <FormControl>
                  <InputLabel>Pickupspot</InputLabel>
                  <Select
                    className="selector"
                    value={selectedPickupspotId}
                    label="Pickupspot"
                    onChange={handlePickspotSelect}
                    required
                  >
                    {pickupspotList.length > 0 &&
                      pickupspotList.map((spot) => (
                        <MenuItem
                          key={spot.id}
                          value={spot.id}
                          disabled={spot.status === 0}
                        >
                          {spot.fullname}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </span>
            </div>
            <div>
              <span>
                <TextField
                  label="Delivery Notes"
                  value={deliveryNote}
                  onChange={handleChangeDeliveryNote}
                ></TextField>
              </span>
            </div>
          </div>
          <div className="contact-into-section">
            <Typography variant="h5">Contact Information</Typography>

            <div>
              <span>Name: </span>
              <span>{userInfo.displayName}</span>
            </div>
            <div>
              <span>Phone number: </span>
              <TextField
                error={!isPhoneNumberValid}
                label="Phone number"
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
                helperText={isPhoneNumberValid ? "" : errorMessage}
                required
              ></TextField>
            </div>
          </div>
          <Button
            variant="outlined"
            size="large"
            disabled={phoneNumber.length == 0 || !isPhoneNumberValid}
          >
            PLACE ORDER
          </Button>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
