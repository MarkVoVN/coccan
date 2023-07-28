import { Stack } from "@mui/material";
import {
  ArrayField,
  Datagrid,
  DateField,
  FunctionField,
  ImageField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const SessionShow = () => (
  <Show>
    <SimpleShowLayout>
      <DateField source="date" />
      <FunctionField
        render={(record: any) =>
          record.sessionStatus == 0 ? "On Going" : "Completed"
        }
        label="Session Status"
      />
      <ReferenceField source="timeSlotId" reference="timeslots" />
      <ReferenceField source="locationId" reference="locations" />
      <ReferenceField source="menuId" reference="menus" />
      <ArrayField source="sessionBatchDTO" label="Ordered products by Store">
        <Datagrid bulkActionButtons={false}>
          <ReferenceField source="storeDTO.id" reference="stores" label="Store">
            <Stack direction={"column"}>
              <TextField source="name"></TextField>
              <TextField source="address"></TextField>
            </Stack>
          </ReferenceField>
          <ArrayField source="orderDetailDTOs" label="Ordered products">
            <Datagrid bulkActionButtons={false}>
              {/* <TextField source="id" /> */}
              {/* <ImageField source="image" title="image" /> */}
              <ReferenceField
                source="product.id"
                reference="products"
                label="Product"
              />
              <NumberField source="quantity" />
              <NumberField source="singlePrice" />
              {/* <ReferenceField source="menuDetailId" reference="menuDetails" />
              <ReferenceField source="orderId" reference="orders" /> */}
            </Datagrid>
          </ArrayField>
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
