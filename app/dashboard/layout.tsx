import Navbar from "@/components/layout/navbar";
import TabsComponent from "@/components/tabs/Tabs";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className=" relative h-screen w-full items-center ">
      <Navbar />

      <TabsComponent />

      {children}
    </div>
  );
}

export default layout;
