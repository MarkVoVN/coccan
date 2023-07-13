import { Edit, SimpleForm, TextInput } from "react-admin";

export const CustomerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="fullname" />
      <TextInput source="image" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);
