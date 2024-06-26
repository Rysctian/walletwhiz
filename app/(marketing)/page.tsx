import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { HandCoins } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {

  
    const user = await currentUser();
    if (user) {
      redirect("/dashboard");
    }

  
  return (
    <main className="w-full h-screen items-center justify-center bg-white">
      <div className="container  px-4 md:px-6 ">
        <div className="grid gap-6  items-center">
          <div className="flex flex-col w-full h-screen  justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl py-2 leading-4 font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                <Logo />
                Revolutionize Your Budget Experience
              </h1>
              <p className="max-w-[600px]  text-zinc-600 md:text-xl mx-auto font-semibold">
              Effortlessly track your expenses, set saving goals, and gain insights into your spending habits
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto">
              <form className="flex w-full justify-center gap-3">
                <Button className="bg-gray-600 text-white hover:bg-purple-600 hover:text-white">
                  <Link href="/sign-in">Log-in</Link>
                </Button>

                <Button className="bg-gray-600 text-white hover:bg-purple-600 hover:text-white">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </form>
              <p className="text-xs py-3 text-zinc-400 =0">
                Get started with WalletWhiz today and unlock the path to
                financial freedom!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
