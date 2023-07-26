import {
  Create,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="date" />
      <ReferenceInput source="timeSlotId" reference="timeslots" />
      <ReferenceInput source="locationId" reference="locations" />
      <ReferenceInput source="menuId" reference="menus" />
    </SimpleForm>
  </Create>
);
