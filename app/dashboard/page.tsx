import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardOverview from "./_components/dashboard-overview";

export default async function Page() {

  const user = await currentUser()

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="container mt-3">
      <DashboardOverview userSettings={userSettings} />
    </div>
  );
}
