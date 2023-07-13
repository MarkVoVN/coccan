import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const PickupspotList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="fullname" />
      <TextField source="address" />
      <ReferenceField source="locationId" reference="locations" />
      <NumberField source="status" />
    </Datagrid>
  </List>
);
