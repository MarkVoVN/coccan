"use client";

import { Datagrid, EditButton, List, ShowButton, TextField } from "react-admin";

export const LocationList = () => (
  <List>
    <Datagrid rowClick="show">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <TextField source="address" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
