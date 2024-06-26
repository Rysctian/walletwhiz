

import Logo, { MobileLogo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserButton, currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { CurrencyComboBox } from '@/components/currency/CurrencyComboBox'
import { redirect } from 'next/navigation'


async function page() {
    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }
  
    return (
        <div className='container md:w-[50%] flex items-center justify-center gap-4 flex-col'>
            <div className='flex items-center justify-center gap-4 flex-col'>
                <div className='flex flex-wrap justify-center font-medium gap-1 h-full items-center'>
                    <h2 className='md:text-[2rem] text-[2rem] tracking-tighter xl:text-[3.5rem] font-extrabold'>Welcome to </h2>
                    <Logo />
                </div>
                <h2 className='font-medium text-[1.3rem] md:text-[1rem] text-center md:justify-center'>Let&apos;s get started by selecting your preferred currency!</h2>
                <p className='text-[.89rem] text-muted-foreground'>NOTE: You can change this setting anytime after setup </p>
            </div>
            <Separator />
            <Card className='w-full flex flex-col'>
                <CardHeader>Currency
                    <CardDescription>
                        Select your default currency for you transactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CurrencyComboBox />
                </CardContent>
            </Card>      
            <Separator />
            
            <Button className='w-full md:w-[13em] place-self-start' asChild>
                <Link href={"/dashboard"}>
                    Submit!    
                </Link>
            </Button>

        </div>
    )
}

export default page