import { ImageField, Show, SimpleShowLayout, TextField } from "react-admin";

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      {/* <ImageField source="image" title="image" /> */}
    </SimpleShowLayout>
  </Show>
);
