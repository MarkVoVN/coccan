import { EmailField, Show, SimpleShowLayout, TextField } from "react-admin";

export const StaffShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="fullname" />
      <EmailField source="email" />
      <TextField source="image" />
      <TextField source="phone" />
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);
