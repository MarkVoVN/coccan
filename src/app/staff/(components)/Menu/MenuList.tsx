"use client";

import { Datagrid, List, TextField } from "react-admin";

export const MenuList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
    </Datagrid>
  </List>
);
