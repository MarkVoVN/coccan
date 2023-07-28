import { Avatar, Box, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { LineChart } from "@mui/x-charts";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Title } from "react-admin";
import { Check } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import axios from "axios";

// Interface for the order object
interface Order {
  id: string;
  orderTime: string;
  totalPrice: number;
  locationName: string;
  status: number;
}

interface OrderStateCount {
  pending: number;
  delivered: number;
  completed: number;
  canceled: number;
  unidentified: number;
}

const OrderComponent: React.FC = () => {
  // State to store the transformed data
  const [dates, setDates] = useState<string[]>([]);
  const [sale, setSale] = useState<
    {
      locationName: string;
      noOfOrder: number[];
      revenue: number[];
    }[]
  >([]);

  const [Orders, setOrders] = useState<Order[]>([]);
  const [OrderStateCounters, setOrderStateCounters] =
    useState<OrderStateCount>();

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const list: Order[] = [];
    const counter: OrderStateCount = {
      pending: 0,
      delivered: 0,
      completed: 0,
      canceled: 0,
      unidentified: 0,
    };

    const url = `https://coccan-api.somee.com/api/orders`;

    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        response.data.forEach((order: any) => {
          const date = new Date(order.orderTime);

          switch (order.orderStatus) {
            case 0:
              counter.pending++;
              break;
            case 1:
              counter.delivered++;
              break;
            case 2:
              counter.completed++;
              break;
            case 3:
              counter.canceled++;
              break;
            default:
              counter.unidentified++;
              break;
          }

          list.push({
            id: order.id,
            orderTime: order.orderTime,
            totalPrice: order.totalPrice,
            locationName: order.locationName,
            status: order.orderStatus,
          });
        });

        setOrders(list);
        setOrderStateCounters(counter);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [isError]);

  useEffect(() => {
    // Sample API response data

    function convertISOToDate(isoDatetime: string): string {
      const dt = new Date(isoDatetime);
      const day = dt.getDate().toString().padStart(2, "0");
      const month = (dt.getMonth() + 1).toString().padStart(2, "0");
      const year = dt.getFullYear().toString();

      return `${day}/${month}/${year}`;
    }

    // Function to group orders by date
    const groupOrdersByDate = (
      orders: Order[]
    ): { [date: string]: Order[] } => {
      const groupedOrders0: { [date: string]: Order[] } = {};
      for (const order of orders) {
        const date = convertISOToDate(order.orderTime);
        if (!groupedOrders0[date]) {
          groupedOrders0[date] = [];
        }
        groupedOrders0[date].push(order);
      }
      console.log("groupedOrders0");
      console.log(groupedOrders0);
      return groupedOrders0;
    };
    const locationResponse = [
      {
        id: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        name: "FPT HCM Campus",
        address:
          "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
      },
      {
        id: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        name: "Nhà Văn hóa Sinh viên",
        address:
          "VRG2+9GJ, Đ. Quảng Trường Sáng Tạo, Đông Hoà, Dĩ An, Bình Dương",
      },
    ];
    const locationList = locationResponse.map((response) => response.name);
    // Function to calculate total orders and revenue for each location
    const calculateSaleData = (
      groupedOrders: { [date: string]: Order[] },
      dateList: string[]
    ) => {
      const saleData: {
        [locationName: string]: {
          noOfOrder: number[];
          revenue: number[];
        };
      } = {};
      console.log("dates");
      console.log(dates);
      console.log("locationList");
      console.log(locationList);

      for (const date of dateList) {
        // pick a date 27/7
        for (const location of locationList) {
          //pick an api response
          if (!saleData[location]) {
            //location not created, the created
            saleData[location] = {
              noOfOrder: [],
              revenue: [],
            };
          }
          const ordersOnDate = groupedOrders[date]?.filter(
            (order) => order.locationName === location && order.status === 2
          ); //get orders with date and location

          const totalOrders = ordersOnDate?.length || 0;
          const totalRevenue =
            ordersOnDate?.reduce((acc, order) => acc + order.totalPrice, 0) ||
            0;

          saleData[location].noOfOrder.push(totalOrders);
          saleData[location].revenue.push(totalRevenue);
        }
      }
      console.log("saleData");
      console.log(JSON.stringify(saleData));
      return saleData;
    };
    if (Orders.length < 0) return;
    const groupedOrders = groupOrdersByDate(Orders);

    const sortedDates = Object.keys(groupedOrders).sort((a, b) => {
      const dateA = new Date(a.split("/").reverse().join("-"));
      const dateB = new Date(b.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });
    const last7DaysDates: string[] =
      sortedDates.length >= 7 ? sortedDates.slice(-7) : sortedDates;

    // Set the state with the transformed data
    console.log("last7days");
    console.log(JSON.stringify(last7DaysDates));
    setDates(last7DaysDates);

    const saleData = calculateSaleData(groupedOrders, last7DaysDates);

    const transformedSaleData = Object.keys(saleData).map((locationName) => ({
      locationName,
      noOfOrder: saleData[locationName].noOfOrder,
      revenue: saleData[locationName].revenue,
    }));

    console.log("final data");
    console.log(JSON.stringify(transformedSaleData));
    setSale(transformedSaleData);
  }, [Orders]);
  function formatNumber(number: number) {
    if (number >= 1000) {
      const suffixes = ["", "K", "M", "B", "T"];
      const suffixIndex = Math.floor(Math.log10(number) / 3);
      const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
      return shortNumber + suffixes[suffixIndex];
    }
    return number.toString();
  }
  return (
    <Card>
      <Title title="Dashboard" />
      <CardContent>
        <Stack direction={"column"} spacing={4} alignItems={"center"}>
          {OrderStateCounters ? (
            <Stack direction={"row"} spacing={4}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                bgcolor={"#2196f3"}
                color={"white"}
                padding={2}
                borderRadius={2}
              >
                <Box>
                  <Typography variant="body1">Pending</Typography>
                  <Typography variant="h6" align="right">
                    {OrderStateCounters.pending}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                bgcolor={"#2196f3"}
                color={"white"}
                padding={2}
                borderRadius={2}
              >
                <Box>
                  <Typography variant="body1">Delivered</Typography>
                  <Typography variant="h6" align="right">
                    {OrderStateCounters.delivered}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                bgcolor={"#2e7d32"}
                color={"white"}
                padding={2}
                borderRadius={2}
              >
                <Box>
                  <Typography variant="body1">Completed</Typography>
                  <Typography variant="h6" align="right">
                    {OrderStateCounters.completed}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                bgcolor={"#ed6c02"}
                color={"white"}
                padding={2}
                borderRadius={2}
              >
                <Box>
                  <Typography variant="body1">Canceled</Typography>
                  <Typography variant="h6" align="right">
                    {OrderStateCounters.canceled}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          ) : (
            <h6>Error</h6>
          )}
          <Stack direction={"row"} spacing={4}>
            <Box>
              <LineChart
                xAxis={[{ scaleType: "point", data: dates }]}
                series={sale.map((locationData) => {
                  return {
                    data: locationData.noOfOrder,
                    label:
                      locationData.locationName === "FPT HCM Campus"
                        ? "Campus"
                        : "NVH",
                  };
                })}
                width={600}
                height={400}
              />
              <Typography variant="h6" align="center">
                Number of completed Orders
              </Typography>
            </Box>
            <Box>
              <LineChart
                xAxis={[{ scaleType: "point", data: dates }]}
                series={sale.map((locationData) => {
                  return {
                    data: locationData.revenue.map((number) => number / 1000),
                    label:
                      locationData.locationName === "FPT HCM Campus"
                        ? "Campus"
                        : "NVH",
                  };
                })}
                width={600}
                height={400}
              />
              <Typography variant="h6" align="center">
                {"Revenue generated (in thousands of VND)"}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderComponent;
