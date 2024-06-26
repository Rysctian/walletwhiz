"use client";

import { getCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import SkeletonWrapper from "@/components/Skeleton/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/date-utc";
import { TransactionType } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface CategoryCardProps {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

function CategoryCard({ userSettings, from, to }: CategoryCardProps) {
  const dataBalanceQuery = useQuery<getCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(
      dataBalanceQuery.data?.currency || userSettings.currency
    );
  }, [dataBalanceQuery.data?.currency, userSettings.currency]);

  return (
    <div >
      <h1 className="text-[1.7rem] font-bold">Categories</h1>
      <div className="flex flex-col h-full gap-4 ">
        <SkeletonWrapper isLoading={dataBalanceQuery.isFetching}>
          <CategoriesCard
            title={"Income"}
            formatter={formatter}
            type="income"
            data={dataBalanceQuery.data?.stats || []}
          />
        </SkeletonWrapper>
        <SkeletonWrapper isLoading={dataBalanceQuery.isFetching}>
          <CategoriesCard
            title={"Expense"}
            formatter={formatter}
            type="expense"
            data={dataBalanceQuery.data?.stats || []}
          />
        </SkeletonWrapper>
      </div>
    </div>
  );
}

export default CategoryCard;

interface CategoriesCardProps {
  data: getCategoriesStatsResponseType;
  type: TransactionType;
  formatter: Intl.NumberFormat;
  title: string;
}

function CategoriesCard({ title, data, type, formatter }: CategoriesCardProps) {
  const filteredData = data.filter((value: any) => value.type === type);
  const total = filteredData.reduce(
    (acc, value) => acc + (value._sum.amount || 0),
    0
  );

  return (
    <Card className="h-[14rem] ">
      <CardHeader>
        <CardTitle className="self-center">
          <span className=" text-primary">{title} </span>
        </CardTitle>

        <div className="">
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center ">
              No data for selected date
              <p className="text-sm text-muted-foreground flex flex-col items-center justify-centers">
                Try selecting a different period or try adding new{" "}
                {type === "income" ? "income" : "expense"}
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[9.2rem] w-full px-4 ">
              <div className="flex w-full flex-col gap-4 mt-1">
                {filteredData.map((item: any) => {
                  const amount = item._sum.amount || 0;
                  return (
                    <div key={item.category} className="">
                      <span className="">
                        <div className="flex text-sm w-full items-center justify-between">
                          <span className="flex items-center text-primary">
                            {item.categoryIcon}
                            {item.category}
                          </span>

                          <p>{formatter.format(amount)}</p>
                        </div>
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
