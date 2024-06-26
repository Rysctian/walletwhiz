"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MaxDateRange } from "@/lib/constants";
import { UserSettings } from "@prisma/client";
import {
  differenceInCalendarMonths,
  differenceInDays,
  startOfMonth,
} from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { CircleMinus, Plus } from "lucide-react";
import CreateDialogTransaction from "./dialog/create-dialog-transaction";
import CategoryCard from "./CategoryCard";
import HistoryChart from "./history-chart";
import DataCard from "./DataCard";


function DashboardOverview({ userSettings }: { userSettings: UserSettings }) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="justify-between flex flex-col-reverse  md:flex-row gap-5">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MaxDateRange) {
                toast.error(
                  `The selected date range is too big. Max allowed range is ${MaxDateRange} days!`
                );
                return;
              }

              setDateRange({ from, to });
            }}
          />

          <div className="gap-x-5 flex">
            <CreateDialogTransaction
              type="income"
              trigger={
                <Button
                  variant={"outline"}
                  className="bg-[#16a34a] gap-x-1 w-[50%] hover:text-white text-white bg  hover:bg-emerald-600 "
                >
                  <Plus size={15} /> Income
                </Button>
              }
            />

            <CreateDialogTransaction
              type="expense"
              trigger={
                <Button
                  variant={"outline"}
                  className="bg-[#e11d48] gap-x-1 w-[50%] hover:text-white text-white  hover:bg-red-600 border-red-800"
                >
                  <CircleMinus size={15} />
                  Expenses
                </Button>
              }
            />
          </div>
        </div>

        <div className="flex w-full flex-col">
          <DataCard
            userSettings={userSettings}
            from={dateRange.from}
            to={dateRange.to}
          />
        </div>

        <div className="w-full flex flex-wrap justify-between mt-3">
          <div className="w-full lg:w-[70%] ">
            <HistoryChart userSettings={userSettings} />
          </div>

          <div className="w-full lg:w-[29%]">
            <CategoryCard
              userSettings={userSettings}
              from={dateRange.from}
              to={dateRange.to}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardOverview;
