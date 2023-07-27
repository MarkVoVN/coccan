"use client";

import { Datagrid, EditButton, List, ShowButton, TextField } from "react-admin";

export const MenuList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
