import {
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const OrderdetailEdit = () => (
  <Edit>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <NumberInput source="quantity" />
      <ReferenceInput source="menuDetailId" reference="menudetails" />
      <ReferenceInput source="orderId" reference="orders" />
      <NumberInput source="singlePrice" />
      {/* <TextInput source="product" /> */}
    </SimpleForm>
  </Edit>
);
