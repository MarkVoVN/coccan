"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  InputLabel,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./orderDetails.scss";

type Order = {
  id: string;
  orderTime: string;
  serviceFee: number;
  deliveryFee: number;
  cartTotalAmount: number;
  note: string;
  phone: string;
  totalPrice: number;
  customerId: string;
  sessionId: string;
  pickUpSpotId: string;
  pickUpSpotFullName: string;
  locationID: string;
  locationName: string;
  timeSlotID: string;
  timeSlotStart: string;
  timeSlotEnd: string;
  orderDetailCount: number;
  orderStatus: number;
};

type OrderDetail = {
  id: string;
  quantity: number;
  menuDetailId: string;
  menuDetail: MenuDetail | null;
  orderId: string;
};

type MenuDetail = {
  id: string;
  price: number;
  menuId: string;
  product: {
    id: string;
    name: string;
    image: string;
    storeId: string;
    category: {
      id: string;
      name: string;
      image: string;
    };
  };
};

function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const user = useAppSelector((state) => state.user.value);

  const [Order, setOrder] = useState<Order>();
  const [OrderDetailList, setOrderDetailList] = useState<OrderDetail[]>();

  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCancellable, setIsCancellable] = useState(true);
  const [btnMsg, setBtnMsg] = useState("Cancel");

  const handleCancel = () => {};

  useEffect(() => {
    if (!user.isAuth) return;
    const url = `https://coccan-api.somee.com/api/orders/${params.orderId}`;
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        console.log("Fetched order completed");
        if (response.data.customerId != user.customerId) {
          throw new Error("Unauthorized. Access denied");
        }
        setIsAuthorized(true);
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMessage(error.message);
        setIsFetchLoading(false);
      });
  }, [user.isAuth]);

  useEffect(() => {
    if (!user.isAuth) return;
    if (!Order) return;
    if (!isAuthorized) return;

    const params = {
      filter: JSON.stringify({
        orderId: Order.id,
      }),
    };
    const queryParams = new URLSearchParams(params);
    const url = `https://coccan-api.somee.com/api/orderdetails`;

    axios
      .get(url, { params: queryParams })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        console.log("Fetched Order Details");
        var list = response.data;
        axios
          .all(
            list.map((orderDetail: any) =>
              axios.get(
                `https://coccan-api.somee.com/api/menudetails/${orderDetail.menuDetailId}`
              )
            )
          )
          .then((responses: any) => {
            console.log("Fetched menudetails");
            var detailList: OrderDetail[] = [];

            for (var i = 0; i < responses.length; i++) {
              //console.log(responses[i].data);
              detailList.push({
                ...list[i],
                menuDetail: responses[i].data,
              });
            }
            console.log(detailList);
            setOrderDetailList(detailList);
            setIsFetchLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMessage(error.message);
        setIsFetchLoading(false);
      });
  }, [Order, isAuthorized]);

  return (
    <>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/history">
          History
        </Link>
        <Typography color="text.primary">Order details</Typography>
      </Breadcrumbs>
      {isFetchLoading && !isError && <h2> Loading...</h2>}

      {isError && <h2>An error occured. {errorMessage}</h2>}

      {!isFetchLoading &&
        !isError &&
        (!OrderDetailList || OrderDetailList.length == 0) && (
          <h2>Your order seem to be invalid</h2>
        )}

      {!isFetchLoading &&
        !isError &&
        OrderDetailList &&
        OrderDetailList.length > 0 && (
          <>
            <Box
              className="content-container"
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
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
                    <Typography variant="h6">{user.displayName}</Typography>
                  </div>
                  <div>
                    <TextField
                      label="Phone number"
                      value={Order?.phone}
                      read-only="true"
                      sx={{ width: "100%" }}
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
                    <Typography variant="h6">{Order?.locationName}</Typography>
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
                        {Order?.timeSlotStart + " - " + Order?.timeSlotEnd}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormControl sx={{ width: "100%" }}>
                        {/* <InputLabel>Pickup spot</InputLabel> */}
                        <TextField
                          label="Pickup spot"
                          value={Order?.pickUpSpotFullName}
                          read-only="true"
                          sx={{ width: "100%" }}
                        ></TextField>
                      </FormControl>
                    </Box>
                  </Box>
                  <div>
                    <TextField
                      label="Delivery Notes"
                      value={Order?.note}
                      sx={{ width: "100%" }}
                    ></TextField>
                  </div>
                </Box>
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
                  <Typography variant="subtitle1">You have paid</Typography>
                  <Typography variant="h2">
                    {Order?.totalPrice.toLocaleString("vi-VN", {
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
                    {Order?.cartTotalAmount.toLocaleString("vi-VN", {
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
                    {Order?.deliveryFee.toLocaleString("vi-VN", {
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
                    {Order?.serviceFee.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="500">
                        Item
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="500">
                        Quantity
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="500">
                        Amount
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {OrderDetailList?.map((od) => (
                    <TableRow key={od.id}>
                      <TableCell align="center">
                        <img
                          src={
                            od.menuDetail ? od.menuDetail.product?.image : ""
                          }
                          alt={od.menuDetail ? od.menuDetail.product?.name : ""}
                          width={128}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>{od.menuDetail?.product?.name}</Typography>
                        <Typography>
                          {od.menuDetail?.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{od.quantity}</TableCell>
                      <TableCell align="center">
                        {(od.menuDetail
                          ? od.menuDetail.price * od.quantity
                          : "0"
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={handleCancel}
              disabled={!isCancellable}
            >
              {btnMsg}
            </Button>
          </>
        )}
    </>
  );
}

export default OrderDetailPage;
