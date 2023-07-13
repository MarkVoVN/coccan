import React from "react";
import { Datagrid, List, ReferenceField, Show, TextField } from "react-admin";

const OrderDetails = () => {
  return (
    <div>
      Order details
      <span> asdasd</span>
    </div>
  );
};

function ViewPendingOrdersByStore() {
  return (
    <List>
      <Datagrid expand={<OrderDetails></OrderDetails>} expandSingle>
        <ReferenceField source="customerId" reference="customers">
          <TextField source="displayName"></TextField>
        </ReferenceField>
        <TextField source="id"></TextField>
      </Datagrid>
    </List>
  );
}

export default ViewPendingOrdersByStore;
