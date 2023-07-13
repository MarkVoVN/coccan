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
                icon={ReceiptLongOutlined}
                recordRepresentation={(record) => record.id}
              ></Resource>
              <Resource
                name="orderdetails"
                list={OrderdetailList}
                recordRepresentation={(record) => record.menuDetailId}
              ></Resource>
              {/* Session configuration */}
              <Resource name="sessions" list={SessionList}></Resource>
              <Resource name="locations" list={LocationList}></Resource>
              <Resource name="timeslots" list={TimeslotList}></Resource>
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
              {/* Miscellanious */}
            </>
          ) : null}
          {permissions == "shipper" ? (
            <>
              <Resource name="stores" list={StoreList}></Resource>
              <Resource name="categories" list={CategoryList}></Resource>
              <Resource
                name="customers"
                list={CustomerList}
                recordRepresentation={(record) => record.fullname}
              ></Resource>
              <Resource name="menudetails" list={MenudetailList}></Resource>
              <Resource
                name="menus"
                list={MenuList}
                recordRepresentation={(record) => record.name}
              ></Resource>
              <Resource name="orderdetails" list={OrderdetailList}></Resource>
              <Resource name="orders" list={OrderList}></Resource>
              <Resource name="products" list={ProductList}></Resource>
              <Resource name="locations" list={LocationList}></Resource>
              <Resource name="timeslots" list={TimeslotList}></Resource>
            </>
          ) : null}
          <CustomRoutes>
            <Route
              path="/settings"
              element={<SettingsPage></SettingsPage>}
            ></Route>
          </CustomRoutes>
        </>
      )}
    </Admin>
  );
};

export default App;
