import { Divider } from "@mui/material";
import React from "react";
import { Menu } from "react-admin";

function DashboardMenu() {
  return (
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
      {/* References to pages
       <Menu.Item
        to="/custom-route"
        primaryText="Miscellaneous"
        leftIcon={<Label />}
      /> */}
    </Menu>
  );
}

export default DashboardMenu;
