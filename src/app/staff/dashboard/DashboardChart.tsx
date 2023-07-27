import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title } from "react-admin";
import { LineChart } from "@mui/x-charts";

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
