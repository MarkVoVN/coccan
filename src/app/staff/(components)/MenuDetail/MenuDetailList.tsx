"use client";

import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const MenudetailList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <ReferenceField source="menuId" reference="menus" />
      <TextField source="product.name" />
      <NumberField source="price" />
    </Datagrid>
  </List>
);
