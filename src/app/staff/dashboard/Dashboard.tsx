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

const App = () => {
  return (
    <Admin
      dataProvider={simpleRestProvider("https://coccan-api.somee.com/api")}
      authProvider={authProvider}
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
              <Resource name="sessions" list={SessionList}></Resource>
              <Resource
                name="locations"
                list={LocationList}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource
                name="timeslots"
                list={TimeslotList}
                recordRepresentation={(record) => {
                  return `${record.startTime}-${record.endTime}`;
                }}
              ></Resource>
              {/* Menu */}
              <Resource
                name="menus"
                list={MenuList}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource name="menudetails" list={MenudetailList}></Resource>
              {/* Products */}
              <Resource
                name="stores"
                list={StoreList}
                edit={StoreEdit}
                create={StoreCreate}
              ></Resource>
              <Resource name="categories" list={CategoryList}></Resource>
              <Resource name="products" list={ProductList}></Resource>
              {/* Accounts */}
              <Resource
                name="customers"
                list={CustomerList}
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
                edit={PickupspotEdit}
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
              {/* Accounts */}
              <Resource
                name="customers"
                list={CustomerList}
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
