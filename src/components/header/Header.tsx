import React from "react";
import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import MobileNavigation from "./MobileNavigation";
import AuthButtons from "../ui/auth/AuthButtons";
import { Button } from "@/components/ui/button";
import NavLink from "./Navlink";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <div
        className={clsx(
          "relative mx-10 flex items-center justify-between p-4 rounded-b-2xl bg-blue-50",
          "max-sm:mx-4"
        )}
      >
        {/* Logo */}
        <Link href="/" className="max-md:order-2">
          <Image
            src="/redaxaLogo.png"
            alt="Redaxa"
            width={100}
            height={40}
            className={clsx("object-contain", "max-md:w-28", "max-sm:w-24")}
            priority
          />
        </Link>

        <Navigation />
        <MobileNavigation />
        <Buttons />
      </div>
    </header>
  );
}

const Navigation = () => {
  const navLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/#features",
      label: "Features",
    },
    {
      href: "/history",
      label: "History",
    },
  ];
  return (
    <nav className="max-md:hidden">
      <ul className={clsx("flex items-center gap-12 text-lg font-medium")}>
        {navLinks.map((nav, index) => (
          <NavLink key={index} href={nav.href} label={nav.label} />
        ))}
      </ul>
    </nav>
  );
};

const Buttons = () => {
  return (
    <div className="flex items-center gap-2 max-md:order-3">
      <Link href="/upload">
        <Button
          size="lg"
          className="max-sm:h-8 max-sm:gap-1.5 max-sm:px-3 max-[370px]:text-xs"
        >
          Upload
        </Button>
      </Link>
      <AuthButtons />
    </div>
  );
};
