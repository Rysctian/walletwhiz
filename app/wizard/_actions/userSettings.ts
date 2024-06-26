"use server";

import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schema/userSettings";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
  // check if currency is valid
  const parsedBody = UpdateUserCurrencySchema.safeParse({
    currency,
  });

  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  // check user is authenticated
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Update the user's currency settings in the database
  const userSettings = await prisma.userSettings.update({
    where: {
      // Find the user's settings by their user ID
      userId: user.id,
    },
    // Set the new currency for the user
    data: {
      currency,
    },
  });

  // Return the updated user settings
  return userSettings;
}
