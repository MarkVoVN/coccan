"use client";

import { Datagrid, List, TextField } from "react-admin";

export const ProductList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="image" />
      <TextField source="category.id" />
    </Datagrid>
  </List>
);
