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
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./orderDetails.scss";
import theme from "../../../theme";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

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
  const router = useRouter();

  const [Order, setOrder] = useState<Order>();
  const [OrderDetailList, setOrderDetailList] = useState<OrderDetail[]>();

  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCancellable, setIsCancellable] = useState(false);
  const [btnMsg, setBtnMsg] = useState("Cancel");
  const [isCanceling, setIsCanceling] = useState(false);

  const handleCancel = () => {
    if (!Order) return;
    setIsCanceling(true);
    const body = {
      ...Order,
      orderStatus: 3,
    };
    axios
      .put(`https://coccan-api.somee.com/api/orders/${Order.id}`, body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        setIsCanceling(false);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        setIsCanceling(false);
      });
  };

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
    if (Order.orderStatus == 0) setIsCancellable(true);
    const params = {
      filter: JSON.stringify({
        orderid: Order.id,
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
            <ThemeProvider theme={theme}>
              <Box className="container">
                <Breadcrumbs sx={{ marginBottom: "16px" }}>
                  <Link underline="hover" color="inherit" href="/">
                    Home
                  </Link>
                  <Link underline="hover" color="inherit" href="/history">
                    History
                  </Link>
                  <Typography color="text.primary">Order details</Typography>
                </Breadcrumbs>
                <Box>
                  <Typography variant="h3" fontWeight={500}>
                    Order Details
                  </Typography>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
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
                          <TableCell>
                            <img
                              src={
                                od.menuDetail
                                  ? od.menuDetail.product?.image
                                  : ""
                              }
                              alt={
                                od.menuDetail ? od.menuDetail.product?.name : ""
                              }
                              width={128}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {od.menuDetail?.product?.name}
                            </Typography>
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
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginTop: "32px",
                  }}
                >
                  <Tooltip title="Cancel order" arrow>
                    <LoadingButton
                      variant="contained"
                      onClick={handleCancel}
                      disabled={!isCancellable}
                      loading={isCanceling}
                      size="large"
                    >
                      {btnMsg}
                    </LoadingButton>
                  </Tooltip>
                </Box>
              </Box>
            </ThemeProvider>
          </>
        )}
    </>
  );
}

export default OrderDetailPage;
