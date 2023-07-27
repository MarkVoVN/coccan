import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { LineChart } from "@mui/x-charts";
import * as React from "react";
import { useEffect, useState } from "react";
import { Title } from "react-admin";

export const Chart = () => {
  const apiResponse = {
    saleData: {
      date: ["21/7", "22/7", "23/7", "24/7", "25/7", "26/7"], // quăng datetime trong db vô đây lun
      sale: [
        {
          location: "Campus", // campus name
          noOrder: [2, 5, 2, 8, 1, 5, 5],
          revenue: [10910, 12093, 12390, 12399, 12322, 12383, 12890],
        },
        {
          location: "NVH", // campus name
          noOrder: [2, 5, 2, 8, 1, 5, 5],
          revenue: [10910, 12093, 12390, 12399, 12322, 12383, 12890],
        },
      ],
    },
    orderStateData: [
      {
        location: "Campus", // campus name
        data: [1, 5, 9, 0], // pending, delivered, completed, canceled
      },
      {
        location: "NVH", // campus name
        data: [1, 5, 9, 0], // pending, delivered, completed, canceled
      },
    ],
  };

  const xDate = ["21/7", "22/7", "23/7", "24/7", "25/7", "26/7", "A"];
  const CampusSale = [2, 5.5, 2, 8.5, 1.5, 5, 5];
  const NVHSale = [2, 5, 2, 9, 1, 6, 2];
  return (
    <Card>
      <Title title="Dashboard" />
      <CardContent>
        <LineChart
          xAxis={[{ scaleType: "point", data: xDate }]}
          series={[
            {
              data: CampusSale,
              label: "Campus",
            },
            {
              data: NVHSale,
              label: "NVH",
            },
          ]}
          width={1000}
          height={600}
        />
      </CardContent>
    </Card>
  );
};

// Interface for the order object
interface Order {
  id: string;
  orderTime: string;
  totalPrice: number;
  locationName: string;
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

