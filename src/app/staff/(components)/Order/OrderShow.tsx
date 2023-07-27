import { Box, Chip, Grid, Typography } from "@mui/material";
import {
  CreateButton,
  DateField,
  FunctionField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TabbedShowLayout,
  TextField,
  TopToolbar,
  usePermissions,
} from "react-admin";
import { Datagrid, List } from "react-admin";
import { useParams } from "react-router-dom";

export const OrderShow = () => {
  const { id } = useParams();
  const { isLoading, permissions } = usePermissions();
  const Empty = () => (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        No order details available
      </Typography>
      {permissions === "admin" && <CreateButton />}
    </Box>
  );

  const Actions = () => (
    <TopToolbar>{permissions === "admin" && <CreateButton />}</TopToolbar>
  );
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Order info">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SimpleShowLayout>
                <DateField source="orderTime" showTime={true} />
                <ReferenceField source="customerId" reference="customers">
                  <TextField source="fullname"></TextField>
                </ReferenceField>
                <TextField source="phone"></TextField>
                <ReferenceField
                  source="sessionId"
                  reference="sessions"
                  label="Timeslot"
                >
                  <ReferenceField source="timeSlotId" reference="timeslots">
                    <TextField source="startTime"></TextField>-
                    <TextField source="endTime"></TextField>
                  </ReferenceField>
                </ReferenceField>
                <ReferenceField
                  source="sessionId"
                  reference="sessions"
                  label="Location"
                >
                  <ReferenceField source="locationId" reference="locations">
                    <TextField source="name"></TextField>
                  </ReferenceField>
                </ReferenceField>
                <ReferenceField source="pickUpSpotId" reference="pickUpSpots">
                  <TextField source="fullname"></TextField>
                </ReferenceField>
              </SimpleShowLayout>
            </Grid>
            <Grid item xs={6}>
              <SimpleShowLayout>
                <NumberField source="totalPrice" />
                <NumberField source="serviceFee" />

                <NumberField source="deliveryFee"></NumberField>
                <NumberField source="cartTotalAmount"></NumberField>
                <FunctionField
                  label="Status"
                  render={(record: any) => {
                    switch (record.orderStatus) {
                      case 0:
                        return <Chip color="primary" label={"Pending"}></Chip>;
                      case 1:
                        return (
                          <Chip color="secondary" label={"Delivered"}></Chip>
                        );
                      // case 2:
                      //   return <Chip color="primary" label={"Shipping"}></Chip>;
                      case 2:
                        return (
                          <Chip color="success" label={"Completed"}></Chip>
                        );
                      case 3:
                        return <Chip color="warning" label={"Canceled"}></Chip>;
                      default:
                        return (
                          <Chip color="error" label={"Not documented"}></Chip>
                        );
                    }
                  }}
                ></FunctionField>
                <TextField source="note"></TextField>
              </SimpleShowLayout>
            </Grid>
          </Grid>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Product list">
          <List
            resource="orderdetails"
            filter={{ orderid: id }}
            actions={<Actions></Actions>}
            empty={<Empty></Empty>}
          >
            <Datagrid rowClick="show" size="medium" bulkActionButtons={false}>
              {/* <TextField source="id" /> */}
              <ReferenceField
                source="menuDetailId"
                reference="menudetails"
                label="Product name"
              >
                <TextField source="product.name"></TextField>
              </ReferenceField>
              <ReferenceField
                source="menuDetailId"
                reference="menudetails"
                label="Store"
              >
                <ReferenceField source="product.id" reference="products">
                  <ReferenceField source="storeId" reference="stores">
                    <TextField source="name"></TextField>
                  </ReferenceField>
                </ReferenceField>
              </ReferenceField>
              <ReferenceField
                source="menuDetailId"
                reference="menudetails"
                label="Price"
              >
                <TextField source="price"></TextField>
              </ReferenceField>
              <NumberField source="quantity" />
            </Datagrid>
          </List>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
