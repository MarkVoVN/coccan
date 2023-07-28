import {
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const MenudetailEdit = () => (
  <Edit>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <NumberInput source="price" />
      <ReferenceInput source="menuId" reference="menus" />
      <ReferenceInput
        source="product.id"
        reference="products"
        label="Product"
        perPage={100}
      />
    </SimpleForm>
  </Edit>
);
