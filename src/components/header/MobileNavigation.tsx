"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { AnimatePresence, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";

import { useLoadingStore } from "../store/loadingStore";
import AuthForm from "../ui/auth/AuthForm";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
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
  const { data: session, status } = useSession();
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
      className="absolute top-full left-0 w-full shadow-md z-50 rounded-b-2xl mt-2 bg-blue-50"
    >
      {session && <UserInfo session={session} />}
      <ul className="w-full flex flex-col items-start gap-4 text-lg font-medium p-4  md:hidden">
        {navLinks.map((nav, index) => (
          <NavLink
            key={index}
            href={nav.href}
            label={nav.label}
            onClick={() => setShow(false)}
          />
        ))}

        <AuthButtons session={session} status={status} />
      </ul>
    </motion.nav>
  );
};

const AuthButtons = ({
  session,
  status,
}: {
  session: Session | null;
  status: string;
}) => {
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
        <Button
          type="submit"
          disabled={isLoggingOut}
          size="lg"
          className="w-full"
        >
          {isLoggingOut ? <Spinner size="md" /> : "Logout"}
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          disabled={isLoggingIn}
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

const UserInfo = ({ session }: { session: Session | null }) => {
  const fallbackAvatar = `https://api.dicebear.com/8.x/identicon/png?seed=${
    session?.user?.email || "guest"
  }`;

  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <span className="font-medium text-blue-900 text-lg">
        {session?.user?.name}
      </span>
      <Image
        src={session?.user?.image ?? fallbackAvatar}
        alt=""
        width={36}
        height={36}
        className="rounded-full border border-gray-200"
      />
    </div>
  );
};
