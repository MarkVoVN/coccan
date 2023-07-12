"use client";

import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <DateField source="orderTime" />
      {/* <NumberField source="serviceFee" /> */}
      <NumberField source="totalPrice" />
      <ReferenceField source="customerId" reference="customers" />
      <ReferenceField source="sessionId" reference="sessions">
        <ReferenceField source="timeSlotId" reference="timeslots">
          <TextField source="startTime"></TextField>-
          <TextField source="endTime"></TextField>-
        </ReferenceField>
        {/* <ReferenceField source="locationId" reference="locations">
          <TextField source="name"></TextField>
        </ReferenceField> */}
      </ReferenceField>
      <ReferenceField source="pickUpSpotId" reference="pickUpSpots" />
      <NumberField source="status" />
    </Datagrid>
  </List>
);
