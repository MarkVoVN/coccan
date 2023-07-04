"use client";

import { Datagrid, EmailField, ImageField, List, TextField } from "react-admin";

export const CustomerList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="fullname" />
      {/* <TextField source="image" /> */}
      <ImageField source="image" title="image" />
      <EmailField source="email" />
      <TextField source="phone" />
    </Datagrid>
  </List>
);
