import {
  Datagrid,
  EditButton,
  EmailField,
  List,
  ShowButton,
  TextField,
} from "react-admin";

export const StaffList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="fullname" />
      <EmailField source="email" />
      <TextField source="image" />
      <TextField source="phone" />
      <TextField source="role" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
    </Datagrid>
  </List>
);
