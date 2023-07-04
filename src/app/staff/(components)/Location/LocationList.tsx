"use client";

import { Datagrid, List, TextField } from "react-admin";

export const LocationList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
    </Datagrid>
  </List>
);
