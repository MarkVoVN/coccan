"use client";

import {
  useAppSelector,
  updatePreferedPhoneNumber,
} from "@/app/GlobalRedux/Features/userSlice";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetCart } from "@/app/GlobalRedux/Features/cartSlice";
import axios from "axios";
import "./checkoutPage.scss";
import theme from "../../theme";
import useStorage from "@/hooks/useStorage";

type Location = {
  id: string;
  name: string;
  address: string;
};

type PopupNotification = {
  severity: AlertColor;
  title: string;
  message: string;
};

function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storage = useStorage();

  const orderInfo = useAppSelector((state) => state.order);
  const cartInfo = useAppSelector((state) => state.cart);

  const [location, setLocation] = useState<Location>();
  const timeslot = orderInfo.timeslotList.find(
    (timeslot) => timeslot.id == orderInfo.value.timeslotId
  );
  const userInfo = useAppSelector((state) => state.user.value);

  const [pickupspotList, setPickupspotList] = useState<
    {
      id: string;
      fullname: string;
      address: string;
      locationId: string;
      status: number;
    }[]
  >([]);

  const [selectedPickupspotId, setSelectedPickupspotId] = useState<string>("");
  const [Orderable, setOrderable] = useState(false);
  const handlePickspotSelect = (e: SelectChangeEvent) => {
    setSelectedPickupspotId(e.target.value);
  };

  useEffect(() => {
    if (selectedPickupspotId == null) {
      setOrderable(false);
      return;
    }
    if (selectedPickupspotId.length == 0) {
      setOrderable(false);
      return;
    }
    setOrderable(true);
  }, [selectedPickupspotId]);

  const [phoneNumber, setPhoneNumber] = useState(
    userInfo.phoneNumber == "0123456789" ? "" : userInfo.phoneNumber
  );
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [updatePhoneNumberDialogOpen, setUpdatePhoneNumberDialogOpen] =
    useState(false);
  // const [isUpdatingPhoneNumberError, setIsUpdatingPhoneNumberError] =
  //   useState(false);
  const [isUpdatePhoneNumberLoading, setIsUpdatePhoneNumberLoading] =
    useState(false);
  // const [isUpdatePhoneNumberDone, setIsUpdatePhoneNumberDone] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    var number = e.target.value;
    if (number === "0123456789") number = "";
    setPhoneNumber(number);

    if (/\D/.test(number)) {
      setIsPhoneNumberValid(false);
      setErrorMessage("Phone number not contain characters");
      return;
    }

    if (!/^0\d{9,10}$/.test(number)) {
      setIsPhoneNumberValid(false);
      setErrorMessage("Phone number is not valid");
      return;
    }

    setIsPhoneNumberValid(true);
    setErrorMessage("");
  };

  const updatePhoneNumber = () => {
    if (!isPhoneNumberValid) return;
    setIsUpdatePhoneNumberLoading(true);
    const url = `https://coccan-api.somee.com/api/customers/${userInfo.customerId}`;
    axios
      .put(url, {
        fullname: userInfo.displayName,
        image: userInfo.photoURL,
        email: userInfo.email,
        phone: phoneNumber,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok.");
        }
        return response;
      })
      .then((response) => {
        storage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            phoneNumber: response.data.phoneNumber,
          })
        );
        dispatch(updatePreferedPhoneNumber(response.data.phone));
        setIsUpdatePhoneNumberLoading(false);
        //setIsUpdatingPhoneNumberError(false);
        displayAlert({
          severity: "success",
          title: "Success",
          message: "Your preffered phone number has been updated.",
        });
      })
      .catch((error) => {
        // Handle error
        setIsUpdatePhoneNumberLoading(false);
        //setIsUpdatingPhoneNumberError(true);
        console.error("Error:", error);
        displayAlert({
          severity: "error",
          title: "An error occured",
          message:
            "Update phone number failed. You can try again by going to your profile.",
        });
      })
      .finally(() => {
        handleUpdatePhoneNumberDialogClose();
      });
  };

  const handleUpdatePhoneNumberDialog = () => {
    //prompt update only if phone number has not bene set
    if (!isPhoneNumberValid || userInfo.phoneNumber !== "0123456789") {
      //setIsUpdatePhoneNumberDone(true);
      handleConfirmDialogOpen();
      console.log("Phone number dont need update");
      console.log(isPhoneNumberValid);
      console.log(userInfo.phoneNumber);
      return;
    }
    setUpdatePhoneNumberDialogOpen(true); //open update phone number dialog
  };

  const handleUpdatePhoneNumberDialogClose = () => {
    setUpdatePhoneNumberDialogOpen(false); //close update phone number dialog
    //setIsUpdatePhoneNumberDone(true);
    handleConfirmDialogOpen();
  };

  const [deliveryNote, setDeliveryNote] = useState("");

  const handleChangeDeliveryNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryNote(e.target.value);
  };

  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);

  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [isRedirectingToHome, setIsRedirectingToHome] = useState(false);

  //fetch location info from order info
  React.useEffect(() => {
    if (!orderInfo) return;
    if (location) return;
    axios
      .get(
        `https://coccan-api.somee.com/api/locations/${orderInfo.value.locationId}`
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        setLocation(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [orderInfo]);

  //fetch pickupspot list based on location and calculate fees
  React.useEffect(() => {
    if (pickupspotList.length <= 0 && location) {
      axios
        .get("http://coccan-api.somee.com/api/pickupspots")
        .then((response) => {
          var pickupspotList = response.data.filter(
            (item: {
              id: string;
              fullname: string;
              address: string;
              locationId: string;
              status: number;
            }) => item.locationId == location.id
          );
          setPickupspotList(pickupspotList);
        });
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
    var service = 2000 + total * 0.005;

    setDeliveryFee(delivery);
    setServiceFee(service);
    setCartTotalAmount(total);
  }, [location]);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const getDateTimeToLocalISOstring = () => {
    const date = new Date();
    const isoString = new Date(date.toLocaleString());
    const adjustedDate = new Date(
      isoString.getTime() + 420 * 60000
    ).toISOString();
    return adjustedDate;
  };

  const handlePlacingOrder = () => {
    setIsOrderCreating(true);

    axios
      .post("http://coccan-api.somee.com/api/orders", {
        orderTime: getDateTimeToLocalISOstring(),
        serviceFee: serviceFee,
        totalPrice: cartTotalAmount + deliveryFee + serviceFee,
        deliveryFee: deliveryFee,
        cartTotalAmount: cartTotalAmount,
        note: deliveryNote,
        phone: phoneNumber,
        customerId: userInfo.customerId,
        sessionId: orderInfo.value.sessionId,
        pickUpSpotId: selectedPickupspotId,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok.");
        }
        return response.data;
      })
      .then((responseData) => {
        // Handle successful response
        console.log(responseData);
        const orderId = responseData.id;
        createOrderDetails(orderId);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  function createOrderDetail(
    {
      menudetailId,
      quantity,
      price,
    }: { menudetailId: string; quantity: number; price: number },
    orderId: string
  ) {
    const url = "https://coccan-api.somee.com/api/orderdetails";

    return axios
      .post(url, {
        quantity: quantity,
        menuDetailId: menudetailId,
        orderId: orderId,
        singlePrice: price,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  async function createOrderDetails(orderId: string) {
    for (const product of cartInfo.value) {
      let retryCount = 0;
      let success = false;

      while (!success && retryCount < 4) {
        // Retry up to 3 times
        try {
          await createOrderDetail(product, orderId);
          success = true;
        } catch (error) {
          console.error(
            `Request failed for product ${product.menudetailId}. Retrying...`
          );
          retryCount++;
        }
      }

      if (!success) {
        console.error(
          `Failed to process product ${product.menudetailId} after 4 retries.`
        );
      }
    }

    console.log("Done");
    setIsOrderCreating(false);
    setConfirmDialogOpen(false);
    //handleUpdatePhoneNumberDialog();
    //TODO: pop up thank you for ordering, redirect to homepage or order page
    dispatch(resetCart());
    //setIsOrderCreatedSuccessfully(true);
    displayAlert({
      severity: "success",
      title: "Order created successfully",
      message: "Thank you for ordering",
    });
    redirectToHome();
  }

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const handleSnackBarOpen = () => {
    setIsSnackBarOpen(true);
  };

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const [alertContent, setAlertContent] = useState<PopupNotification>();

  const displayAlert = (alert: PopupNotification) => {
    if (!alert) return;
    setAlertContent(alert);
    handleSnackBarOpen();
  };

  const redirectToHome = () => {
    setIsRedirectingToHome(true);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <>
      {!userInfo.isAuth && <h2>You must login to checkout</h2>}
      {userInfo.isAuth && isRedirectingToHome && (
        <ThemeProvider theme={theme}>
          <div className="animation-container">
            <div className="bounce-loading">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <Typography className="redirect-text" variant="h4">
              Redirecting to Home...
            </Typography>
          </div>
        </ThemeProvider>
      )}
      {userInfo.isAuth && !isRedirectingToHome && (
        <ThemeProvider theme={theme}>
          <div className="container">
            <Box
              className="content-container"
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box
                className="info-container"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                  padding: "32px",
                }}
              >
                <Box
                  className="contact-info-section"
                  sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <Typography variant="h5" fontWeight="600">
                    Contact Information
                  </Typography>
                  <div>
                    <Typography variant="h6">{userInfo.displayName}</Typography>
                  </div>
                  <div>
                    <TextField
                      error={!isPhoneNumberValid}
                      label="Phone number"
                      value={phoneNumber}
                      onChange={handleChangePhoneNumber}
                      helperText={isPhoneNumberValid ? "" : errorMessage}
                      sx={{ width: "100%" }}
                      required
                    ></TextField>
                  </div>
                </Box>
                <Box
                  className="delivery-info-section"
                  sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <Typography variant="h5" fontWeight="600">
                    Delivery Information
                  </Typography>
                  <div>
                    <Typography variant="subtitle1">Location:</Typography>
                    <Typography variant="h6">{location?.name}</Typography>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="subtitle1">Time slot:</Typography>
                      <Typography variant="h6">
                        {timeslot?.startTime + " - " + timeslot?.endTime}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Pickup spot</InputLabel>
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
                    </Box>
                  </Box>
                  <div>
                    <TextField
                      label="Delivery Notes"
                      value={deliveryNote}
                      onChange={handleChangeDeliveryNote}
                      sx={{ width: "100%" }}
                    ></TextField>
                  </div>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  disabled={
                    phoneNumber.length == 0 || !isPhoneNumberValid || !Orderable
                  }
                  onClick={handleUpdatePhoneNumberDialog}
                  sx={{ width: "100%" }}
                >
                  PLACE ORDER
                </Button>
              </Box>
              <Box
                className="order-information-section"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <Typography variant="h5" fontWeight="600">
                  Order Information
                </Typography>
                <div>
                  <Typography variant="subtitle1">You have to pay</Typography>
                  <Typography variant="h2">
                    {(
                      cartTotalAmount +
                      deliveryFee +
                      serviceFee
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1">Total amount:</Typography>
                  <Typography variant="h5">
                    {cartTotalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1">Delivery Fee:</Typography>
                  <Typography variant="h5">
                    {deliveryFee.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1"> Service Fee:</Typography>
                  <Typography variant="h5">
                    {serviceFee.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <Typography variant="h5" fontWeight="500">
                  Confirm Order Information
                </Typography>
                <Typography variant="subtitle2" color="gray">
                  Please make sure your contact information is correct
                </Typography>
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  loading={isOrderCreating}
                  loadingPosition="start"
                  variant="contained"
                  color="primary"
                  onClick={handlePlacingOrder}
                >
                  Order
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleConfirmDialogClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={updatePhoneNumberDialogOpen}
              onClose={handleUpdatePhoneNumberDialogClose}
            >
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <Typography variant="h5" fontWeight="500">
                  Set prefered phone number?
                </Typography>
                <Typography variant="subtitle2" color="gray">
                  {userInfo.phoneNumber === "0123456789"
                    ? `You have not set your prefered phone number yet. Do you want to set it to ${phoneNumber}?`
                    : `Do you want to update your preffered phone number to ${phoneNumber}`}
                </Typography>
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  loading={isUpdatePhoneNumberLoading}
                  variant="contained"
                  color="primary"
                  onClick={updatePhoneNumber}
                >
                  Yes
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleUpdatePhoneNumberDialogClose}
                >
                  {userInfo.phoneNumber === "0123456789"
                    ? `Maybe next time`
                    : "No"}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </ThemeProvider>
      )}
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={alertContent ? alertContent.severity : "info"}
          sx={{ width: "100%" }}
        >
          <AlertTitle>
            {alertContent ? alertContent.title : "alert title"}
          </AlertTitle>
          {alertContent ? alertContent.message : "alert message"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CheckoutPage;
