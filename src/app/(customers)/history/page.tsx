"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material";
import "./orderHistory.scss";
import theme from "../../theme";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  orderTime: string;
  serviceFee: number;
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

function HistoryPage() {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return `${date.getHours()}:${date.getMinutes()} Today`;
    } else {
      return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    }
  };

  const handleClick = (orderId: string) => {
    console.log(`User clicked on order with id ${orderId}`);
  };

  const user = useAppSelector((state) => state.user.value);

  //const [orderList, setOrderList] = useState<Order[]>();
  const [orderHistory, setOrderHistory] = useState<Order[]>();

  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user.isAuth) return;

    const params = {
      filter: JSON.stringify({
        customerid: user.customerId,
      }),
    };
    const queryParams = new URLSearchParams(params);
    const url = `https://coccan-api.somee.com/api/orders`;

    axios
      .get(url, { params: queryParams })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        setOrderHistory(response.data);
        var list: Order[] = [];
        response.data.map((item: any) => {
          if (item.orderDetailCount != 0) list.push(item);
        });
        setOrderHistory(list);
        setIsFetchLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMessage(error.message);
        setIsFetchLoading(false);
      });
  }, [user.isAuth]);

  const displayStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Delivered";
      case 2:
        return "Completed";
      case 3:
        return "Cancelled";
      default:
        return "Not documented";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="order-history-wrapper">
        <Box className="container">
          <Box className="title">
            <Typography variant="h2">Order History</Typography>
          </Box>
          {isFetchLoading && !isError && <h2> Loading...</h2>}

          {isError && <h2>An error occured. {errorMessage}</h2>}

          {!isFetchLoading &&
            !isError &&
            (!orderHistory || orderHistory.length == 0) && (
              <h2>Your order history is empty</h2>
            )}

          {!isFetchLoading &&
            !isError &&
            orderHistory &&
            orderHistory.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>ID</TableCell> */}
                      <TableCell>Order Time</TableCell>

                      <TableCell>Time slot</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Pickup Spot</TableCell>
                      <TableCell align="center">Item Count</TableCell>
                      <TableCell align="center">Total Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderHistory?.map((order) => (
                      <TableRow key={order.id}>
                        {/* <TableCell>{order.id}</TableCell> */}
                        <TableCell>{formatDate(order.orderTime)}</TableCell>

                        <TableCell>{`${order.timeSlotStart}-${order.timeSlotEnd}`}</TableCell>
                        <TableCell>{order.locationName}</TableCell>
                        <TableCell>{order.pickUpSpotFullName}</TableCell>
                        <TableCell align="center">
                          {order.orderDetailCount}
                        </TableCell>
                        <TableCell align="center">
                          {order.totalPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell>
                          {displayStatus(order.orderStatus)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => router.push(`order/${order.id}`)}
                          >
                            View detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HistoryPage;
