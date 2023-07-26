import { Edit, ReferenceInput, SimpleForm, TextInput } from "react-admin";

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="date" />
      <ReferenceInput source="timeSlotId" reference="timeSlots" />
      <ReferenceInput source="locationId" reference="locations" />
      <ReferenceInput source="menuId" reference="menus" />
    </SimpleForm>
  </Edit>
);
