import { Label } from "@mui/icons-material";

import { Divider } from "@mui/material";
import React from "react";
import { Menu, usePermissions } from "react-admin";

function DashboardMenu() {
  const { isLoading, permissions } = usePermissions();

  return (
    <>
      {permissions == "admin" ? (
        <Menu>
          <Menu.DashboardItem />
          <Divider></Divider>
          <Menu.ResourceItem name="orders" />
          <Menu.ResourceItem name="orderdetails" />
          <Divider></Divider>
          <Menu.ResourceItem name="sessions" />
          <Menu.ResourceItem name="locations" />
          <Menu.ResourceItem name="timeslots" />
          <Divider></Divider>
          <Menu.ResourceItem name="menus" />
          <Menu.ResourceItem name="menudetails" />
          <Divider></Divider>
          <Menu.ResourceItem name="stores" />
          <Menu.ResourceItem name="categories" />
          <Menu.ResourceItem name="products" />
          <Divider></Divider>

          <Menu.ResourceItem name="customers" />
          <Menu.ResourceItem name="staffs" />
          <Menu.ResourceItem name="pickupspots" />
        </Menu>
      ) : (
        <Menu>
          {/* <Menu.DashboardItem />
      <Divider></Divider> */}
          <Menu.ResourceItem name="orders" />
          <Menu.ResourceItem name="orderdetails" />
          <Divider></Divider>
          <Menu.ResourceItem name="sessions" />
          {/* <Menu.ResourceItem name="locations" />
      <Menu.ResourceItem name="timeslots" />
      <Divider></Divider>
      <Menu.ResourceItem name="menus" />
      <Menu.ResourceItem name="menudetails" />
      <Divider></Divider>
      <Menu.ResourceItem name="stores" />
      <Menu.ResourceItem name="categories" />
      <Menu.ResourceItem name="products" /> */}
          <Divider></Divider>
          <Menu.ResourceItem name="customers" />
          {/* <Menu.ResourceItem name="staffs" />
      <Menu.ResourceItem name="pickupspots" /> */}
        </Menu>
      )}
      {/* <Menu.Item
        to="/viewPendingOrdersByStore"
        primaryText="Orders By Store"
        leftIcon={<Label />}
      /> */}
    </>
  );
}

export default DashboardMenu;
