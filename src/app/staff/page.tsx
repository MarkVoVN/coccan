"use client";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

const App = dynamic(() => import("./dashboard/Dashboard"), { ssr: false });

const Admin: NextPage = () => {
  return <App />;
};

export default Admin;
