"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import hamburger from "@/public/assets/icons/menu.svg";
import brandLogo from "@/public/assets/images/brand-logo.png";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href={"/"} className="md:py-2">
        <Image src={brandLogo} alt="brand" width={160} height={28} />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image src={hamburger} alt="menu" width={24} height={24} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Image src={brandLogo} alt="brand" width={160} height={28} />
                </SheetTitle>
              </SheetHeader>
              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`${
                        isActive &&
                        "bg-gradient-to-r from-purple-500 to-purple-600"
                      } ${
                        isActive ? "text-white" : "text-dark-700"
                      } w-full p-18 flex whitespace-nowrap  rounded-md`}
                    >
                      <Link className="sidebar-link" href={link.route}>
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={20}
                          height={20}
                          className={`${isActive && "brightness-200"}`}
                        />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
