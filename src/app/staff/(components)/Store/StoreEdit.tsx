"use client";

import { Edit, ImageField, SimpleForm, TextInput } from "react-admin";

export const StoreEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="address" />
      <TextInput source="image" />
      <ImageField source="image" />
    </SimpleForm>
  </Edit>
);
