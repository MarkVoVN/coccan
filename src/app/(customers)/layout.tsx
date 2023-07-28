import Header from "./(common-components)/Header";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "../globals.css";
import { Providers } from "../GlobalRedux/Provider";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./(common-components)/Footer";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Header></Header>
      {children}
      <Footer></Footer>
      {/* </ThemeProvider> */}
    </>
  );
}

export default CustomerLayout;
