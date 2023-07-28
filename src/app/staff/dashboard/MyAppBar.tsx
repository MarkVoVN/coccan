import {
  AppBar,
  LocalesMenuButton,
  RefreshIconButton,
  ToggleThemeButton,
} from "react-admin";
import { BackBtn } from "../(components)/DashboardMenu/back-btn";

export const MyAppBar = () => (
  <AppBar
    toolbar={
      <>
        <BackBtn></BackBtn>
        <RefreshIconButton />
      </>
    }
  />
);
