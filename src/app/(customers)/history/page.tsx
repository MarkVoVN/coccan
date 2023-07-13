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
} from "@mui/material";
import "./orderHistory.scss";

type Order = {
  id: string;
  orderTime: string; //in ISO format
  serviceFee: number;
  totalPrice: number;
  customerId: string;
  sessionId: string;
  pickUpSpotId: string;
  status: number;
};

type OrderFullInfo = {
  id: string;
  itemCount: number | null; //get from counting order details
  orderTime: string; //in ISO format
  serviceFee: number;
  totalPrice: number;
  customerId: string;
  customerName: string; //get from user
  sessionId: string;
  timeslot: string | null; //get from timeslot with timeslot id with session id
  location: string | null; //get from location with location id with session id
  pickUpSpotId: string;
  pickUpSpotName: string | null; //get from pick up spot
  status: number;
  orderDetails: OrderDetail[] | null;
};

type OrderDetail = {
  id: string;
  quantity: number;
  menuDetailId: string;
  menuDetail: MenuDetail | null;
  orderId: string;
};

type MenuDetail = {};

function HistoryPage() {
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
  const [orderList, setOrderList] = useState<Order[]>();
  const [orderHistory, setOrderHistory] = useState<OrderFullInfo[]>();

  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [urlList, setUrlList] =
    useState<{ url: string; params: { params: URLSearchParams } | null }[]>();

  useEffect(() => {
    if (!user.isAuth) return;
    setIsError(false);
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
        //setIsFetchLoading(false);
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMessage(error.message);
        //setIsFetchLoading(false);
      });
  }, [user.isAuth]);

  useEffect(() => {
    if (!user) return;
    if (!user.isAuth) return;
    if (!orderList) return;

    // const params = {
    //   filter: JSON.stringify({
    //     customerid: user.customerId,
    //   }),
    // };
    // const queryParams = new URLSearchParams(params);
    const urls = ["https://coccan-api.somee.com/api/orders"];
    const list: { url: string; params: { params: URLSearchParams } | null }[] =
      [];
    orderList.map((order) => {
      // var list: { url: string; params: { params: URLSearchParams } | null }[] =
      //   [];
      //fetch item count

      //fetch timeslot & location
      const url = `https://coccan-api.somee.com/api/sessions/${order.sessionId}`;
      axios
        .get(url)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Request error: " + response.status);
          }
          return response;
        })
        .then((response) => {
          const timeslotId = response.data.timeSlotId;
          const locationId = response.data.locationId;

          const urls = [
            `https://coccan-api.somee.com/api/timeslots/${timeslotId}`,
            `https://coccan-api.somee.com/api/locations/${locationId}`,
          ];
          list.push(fetchOrderDetails(order.id));
          urls.map((url) => list.push({ url: url, params: null }));
          list.push(fetchPickUpSpotName(order.pickUpSpotId));
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setErrorMessage(error.message);
          setIsFetchLoading(false);
        });
    });

    setUrlList(list);
    console.log("URL list created");
  }, [orderList]);

  useEffect(() => {
    if (!user) return;
    if (!user.isAuth) return;
    if (!orderList) return;
    if (!urlList || urlList.length <= 0) return;
    const list = urlList;
    axios
      .all(
        list.map((item) => {
          console.log("mapping item to api call");
          if (item.params) {
            return axios.get(item.url, item.params);
          } else {
            return axios.get(item.url);
          }
        })
      )
      //orderList.reduce((_, order, _, result) => result.concat(...fetchAllInfo(order))))
      // .then((response) => {
      //   if (response.status !== 200) {
      //     throw new Error("Request error: " + response.status);
      //   }
      //   return response;
      // })
      .then((ordersInfo) => {
        console.log("result: ");
        var ordersFullInfo: OrderFullInfo[] = [];

        for (let i = 0; i < ordersInfo.length; i = i + 4) {
          //console.log(ordersInfo[i].data);
          console.log("plaplapla");
          var timeslotstr = `${ordersInfo[i + 1].data.startTime}-${
            ordersInfo[i + 1].data.endTime
          }`;
          var orderInfo: OrderFullInfo = {
            ...orderList[i],
            itemCount: ordersInfo[i].data.length,
            orderDetails: ordersInfo[i].data,
            customerName: user.displayName as string,
            timeslot: timeslotstr,
            location: ordersInfo[i + 2].data.name,
            pickUpSpotName: ordersInfo[i + 3].data.fullname,
          };
          ordersFullInfo.push(orderInfo);
        }
        setOrderHistory(ordersFullInfo);
        setIsFetchLoading(false);
        //orderdetails
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMessage(error.message);
        setIsFetchLoading(false);
      });
  }, [urlList]);

  // function fetchAllInfo (order: Order) : { url: string; params: { params: URLSearchParams } | null }[] {

  //   //fetch pickupspot
  // };

  const fetchOrderDetails = (orderId: string) => {
    const params = {
      filter: JSON.stringify({
        orderid: orderId,
      }),
    };
    const queryParams = new URLSearchParams(params);
    const url = `https://coccan-api.somee.com/api/orderdetails`;

    return { url: url, params: { params: queryParams } };
  };

  const fetchPickUpSpotName = (pickupspotId: string) => {
    const url = `https://coccan-api.somee.com/api/pickupspots/${pickupspotId}`;

    return { url: url, params: null };
  };

  // async function fetchTimeslotLocationFromSessionId(
  //   sessionId: string
  // ): { url: string; params: { params: URLSearchParams } | null }[] {
  //   var list: { url: string; params: { params: URLSearchParams } | null }[] =
  //     [];

  //   return list;
  // }

  return (
    <Box className="order-history-wrapper">
      <Box className="order-history-container">
        <Box className="title">
          <Typography variant="h2">Order History</Typography>
          <Button onClick={() => console.log(JSON.stringify(orderHistory))}>
            Order History
          </Button>
        </Box>
        {isFetchLoading && !isError && <h2> Loading...</h2>}

        {isError && <h2>An error occured. {errorMessage}</h2>}

        {!isFetchLoading &&
          !isError &&
          (!orderHistory || orderHistory.length == 0) && (
            <h2>Your order history is empty {JSON.stringify(orderHistory)}</h2>
          )}

        {!isFetchLoading && !isError && orderHistory && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Order Time</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Session</TableCell>
                  <TableCell>Pickup Spot</TableCell>
                  <TableCell>Item Count</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory?.map((order) => (
                  <TableRow key={order.id} onClick={() => console.log(order)}>
                    {/* <TableCell>{order.id}</TableCell> */}
                    <TableCell>{formatDate(order.orderTime)}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>{`${order.timeslot} ${order.location}`}</TableCell>
                    <TableCell>{order.pickUpSpotName}</TableCell>
                    <TableCell>{order.itemCount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default HistoryPage;
