"use client";

import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* <TextField source="id" /> */}
      {/* <TextField source="date" /> */}
      <ReferenceField source="menuId" reference="menus" />
      <ReferenceField source="timeSlotId" reference="timeslots" />
      <ReferenceField source="locationId" reference="locations" />
    </Datagrid>
  </List>
);
