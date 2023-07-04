"use client";
import {
  Datagrid,
  ImageField,
  List,
  SelectArrayInput,
  TextField,
} from "react-admin";
import { TextInput } from "react-admin";

const storeFilters = [
  <TextInput key={"sample"} source="search" label="Search" alwaysOn />,
  <SelectArrayInput
    key={"sample2"}
    source="Location"
    choices={[
      { id: "HCM-Q9", name: "HCM" },
      { id: "NVH", name: "NVH" },
      { id: "VHGP", name: "VHGP" },
    ]}
  />,
];

export const StoreList = () => (
  <List filters={storeFilters}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="address" />
      <ImageField source="image" title="image" />
    </Datagrid>
  </List>
);
