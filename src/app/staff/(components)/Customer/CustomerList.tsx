"use client";

import {
  Datagrid,
  EditButton,
  EmailField,
  ImageField,
  List,
  ShowButton,
  TextField,
} from "react-admin";

export const CustomerList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* <TextField source="id" /> */}
      <TextField source="fullname" />
      {/* <TextField source="image" /> */}
      <ImageField source="image" title="image" emptyText="Not Available" />
      <EmailField source="email" />
      <TextField source="phone" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
