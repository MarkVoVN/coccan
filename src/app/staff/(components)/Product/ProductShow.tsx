import {
  ImageField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <ImageField source="image" title="image" />
      <TextField source="image" label="Image link" />
      <ReferenceField source="storeId" reference="stores" />
      <ReferenceField source="category.id" reference="categories" />
    </SimpleShowLayout>
  </Show>
);
