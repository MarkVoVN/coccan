import {
  Create,
  DateInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const OrderCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <DateInput source="orderTime" />
      <NumberInput source="serviceFee" />
      <NumberInput source="totalPrice" />
      <ReferenceInput source="customerId" reference="customers" />
      <ReferenceInput source="sessionId" reference="sessions" />
      <ReferenceInput source="pickUpSpotId" reference="pickUpSpots" />
      <NumberInput source="status" />
    </SimpleForm>
  </Create>
);
