"use client";

import { Chip } from "@mui/material";
import {
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const OrderList = () => (
  <List sort={{ field: "orderTime", order: "DESC" }} perPage={25}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      {/* <TextField source="id" /> */}
      <DateField source="orderTime" showTime={true} />
      {/* <NumberField source="serviceFee" /> */}
      <NumberField source="totalPrice" />
      <ReferenceField source="customerId" reference="customers" />

      <ReferenceField
        source="sessionId"
        reference="sessions"
        label="Session's Timeslot"
      >
        <ReferenceField source="timeSlotId" reference="timeslots">
          <TextField source="startTime"></TextField>-
          <TextField source="endTime"></TextField>
        </ReferenceField>
      </ReferenceField>
      <ReferenceField source="sessionId" reference="sessions" label="Location">
        <ReferenceField source="locationId" reference="locations">
          <TextField source="name"></TextField>
        </ReferenceField>
      </ReferenceField>
      <ReferenceField source="pickUpSpotId" reference="pickUpSpots">
        <TextField source="fullname"></TextField>
      </ReferenceField>
      <FunctionField
        label="Status"
        render={(record: any) => {
          switch (record.orderStatus) {
            case 0:
              return <Chip color="primary" label={"Pending"}></Chip>;
            case 1:
              return <Chip color="secondary" label={"Delivered"}></Chip>;
            // case 2:
            //   return <Chip color="primary" label={"Shipping"}></Chip>;
            case 2:
              return <Chip color="success" label={"Completed"}></Chip>;
            case 3:
              return <Chip color="warning" label={"Canceled"}></Chip>;
            default:
              return <Chip color="error" label={"Not documented"}></Chip>;
          }
        }}
        sortBy="orderStatus"
      ></FunctionField>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
