import { Create, NumberInput, ReferenceInput, SimpleForm } from "react-admin";

export const MenudetailCreate = () => (
  <Create>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <NumberInput source="price" />
      <ReferenceInput source="menuId" reference="menus" />
      <ReferenceInput
        source="product.id"
        reference="products"
        label="Product"
      />
    </SimpleForm>
  </Create>
);
