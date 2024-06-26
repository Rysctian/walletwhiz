import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function GET(req: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }


  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });


  if (!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userId: user.id,
        currency: "USD",
      },
    });
  }

  revalidatePath("/dashboard")
  return Response.json(userSettings);
}
