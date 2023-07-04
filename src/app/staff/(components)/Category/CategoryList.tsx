"use client";

import { Datagrid, List, TextField } from "react-admin";

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <TextField source="image" />
    </Datagrid>
  </List>
);
