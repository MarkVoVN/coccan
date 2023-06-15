import Header from "./(common-components)/Header";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "../globals.css";
import { Providers } from "../GlobalRedux/Provider";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}

export default CustomerLayout;
