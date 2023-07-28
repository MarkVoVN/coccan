import { Layout } from "react-admin";

import DashboardMenu from "../(components)/DashboardMenu/dashboard-menu";
import { MyAppBar } from "./MyAppBar";

export const MyLayout = (props: any) => (
  <Layout {...props} menu={DashboardMenu} appBar={MyAppBar} />
);
