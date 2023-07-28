"use client";

import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      {/* <TextField source="id" /> */}
      <DateField source="date" />
      <ReferenceField source="menuId" reference="menus" />
      <ReferenceField source="timeSlotId" reference="timeslots" />
      <ReferenceField source="locationId" reference="locations" />
    </Datagrid>
  </List>
);
