import {
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const PickupspotEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="fullname" />
      <TextInput source="address" />
      <ReferenceInput source="locationId" reference="locations" />
      <NumberInput source="status" />
    </SimpleForm>
  </Edit>
);
