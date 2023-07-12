"use client";

import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="date" />
      <ReferenceField source="timeSlotId" reference="timeSlots" />
      <ReferenceField source="locationId" reference="locations" />
      <ReferenceField source="menuId" reference="menus" />
    </Datagrid>
  </List>
);
