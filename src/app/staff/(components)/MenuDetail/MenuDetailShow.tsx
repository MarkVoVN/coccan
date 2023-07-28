import {
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const MenudetailShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="price" />
      <ReferenceField source="menuId" reference="menus" />
      <ReferenceField
        source="product.id"
        reference="products"
        label="Product"
      />
    </SimpleShowLayout>
  </Show>
);
