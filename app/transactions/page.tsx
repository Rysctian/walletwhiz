"use client";

import Navbar from "@/components/layout/navbar";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MaxDateRange } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import { Wallet } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import TransactionTable from "./_components/transaction-table";

function page() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <Navbar />
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold flex items-center gap-2">
              <Wallet />
              Transactions
            </p>
            <p className="text-muted-foreground">
              Manage your account transactions
            </p>
          </div>
          <div className="flex flex-col">
          <small className="text-muted-foreground ml-1">Select date range</small>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              // We update the date range only if both dates are set

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
          
          </div>
        </div>
      </div>
      <div className="container">
        <TransactionTable from={dateRange.from} to={dateRange.to}/>
      </div>
    </>
  );
}

export default page;
