import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import SkeletonWrapper from "@/components/Skeleton/SkeletonWrapper";
import { Card } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/date-utc";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import CountUp from "react-countup";

interface DataCardProps {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

function DataCard({ userSettings, from, to }: DataCardProps) {
  const dataStatsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(
      dataStatsQuery.data?.currency || userSettings.currency
    );
  }, [dataStatsQuery.data?.currency, userSettings.currency]);

  const income = dataStatsQuery.data?.income || 0;
  const expense = dataStatsQuery.data?.expense || 0;
  const balance = income - expense;

  return (
    <div className="relative flex w-full flex-wrap gap-2  md:flex-nowrap">
      <SkeletonWrapper isLoading={dataStatsQuery.isFetching}>
        <StatsCard
          formatter={formatter}
          value={income}
          title="Income"
          icon={
            <TrendingUp className="h-9 w-9 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={dataStatsQuery.isFetching}>
        <StatsCard
          formatter={formatter}
          value={expense}
          title="Expense"
          icon={
            <TrendingDown className="h-9 w-9 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={dataStatsQuery.isFetching}>
        <StatsCard
          formatter={formatter}
          value={balance}
          title="Balance"
          icon={
            <Wallet className="h-9 w-9 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
          from={from}
          to={to}
        />
      </SkeletonWrapper>
    </div>
  );
}

export default DataCard;

function StatsCard({
  formatter,
  value,
  title,
  icon,
  from,
  to,
}: {
  from?: Date;
  to?: Date;
  value: number;
  title: string;
  icon: React.ReactNode;
  formatter: Intl.NumberFormat;
}) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Card className="flex h-[9rem] w-full items-center gap-2 p-4">
      <div className="flex flex-col items-center w-full font-semibold">
        <div className="flex w-full justify-between">
          <p className="text-muted-foreground">{title}</p>
          <p>{icon}</p>
        </div>
        <div className="flex-start">
          <p className="text-2xl font-bold">{formatter.format(value)}</p>
        </div>
        {from && to && (
          <small className="text-muted-foreground font-light text-[.700rem]">
            {from.toLocaleDateString(undefined, dateOptions)} - {to.toLocaleDateString(undefined, dateOptions)}
          </small>
        )}
      </div>
    </Card>
  );
}
