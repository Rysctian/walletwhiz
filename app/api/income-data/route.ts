import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const periods = await getHistoryIncomePeriods(user.id);
  return Response.json(periods);
}

export type GetHistoryIncomePeriodsResponseType = Awaited<
  ReturnType<typeof getHistoryIncomePeriods>
>;

async function getHistoryIncomePeriods(userId: string) {
  const result = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      {
        year: "asc",
      },
    ],
  });

  const years = result.map((val) => val.year);
  if (years.length === 0) {
    return [new Date().getFullYear()];
  }

  return years;
}