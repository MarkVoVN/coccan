import {
  DateField,
  DateInput,
  Edit,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  usePermissions,
} from "react-admin";

export const OrderEdit = () => {
  const { isLoading, permissions } = usePermissions();
  const adminChoices = [
    { id: "0", value: 0, name: "Pending" },
    { id: "1", value: 1, name: "Delivered" },
    { id: "2", value: 2, name: "Completed" },
    { id: "3", value: 3, name: "Canceled" },
  ];
  const staffChoices = [
    { id: "0", value: 0, name: "Pending" },
    { id: "1", value: 1, name: "Delivered" },
    { id: "3", value: 3, name: "Canceled" },
  ];
  return (
    <Edit>
      <SimpleForm>
        {permissions === "admin" ? (
          <>
            <TextInput source="id" />
            <DateInput source="orderTime" />
            <NumberInput source="serviceFee" />
            <NumberInput source="deliveryFee" />
            <NumberInput source="cartTotalAmount" />
            <TextInput source="note" />
            <TextInput source="phone" />
            <NumberInput source="totalPrice" />
            <ReferenceInput source="customerId" reference="customers" />
            <ReferenceInput source="sessionId" reference="sessions" />
            <ReferenceInput source="pickUpSpotId" reference="pickUpSpots" />
            <DateInput source="orderStatus" />
          </>
        ) : (
          <>
            <SimpleShowLayout>
              <DateField source="orderTime" />
              <NumberField source="serviceFee" />
              <NumberField source="totalPrice" />
              <ReferenceField source="customerId" reference="customers">
                <TextField source="fullname"></TextField>
              </ReferenceField>
              <ReferenceField
                source="sessionId"
                reference="sessions"
                label="Timeslot"
              >
                <ReferenceField source="timeSlotId" reference="timeslots">
                  <TextField source="startTime"></TextField>-
                  <TextField source="endTime"></TextField>
                </ReferenceField>
              </ReferenceField>
              <ReferenceField
                source="sessionId"
                reference="sessions"
                label="Location"
              >
                <ReferenceField source="locationId" reference="locations">
                  <TextField source="name"></TextField>
                </ReferenceField>
              </ReferenceField>
              <ReferenceField source="pickUpSpotId" reference="pickUpSpots">
                <TextField source="fullname"></TextField>
              </ReferenceField>
              <NumberField source="deliveryFee"></NumberField>
              <NumberField source="cartTotalAmount"></NumberField>
              <TextField source="phone"></TextField>
              <TextField source="note"></TextField>
            </SimpleShowLayout>
          </>
        )}

        <SelectInput
          source="orderStatus"
          choices={permissions === "admin" ? adminChoices : staffChoices}
        />
      </SimpleForm>
    </Edit>
  );
};
