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
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* <TextField source="id" /> */}

      <ReferenceField source="orderId" reference="orders" label="OrderedBy">
        <ReferenceField source="customerId" reference="customers">
          <TextField source="fullname"></TextField>
        </ReferenceField>
      </ReferenceField>
      <NumberField source="quantity" />
      <ReferenceField source="menuDetailId" reference="menudetails" />
      <NumberField source="singlePrice" />
    </Datagrid>
  </List>
);
