"use client";

import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import NavLink from "./Navlink";

export default function MobileNavigation() {
  const [show, setShow] = useState(false);
  return (
    <div className="hidden max-md:block max-md:order-1">
      {!show ? (
        <Menu size={20} onClick={() => setShow(true)} />
      ) : (
        <X size={20} onClick={() => setShow(false)} />
      )}

      <AnimatePresence>
        {show && <Navigation setShow={setShow} />}
      </AnimatePresence>
    </div>
  );
}

const Navigation = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full shadow-md z-50 mt-2"
    >
      <ul className="w-full flex flex-col items-start gap-4 text-lg rounded-b-2xl font-medium bg-blue-50 p-4  md:hidden">
        {navLinks.map((nav, index) => (
          <NavLink
            key={index}
            href={nav.href}
            label={nav.label}
            onClick={() => setShow(false)}
          />
        ))}
      </ul>
    </motion.nav>
  );
};
