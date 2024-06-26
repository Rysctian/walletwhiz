import React from 'react'
import HistoryChart from '../_components/history-chart'
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import prisma from '@/lib/prisma';

async function   page() {

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
    <div className='container mt-20'>
         <HistoryChart userSettings={userSettings} />
    </div>
  )
}

export default page