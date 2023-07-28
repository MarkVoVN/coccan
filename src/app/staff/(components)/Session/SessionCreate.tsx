import {
  Create,
  DateInput,
  DateTimeInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const SessionCreate = () => {
  const choices = [
    { id: "0", value: 0, name: "On going" },
    { id: "1", value: 1, name: "Completed" },
  ];
  return (
    <Create>
      <SimpleForm>
        <DateInput source="date" isRequired />
        <ReferenceInput source="timeSlotId" reference="timeslots" isRequired />
        <ReferenceInput source="locationId" reference="locations" isRequired />
        <ReferenceInput source="menuId" reference="menus" isRequired />
        {/* <NumberInput source="sessionStatus"></NumberInput> */}
        <SelectInput source="sessionStatus" choices={choices} isRequired />
      </SimpleForm>
    </Create>
  );
};
