"use client";

import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const OrderdetailList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <NumberField source="quantity" />
      <ReferenceField source="menuDetailId" reference="menudetails" />
      <ReferenceField source="orderId" reference="orders">
        <ReferenceField source="customerId" reference="customers">
          <TextField source="fullname"></TextField>
        </ReferenceField>
      </ReferenceField>
    </Datagrid>
  </List>
);
