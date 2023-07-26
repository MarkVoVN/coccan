import {
  Create,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const PickupspotCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="fullname" />
      <TextInput source="address" />
      <ReferenceInput source="locationId" reference="locations" />
      <NumberInput source="status" />
    </SimpleForm>
  </Create>
);
