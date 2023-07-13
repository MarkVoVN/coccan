import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import { useParams } from "react-router-dom";

export const OrderDetails = () => {
  const { id } = useParams();
  return (
    <List resource="orderdetails" filter={{ orderid: id }}>
      <Datagrid rowClick="edit">
        {/* <TextField source="id" /> */}
        <NumberField source="quantity" />
        <ReferenceField source="menuDetailId" reference="menudetails" />
        <ReferenceField source="orderId" reference="orders">
          <ReferenceField source="customerId" reference="customers">
            <TextField source="fullname"></TextField>
          </ReferenceField>
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
