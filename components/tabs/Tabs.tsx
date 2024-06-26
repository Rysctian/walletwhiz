"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const tabLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    value: "overview",
  },
  {
    name: "Income",
    href: "/dashboard/income",
    value: "income",
  },
  {
    name: "Expense",
    href: "/dashboard/expense",
    value: "expense",
  },
  {
    name: "Chart",
    href: "/dashboard/chart",
    value: "chart",
  },
];

function TabsComponent() {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTabName, setActiveTabName] = useState("Overview");

  useEffect(() => {
    const currentTab = tabLinks.find((link) => pathName.includes(link.value));
    if (currentTab) {
      setActiveTab(currentTab.value);
      setActiveTabName(currentTab.name);
    }
  }, [pathName]);

  const currentDate = new Date().toString().split(" ").splice(1, 3).join(" ");
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b bg-card">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-4 mb-2 shadow-muted-foreground  rounded-md">
        <div className="flex flex-col ">
          <h1 className="font-bold text-[2rem]">Dashboard</h1>

          <div>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
              className="space-y-4"
            >
              <TabsList>
                {tabLinks.map((link) => (
                  <TabsTrigger key={link.value} value={link.value}>
                    <Link
                      href={link.href}
                      className={`${
                        link.href === pathName ? "font-bold" : " "
                      }`}
                    >
                      {link.name}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col  gap-x-6 text-primary">
          <small>Date & Time Today:</small>
          <span className="font-semibold text-base"> {currentDate} - {currentTime}</span>
        </div>
      </div>
    </div>
  );
}

export default TabsComponent;
