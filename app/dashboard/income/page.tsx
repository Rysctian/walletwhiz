import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import IncomePeriodSelector from './_components/income-period';


async function  page() {

    const user = await currentUser();
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
    <div>
        <IncomePeriodSelector userSettings={userSettings}/>

    </div>
  )
}

export default page