"use client";

import {
  Datagrid,
  EditButton,
  ImageField,
  List,
  ReferenceField,
  ShowButton,
  TextField,
  TextInput,
} from "react-admin";

const filterList = [
  <TextInput key={"search"} source="search" label="Search" alwaysOn />,
];

export const ProductList = () => (
  <List filters={filterList}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <ImageField source="image" title="image" />
      <TextField source="name" />
      <TextField source="category.name" />
      <ReferenceField source="storeId" reference="stores" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
