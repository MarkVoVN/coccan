import { Create, SimpleForm, TextInput } from "react-admin";

export const StaffCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="username" />
      <TextInput source="fullname" />
      <TextInput source="email" />
      <TextInput source="image" />
      <TextInput source="phone" />
      <TextInput source="role" />
    </SimpleForm>
  </Create>
);
