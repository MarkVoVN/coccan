"use client";

import { Datagrid, EditButton, List, ShowButton, TextField } from "react-admin";

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      {/* <TextField source="image" /> */}
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
