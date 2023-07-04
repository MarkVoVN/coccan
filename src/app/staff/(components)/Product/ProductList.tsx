"use client";

import { Datagrid, List, TextField } from "react-admin";

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="image" />
      <TextField source="category.id" />
    </Datagrid>
  </List>
);
