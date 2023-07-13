import { Layout } from "react-admin";

import DashboardMenu from "../(components)/DashboardMenu/dashboard-menu";

export const MyLayout = (props: any) => (
  <Layout {...props} menu={DashboardMenu} />
);
