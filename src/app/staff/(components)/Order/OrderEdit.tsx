import {
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <DateInput source="orderTime" />
      <NumberInput source="serviceFee" />
      <NumberInput source="totalPrice" />
      <ReferenceInput source="customerId" reference="customers" />
      <ReferenceInput source="sessionId" reference="sessions" />
      <ReferenceInput source="pickUpSpotId" reference="pickUpSpots" />
      <SelectInput
        source="status"
        choices={[
          { id: "0", value: 0, name: "Canceled" },
          { id: "1", value: 1, name: "Pending" },
          { id: "2", value: 2, name: "Shipping" },
          { id: "3", value: 3, name: "Delivered" },
          { id: "4", value: 4, name: "Completed" },
        ]}
      />
    </SimpleForm>
  </Edit>
);
