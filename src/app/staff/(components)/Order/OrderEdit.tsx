import { Box, Grid } from "@mui/material";
import {
  DateField,
  DateInput,
  DateTimeInput,
  DeleteButton,
  Edit,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  Toolbar,
  usePermissions,
} from "react-admin";
import { MyToolbar } from "../../dashboard/DeleteConfirmToolBar";

export const OrderEdit = () => {
  const { isLoading, permissions } = usePermissions();
  const adminChoices = [
    { id: "0", value: 0, name: "Pending" },
    { id: "1", value: 1, name: "Delivered" },
    { id: "2", value: 2, name: "Completed" },
    { id: "3", value: 3, name: "Canceled" },
  ];
  const staffChoices = [
    { id: "0", value: 0, name: "Pending" },
    { id: "1", value: 1, name: "Delivered" },
    { id: "3", value: 3, name: "Canceled" },
  ];

  return (
    <Edit>
      <SimpleForm toolbar={<MyToolbar></MyToolbar>}>
        {permissions === "admin" ? (
          <>
            <Box
              display={{
                xs: "block",
                sm: "flex",
                width: "100%",
              }}
            >
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <Box
                  display={{
                    xs: "block",
                    sm: "flex",
                    width: "100%",
                  }}
                >
                  {/* <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <TextInput source="id" disabled />
                  </Box> */}

                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <DateTimeInput source="orderTime" fullWidth required />
                  </Box>
                </Box>

                <Box
                  display={{
                    xs: "block",
                    sm: "flex",
                    width: "100%",
                  }}
                >
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <ReferenceInput
                      source="customerId"
                      reference="customers"
                      required
                    />
                  </Box>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <TextInput source="phone" required />
                  </Box>
                </Box>
                <Box
                  display={{
                    xs: "block",
                    sm: "flex",
                    width: "100%",
                  }}
                >
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <ReferenceInput
                      source="sessionId"
                      reference="sessions"
                      required
                    />
                  </Box>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <ReferenceInput
                      source="pickUpSpotId"
                      reference="pickupspots"
                      required
                    />
                  </Box>
                </Box>
              </Box>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <Box
                  display={{
                    xs: "block",
                    sm: "flex",
                    width: "100%",
                  }}
                >
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <NumberInput source="serviceFee" required />
                  </Box>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <NumberInput source="deliveryFee" required />
                  </Box>

                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <NumberInput source="cartTotalAmount" required />
                  </Box>
                </Box>
                <Box
                  display={{
                    xs: "block",
                    sm: "flex",
                    width: "100%",
                  }}
                >
                  <NumberInput source="totalPrice" required />
                </Box>
                <Box
                  display={{
                    xs: "block",
                    sm: "flex",
                    width: "100%",
                  }}
                >
                  <TextInput source="note" fullWidth multiline />
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <SimpleShowLayout>
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
              <ReferenceField source="pickUpSpotId" reference="pickupspots">
                <TextField source="fullname"></TextField>
              </ReferenceField>
              <NumberField source="deliveryFee"></NumberField>
              <NumberField source="cartTotalAmount"></NumberField>
              <TextField source="phone"></TextField>
              <TextField source="note"></TextField>
            </SimpleShowLayout>
          </>
        )}

        <SelectInput
          source="orderStatus"
          choices={permissions === "admin" ? adminChoices : staffChoices}
        />
      </SimpleForm>
    </Edit>
  );
};
