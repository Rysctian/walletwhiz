"use client";

import SkeletonWrapper from "@/components/Skeleton/SkeletonWrapper";
import { CurrencyComboBox } from "@/components/currency/CurrencyComboBox";
import Navbar from "@/components/layout/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { PlusSquare, Settings, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import CreateDialogCategory from "../dashboard/_components/dialog/create-dialog-category";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import DeleteDialogCategory from "../dashboard/_components/dialog/delete-dialog-category";


function page() {
  return (
    <>
      <Navbar />
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold flex items-center gap-2">
              <Settings />
              Settings
            </p>
            <p className="text-muted-foreground">
              Manage your account settings and categories
            </p>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader >
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <div className="flex flex-col md:flex-row w-full justify-between ">
          <CategoryList type="income" />
          <CategoryList type="expense" />
        </div>
      </div>
    </>
  );
}

export default page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQueryList = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable =
    categoriesQueryList.data && categoriesQueryList.data.length > 0;

  return (
    <div className="lg:w-[48%] w-full  max-h-fit gap-2">
      <SkeletonWrapper isLoading={categoriesQueryList.isFetching}>
        <Card>
          <CardHeader className="text-3xl text-primary font-bold bg-card-foreground/85 rounded-md ">
            <CardTitle className="w-full flex justify-between">
              <div className="text-primary-foreground">
                {type === "income" ? (
                  <div className="flex flex-col gap-2">
                    <TrendingUp className="h-8 w-8 items-center rounded-md " />
                    Income Category
                    <span className="text-sm font-light">Sorted by name</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <TrendingDown className="h-8 w-8 items-center rounded-md " />
                     Expense Category
                    <span className="text-sm font-light">Sorted by name</span>
                  </div>
                )}
              </div>

              <CreateDialogCategory
                type={type}
                successCallBack={() => categoriesQueryList.refetch()}
                trigger={
                  <Button className="gap-2 text-sm" variant={"secondary"}>
                    <PlusSquare className="h-4 w-4" />
                    Create Category
                  </Button>
                }
              />
            </CardTitle>
          </CardHeader>

          <Separator />
          {!dataAvailable && (
            <div className="flex  w-full flex-col items-center justify-center">
              <p>
                No
                <span
                  className={cn(
                    "m-1",
                    type === "income" ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {type}
                </span>
                categories yet
              </p>

              <p className="text-sm text-muted-foreground">
                Create one to get started
              </p>
            </div>
          )}
          {dataAvailable && (
            <div className="grid max-h-fit grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categoriesQueryList.data.map((category: Category) => (
                <CategoryCard category={category} key={category.name} />
              ))}
            </div>
          )}
        </Card>
      </SkeletonWrapper>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md group">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
        <DeleteDialogCategory category={category} trigger={
           <Button
           className=" opacity-0 group-hover:opacity-100 flex border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
           variant={"secondary"}
         >
           <TrashIcon className="h-4 w-4" />
         </Button>
        }/>
      </div>
    </div>
  );
}
