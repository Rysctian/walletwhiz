import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const incomeTransactions = await prisma.category.findMany({
    where: {
      userId: user.id,
      type: " income",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(incomeTransactions, {
    status: 200,
  });
}
