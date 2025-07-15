"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Menu, X } from "lucide-react";

import { useSession } from "next-auth/react";
import AuthForm from "../ui/auth/AuthForm";
import { Button } from "../ui/button";
import NavLink from "./Navlink";
import { useShallow } from "zustand/react/shallow";
import { useLoadingStore } from "../store/loadingStore";
import Spinner from "../ui/Spinner";

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

        <AuthButtons />
      </ul>
    </motion.nav>
  );
};

const AuthButtons = () => {
  const { data: session, status } = useSession();

  const { googleLoading, logoutLoading } = useLoadingStore(
    useShallow((state) => ({
      googleLoading: state.googleLoading,
      logoutLoading: state.logoutLoading,
    }))
  );

  const isLoggingIn = googleLoading || status === "loading";
  const isLoggingOut = logoutLoading || status === "loading";
  
  return (
    <AuthForm session={session}>
      {session ? (
        <Button type="submit" size="lg" className="w-full">
          {isLoggingOut ? <Spinner size="md" /> : "Logout"}
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          variant="secondary"
          className={clsx("w-full")}
        >
          {isLoggingIn ? (
            <Spinner size="md" />
          ) : (
            <>
              <FcGoogle size={20} />
              Sign in with Google
            </>
          )}
        </Button>
      )}
    </AuthForm>
  );
};
