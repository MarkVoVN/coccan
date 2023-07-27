"use client";

import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
//import { dataProvider } from "./dataProvider";
import simpleRestProvider from "ra-data-simple-rest";
import { StoreEdit } from "../(components)/Store/StoreEdit";
import { StoreCreate } from "../(components)/Store/StoreCreate";
import { StoreList } from "../(components)/Store/StoreList";
import { OrderdetailList } from "../(components)/OrderDetails/OrderdetailsList";
import { LocationList } from "../(components)/Location/LocationList";
import { TimeslotList } from "../(components)/Timeslot/TimeslotList";
import { CategoryList } from "../(components)/Category/CategoryList";
import { CustomerList } from "../(components)/Customer/CustomerList";
import { MenudetailList } from "../(components)/MenuDetail/MenuDetailList";
import { MenuList } from "../(components)/Menu/MenuList";
import { OrderList } from "../(components)/Order/OrderList";
import { ProductList } from "../(components)/Product/ProductList";
import { SessionList } from "../(components)/Session/SessionList";
import React from "react";
import authProvider from "../(components)/Auth/AuthProvider";
import SettingsPage from "../(pages)/settings";
import { Route } from "react-router-dom";
import { MyLayout } from "./dashboardLayout";
import { ReceiptLongOutlined } from "@mui/icons-material";
import { CustomerEdit } from "../(components)/Customer/CustomerEdit";

import { OrderShow } from "../(components)/Order/OrderShow";
import { OrderEdit } from "../(components)/Order/OrderEdit";
import { OrderCreate } from "../(components)/Order/OrderCreate";
import { OrderDetails } from "../(components)/Order/OrderDetailsList";
import { PickupspotList } from "../(components)/PickuUpSpot/pickupspotList";
import { PickupspotEdit } from "../(components)/PickuUpSpot/pickupspotEdit";
import ViewPendingOrdersByStore from "../(pages)/viewPendingOrdersByStore";
import { StaffList } from "../(components)/Staff/StaffList";
import { StaffEdit } from "../(components)/Staff/StaffEdit";
import { StaffCreate } from "../(components)/Staff/StaffCreate";
import { StaffShow } from "../(components)/Staff/StaffShow";
import { ProductShow } from "../(components)/Product/ProductShow";
import { ProductEdit } from "../(components)/Product/ProductEdit";
import { ProductCreate } from "../(components)/Product/ProductCreate";
import { PickupspotCreate } from "../(components)/PickuUpSpot/pickupspotCreate";
import { SessionEdit } from "../(components)/Session/SessionEdit";
import { SessionCreate } from "../(components)/Session/SessionCreate";
import { CategoryEdit } from "../(components)/Category/CategoryEdit";
import { CategoryShow } from "../(components)/Category/CategoryShow";
import { CategoryCreate } from "../(components)/Category/CategoryCreate";
import { Chart } from "./DashboardChart";
import { MenudetailEdit } from "../(components)/MenuDetail/MenuDetailEdit";
import { MenudetailShow } from "../(components)/MenuDetail/MenuDetailShow";
import { MenudetailCreate } from "../(components)/MenuDetail/MenuDetailCreate";

const App = () => {
  return (
    <Admin
      dataProvider={simpleRestProvider("https://coccan-api.somee.com/api")}
      authProvider={authProvider}
      dashboard={Chart}
      layout={MyLayout}
      requireAuth
    >
      {(permissions) => (
        <>
          {permissions == "admin" ? (
            <>
              {/* Orders */}
              <Resource
                name="orders"
                list={OrderList}
                show={OrderShow}
                edit={OrderEdit}
                create={OrderCreate}
                icon={ReceiptLongOutlined}
                recordRepresentation={(record) => record.id}
              >
                <Route path=":id/details" element={<OrderDetails />} />
                <Route path="byStore" element={<ViewPendingOrdersByStore />} />
              </Resource>
              <Resource
                name="orderdetails"
                list={OrderdetailList}
                edit={EditGuesser}
                show={ShowGuesser}
                create={EditGuesser}
                recordRepresentation={(record) => record.menuDetailId}
              ></Resource>
              {/* Session configuration */}
              <Resource
                name="sessions"
                list={SessionList}
                show={ShowGuesser}
                edit={SessionEdit}
                create={SessionCreate}
              ></Resource>
              <Resource
                name="locations"
                list={LocationList}
                show={ShowGuesser}
                edit={EditGuesser}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource
                name="timeslots"
                list={TimeslotList}
                show={ShowGuesser}
                edit={EditGuesser}
                recordRepresentation={(record) => {
                  return `${record.startTime}-${record.endTime}`;
                }}
              ></Resource>

              {/* Menu */}
              <Resource
                name="menus"
                list={MenuList}
                show={ShowGuesser}
                edit={EditGuesser}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource
                name="menudetails"
                list={MenudetailList}
                show={MenudetailShow}
                edit={MenudetailEdit}
                create={MenudetailCreate}
                recordRepresentation={(record) =>
                  `${record.product.name} ${record.price}`
                }
              ></Resource>
              {/* Products */}
              <Resource
                name="stores"
                list={StoreList}
                show={ShowGuesser}
                edit={StoreEdit}
                create={StoreCreate}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource
                name="categories"
                list={CategoryList}
                show={CategoryShow}
                edit={CategoryEdit}
                create={CategoryCreate}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource
                name="products"
                list={ProductList}
                show={ProductShow}
                edit={ProductEdit}
                create={ProductCreate}
                recordRepresentation={(record) => record.name}
              ></Resource>
              {/* Accounts */}
              <Resource
                name="customers"
                list={CustomerList}
                show={ShowGuesser}
                edit={CustomerEdit}
                recordRepresentation={(record) => record.fullname}
              ></Resource>
              <Resource
                name="staffs"
                list={StaffList}
                edit={StaffEdit}
                show={StaffShow}
                create={StaffCreate}
                recordRepresentation={(record) => record.fullname}
              ></Resource>
              <Resource
                name="pickupspots"
                list={PickupspotList}
                show={ShowGuesser}
                edit={PickupspotEdit}
                create={PickupspotCreate}
                recordRepresentation={(record) => record.fullname}
              ></Resource>
              {/* Miscellanious */}
            </>
          ) : null}
          {permissions == "staff" ? (
            <>
              <Resource
                name="orders"
                list={OrderList}
                show={OrderShow}
                edit={OrderEdit}
                icon={ReceiptLongOutlined}
                recordRepresentation={(record) => record.id}
              >
                <Route path=":id/details" element={<OrderDetails />} />
                <Route path="byStore" element={<ViewPendingOrdersByStore />} />
              </Resource>
              <Resource
                name="orderdetails"
                list={OrderdetailList}
                show={ShowGuesser}
                recordRepresentation={(record) => record.menuDetailId}
              ></Resource>
              {/* Accounts */}
              <Resource
                name="customers"
                list={CustomerList}
                show={ShowGuesser}
                recordRepresentation={(record) => record.fullname}
              ></Resource>
            </>
          ) : null}
          {/* <CustomRoutes>
            <Route
              path="/settings"
              element={<SettingsPage></SettingsPage>}
            ></Route>
            <Route
              path="/viewPendingOrdersByStore"
              element={<ViewPendingOrdersByStore></ViewPendingOrdersByStore>}
            ></Route>
          </CustomRoutes> */}
        </>
      )}
    </Admin>
  );
};

export default App;