  useEffect(() => {
    // Sample API response data
    const rawdata = [
      {
        id: "6c653dd5-6bf2-4ba5-9f4f-00d59ae33ab9",
        orderTime: "2023-07-13T20:22:00.703",
        serviceFee: 17750,
        deliveryFee: 4000,
        cartTotalAmount: 105000,
        note: "",
        phone: "0923485736",
        totalPrice: 126750,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 5,
        orderStatus: 1,
      },
      {
        id: "53cbf1dc-1626-4251-b3cc-13d67caad300",
        orderTime: "2023-07-26T10:05:55.087",
        serviceFee: 5000,
        deliveryFee: 4000,
        cartTotalAmount: 20000,
        note: "",
        phone: "0555500000",
        totalPrice: 29000,
        customerId: "8d7bb0bb-5b21-4562-862c-ab5607439122",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "4330739c-6805-4b6f-8df7-1db8c6a2658e",
        orderTime: "2023-07-13T23:41:18.16",
        serviceFee: 5000,
        deliveryFee: 4000,
        cartTotalAmount: 20000,
        note: "",
        phone: "0983475839",
        totalPrice: 29000,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "ef768f9e-4400-49e1-8d8b-235810656dd7",
        orderTime: "2023-07-14T06:15:54.863",
        serviceFee: 11750,
        deliveryFee: 4000,
        cartTotalAmount: 65000,
        note: "",
        phone: "0555500000",
        totalPrice: 80750,
        customerId: "8d7bb0bb-5b21-4562-862c-ab5607439122",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 3,
        orderStatus: 2,
      },
      {
        id: "477ed4e7-4924-4098-b00b-356cada1af0d",
        orderTime: "2023-07-26T20:16:37.633",
        serviceFee: 32000,
        deliveryFee: 4000,
        cartTotalAmount: 200000,
        note: "nhanh nhá",
        phone: "0123445633",
        totalPrice: 236000,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 4,
        orderStatus: 0,
      },
      {
        id: "2e985bae-f59b-4bc5-a7b1-3860820f90ff",
        orderTime: "2023-07-13T20:24:58.98",
        serviceFee: 8000,
        deliveryFee: 4000,
        cartTotalAmount: 40000,
        note: "abc",
        phone: "0000000000",
        totalPrice: 52000,
        customerId: "5ee3d222-b21e-4d1e-bb78-c23583cd4aeb",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 2,
        orderStatus: 0,
      },
      {
        id: "7eb220f7-d415-45dd-b678-389222598157",
        orderTime: "2023-07-13T20:22:21.133",
        serviceFee: 22250,
        deliveryFee: 4000,
        cartTotalAmount: 135000,
        note: "abc",
        phone: "0888888888",
        totalPrice: 161250,
        customerId: "5ee3d222-b21e-4d1e-bb78-c23583cd4aeb",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 6,
        orderStatus: 0,
      },
      {
        id: "50e556de-80bc-4d8d-aced-46339e766d05",
        orderTime: "2023-07-13T20:50:17.373",
        serviceFee: 8750,
        deliveryFee: 4000,
        cartTotalAmount: 45000,
        note: "re ",
        phone: "0000000000",
        totalPrice: 57750,
        customerId: "5ee3d222-b21e-4d1e-bb78-c23583cd4aeb",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 2,
        orderStatus: 0,
      },
      {
        id: "e2541bcf-3336-4ecd-9c0b-7169d99aab04",
        orderTime: "2023-07-13T22:02:40.457",
        serviceFee: 10250,
        deliveryFee: 4000,
        cartTotalAmount: 55000,
        note: "abc",
        phone: "0123345678",
        totalPrice: 69250,
        customerId: "5ee3d222-b21e-4d1e-bb78-c23583cd4aeb",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 2,
        orderStatus: 0,
      },
      {
        id: "daa81a59-9909-422b-b0b0-934f47943a01",
        orderTime: "2023-07-26T10:32:00.393",
        serviceFee: 5750,
        deliveryFee: 4000,
        cartTotalAmount: 25000,
        note: "",
        phone: "0555500000",
        totalPrice: 34750,
        customerId: "8d7bb0bb-5b21-4562-862c-ab5607439122",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "7dbd4e69-28a3-4f72-8a63-a4e7f654a064",
        orderTime: "2023-07-26T20:18:07.147",
        serviceFee: 26000,
        deliveryFee: 4000,
        cartTotalAmount: 160000,
        note: "",
        phone: "0123123124",
        totalPrice: 190000,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "db037a69-7969-4efa-a30e-a850704da733",
        orderTime: "2023-07-13T21:59:19.537",
        serviceFee: 5750,
        deliveryFee: 4000,
        cartTotalAmount: 25000,
        note: "",
        phone: "0993849283",
        totalPrice: 34750,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "dc61fa14-454c-4c49-8a4e-b281bd92eab3",
        orderTime: "2023-07-27T05:04:15.597",
        serviceFee: 46700,
        deliveryFee: 4000,
        cartTotalAmount: 298000,
        note: "123",
        phone: "0192292929",
        totalPrice: 348700,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 2,
        orderStatus: 0,
      },
      {
        id: "e2b7a7bf-4010-46a7-9f53-bb938f0cf7f9",
        orderTime: "2023-07-26T10:07:23.137",
        serviceFee: 5000,
        deliveryFee: 4000,
        cartTotalAmount: 20000,
        note: "",
        phone: "0555500000",
        totalPrice: 29000,
        customerId: "8d7bb0bb-5b21-4562-862c-ab5607439122",
        sessionId: "d411a66c-0315-4d24-b659-100891ce2628",
        pickUpSpotId: "668d7b32-c04b-4d4c-aacc-37439da0c259",
        pickUpSpotFullName: "NVH-601",
        locationID: "2b125409-f057-4a73-a3c9-e2337f83f87f",
        locationName: "Nhà Văn hóa Sinh viên",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "870dcea3-8e88-4e10-8aff-ca852ff8ea86",
        orderTime: "2023-07-14T04:16:05.6",
        serviceFee: 26750,
        deliveryFee: 4000,
        cartTotalAmount: 165000,
        note: "None",
        phone: "0987345612",
        totalPrice: 195750,
        customerId: "c2dbd1a4-e8ca-4833-97c0-51de937e46f9",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 5,
        orderStatus: 0,
      },
      {
        id: "e61dcf7f-59e6-4eef-bc95-d103878eb723",
        orderTime: "2023-07-27T05:13:12.307",
        serviceFee: 26000,
        deliveryFee: 4000,
        cartTotalAmount: 160000,
        note: "",
        phone: "0999999999",
        totalPrice: 190000,
        customerId: "98b33d3b-437c-41c1-af89-352e2fbcd947",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 1,
        orderStatus: 0,
      },
      {
        id: "3f75c4e6-2239-49d0-bfb8-fc0bafb02847",
        orderTime: "2023-07-13T07:50:00",
        serviceFee: 11750,
        deliveryFee: 4000,
        cartTotalAmount: 65000,
        note: "Nhận hàng trễ xíu nhé shop, tầm 12h15",
        phone: "0555500001",
        totalPrice: 80750,
        customerId: "8d7bb0bb-5b21-4562-862c-ab5607439122",
        sessionId: "2a86deb4-d4de-48e0-8310-c7e74160290a",
        pickUpSpotId: "557ff68c-a7d1-4e4f-be36-a53839e85f2e",
        pickUpSpotFullName: "Sảnh trống đồng",
        locationID: "6471f3fe-4a9b-46ca-8f33-8cbc267475cf",
        locationName: "FPT HCM Campus",
        timeSlotID: "51111e89-f65e-4673-866a-3d5086f249a4",
        timeSlotStart: "11:45:00",
        timeSlotEnd: "12:30:00",
        orderDetailCount: 2,
        orderStatus: 2,
      },
    ];

    const apiResponse: Order[] = [];

    rawdata.forEach((order) => {
      apiResponse.push({
        id: order.id,
        orderTime: order.orderTime,
        totalPrice: order.totalPrice,
        locationName: order.locationName,
      });
    });

    console.log(apiResponse);

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

    // Function to calculate total orders and revenue for each location
    const calculateSaleData = (groupedOrders: { [date: string]: Order[] }) => {
      const saleData: {
        [locationName: string]: {
          noOfOrder: number[];
          revenue: number[];
        };
      } = {};

      for (const date of dates) {
        for (const location of apiResponse) {
          if (!saleData[location.locationName]) {
            saleData[location.locationName] = {
              noOfOrder: [],
              revenue: [],
            };
          }

          const ordersOnDate = groupedOrders[date]?.filter(
            (order) => order.locationName === location.locationName
          );

          const totalOrders = ordersOnDate?.length || 0;
          const totalRevenue =
            ordersOnDate?.reduce((acc, order) => acc + order.totalPrice, 0) ||
            0;

          saleData[location.locationName].noOfOrder.push(totalOrders);
          saleData[location.locationName].revenue.push(totalRevenue);
        }
      }
      console.log("saleData");
      console.log(JSON.stringify(saleData));
      return saleData;
    };
    const groupedOrders = groupOrdersByDate(apiResponse);
    const saleData = calculateSaleData(groupedOrders);

    // Get the last 7 days' dates with at least 1 order
    const today = new Date();
    const last7DaysDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().slice(0, 10);
      if (groupedOrders[dateString]) {
        last7DaysDates.push(dateString);
      }
    }

    // Set the state with the transformed data
    console.log("last7days");
    console.log(JSON.stringify(last7DaysDates));
    setDates(last7DaysDates);

    const transformedSaleData = Object.keys(saleData).map((locationName) => ({
      locationName,
      noOfOrder: saleData[locationName].noOfOrder,
      revenue: saleData[locationName].revenue,
    }));

    console.log("final data");
    console.log(JSON.stringify(transformedSaleData));
    setSale(transformedSaleData);
  }, []);

  return (
    <div>
      <h2>Dates with at least 1 order in the last 7 days:</h2>
      <ul>
        {dates.map((date) => (
          <li key={date}>{date}</li>
        ))}
      </ul>

      <h2>Sale Data:</h2>
      <ul>
        {sale.map((locationData) => (
          <li key={locationData.locationName}>
            <h3>Location: {locationData.locationName}</h3>
            <p>No. of Orders: {locationData.noOfOrder.join(", ")}</p>
            <p>Revenue: {locationData.revenue.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderComponent;
