"use client";

import { Create, SimpleForm, TextInput } from "react-admin";

export const StoreCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="image" />
      <TextInput source="products" />
    </SimpleForm>
  </Create>
);
