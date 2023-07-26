import { Edit, SimpleForm, TextInput } from "react-admin";

const transform = (data: any) => ({
  ...data,
  image: "None",
});

export const CategoryEdit = () => (
  <Edit transform={transform}>
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      <TextInput source="name" />
      {/* <TextInput source="image" /> */}
    </SimpleForm>
  </Edit>
);
