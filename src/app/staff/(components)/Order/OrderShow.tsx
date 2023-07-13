import { Chip } from "@mui/material";
import {
  DateField,
  FunctionField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { Datagrid, List } from "react-admin";
import { useParams } from "react-router-dom";

export const OrderShow = () => {
  const { id } = useParams();
  return (
    <Show>
      <SimpleShowLayout>
        {/* <TextField source="id" /> */}

        <DateField source="orderTime" />
        <NumberField source="serviceFee" />
        <NumberField source="totalPrice" />
        <ReferenceField source="customerId" reference="customers">
          <TextField source="fullname"></TextField>
        </ReferenceField>
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
        <FunctionField
          label="Status"
          render={(record: any) => {
            switch (record.status) {
              case 0:
                return <Chip color="error" label={"Cancelled"}></Chip>;
              case 1:
                return <Chip color="info" label={"Pending"}></Chip>;
              case 2:
                return <Chip color="primary" label={"Shipping"}></Chip>;
              case 3:
                return <Chip color="secondary" label={"Delivered"}></Chip>;
              case 4:
                return <Chip color="success" label={"Completed"}></Chip>;
              default:
                return <Chip color="warning" label={"Not documented"}></Chip>;
            }
          }}
        ></FunctionField>
      </SimpleShowLayout>
      <List resource="orderdetails" filter={{ orderid: id }}>
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
    </Show>
  );
};

// import {
//   DateField,
//   NumberField,
//   ReferenceField,
//   Show,
//   SimpleShowLayout,
//   TextField,
// } from "react-admin";

// export const OrderShow = () => (
//   <Show>
//     <SimpleShowLayout>
//       <TextField source="id" />
//       <DateField source="orderTime" />
//       <NumberField source="serviceFee" />
//       <NumberField source="totalPrice" />
//       <ReferenceField source="customerId" reference="customers" />
//       <ReferenceField source="sessionId" reference="sessions" />
//       <ReferenceField source="pickUpSpotId" reference="pickUpSpots" />
//       <TextField source="pickUpSpotFullName" />
//       <TextField source="locationID" />
//       <TextField source="locationName" />
//       <TextField source="timeSlotID" />
//       <TextField source="timeSlotStart" />
//       <TextField source="timeSlotEnd" />
//       <NumberField source="orderDetailCount" />
//       <NumberField source="status" />
//     </SimpleShowLayout>
//   </Show>
// );
