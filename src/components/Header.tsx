import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import NavLink from "./ui/Navlink";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 mx-10 rounded-b-2xl bg-blue-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/redaxaLogo.png"
          alt="Redaxa"
          width={150}
          height={150}
          className="h-auto w-32"
        />
      </Link>

      <Navigation />

      <Buttons />
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
    <nav>
      <ul className="flex items-center gap-12 text-lg font-medium">
        {navLinks.map((nav, index) => (
          <NavLink key={index} href={nav.href} label={nav.label} />
        ))}
      </ul>
    </nav>
  );
};

const Buttons = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/upload">
        <Button size="lg">Upload</Button>
      </Link>

      <Link href="/login">
        <Button size="lg" variant="secondary">
          Login
        </Button>
      </Link>
    </div>
  );
};
