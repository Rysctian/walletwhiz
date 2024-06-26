"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo, { MobileLogo } from "../ui/logo";
import { HandCoins, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeSwitchButton } from "../ui/ThemeSwitchButton";
import { UserButton } from "@clerk/nextjs/app-beta";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "Home",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: "Home",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "Home",
  },
];

function Navbar() {
  const pathName = usePathname();

  function MobileNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    function handleLinkClick() {
      setIsOpen(false);
    }

    return (
      <div className="md:hidden border-separate flex bg-background w-full">
        <nav className="flex">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[65%] sm:w-[540px]" side="left">
              <div className="flex flex-col justify-start mt-8 gap-4 w-full">
                <MobileLogo />
                {links.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Link
                      onClick={handleLinkClick}
                      className={` h-full w-full p-3 rounded-sm ${
                        link.href === pathName
                          ? "bg-foreground text-muted"
                          : " "
                      }`}
                      key={link.name}
                      href={link.href}
                    >
                      <span className="font-semibold text-[1rem]">
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        <div className=" self-center place-self-center">
          <MobileLogo />
        </div>
      </div>
    );
  }

  function DesktopNavbar() {
    return (
      <div className="w-full block  h-[4.9rem] items-center justify-center bg-background md:px-4 border-b  ">
        <nav className="flex w-full h-full items-center justify-between ">
          {/* LOGO */}
          <div className="flex w-full h-full items-center">
            <a
              href="/"
              className="hidden md:flex items-center h-full justify-center gap-3 "
            >
              <div className="text-[1.9rem] font-extrabold tracking-tighter  bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                WalletWhiz
              </div>
              <HandCoins color="purple" height={40} width={40} />
            </a>

            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <div key={link.name} className="relative flex items-center">
                  <Link
                    href={link.href}
                    className={`flex gap-9 h-full items-center justify-center ${
                      link.href === pathName ? "font-bold " : ""
                    }`}
                  >
                    <LinkIcon />
                    <div className="hidden md:block">{link.name}</div>
                  </Link>
                  {link.href === pathName && (
                    <div className="absolute -bottom-[27px] left-[66%] hidden h-[2px] w-[90%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
                  )}
                </div>
              );
            })}
            <MobileNavBar />
          </div>
          <div className="flex gap-3 items-center">
            <ThemeSwitchButton />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </nav>
      </div>
    );
  }
  return (
    <>
      <DesktopNavbar />
    </>
  );
}

export default Navbar;
