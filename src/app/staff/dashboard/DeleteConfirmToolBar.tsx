import { DeleteButton, SaveButton, Toolbar } from "react-admin";

export const MyToolbar = (props: any) => (
  <Toolbar {...props} sx={{ display: "flex", justifyContent: "space-between" }}>
    <SaveButton />
    <DeleteButton mutationMode="pessimistic" />
  </Toolbar>
);
