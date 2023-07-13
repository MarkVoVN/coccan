import { Edit, SimpleForm, TextInput } from "react-admin";

export const StaffEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="username" />
      <TextInput source="fullname" />
      <TextInput source="email" />
      <TextInput source="image" />
      <TextInput source="phone" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);
