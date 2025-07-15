"use client";

import { useState } from "react";
import clsx from "clsx";

import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { Session } from "next-auth";
import Image from "next/image";

import { Button } from "../button";
import AuthForm from "./AuthForm";
import { useLoadingStore } from "@/components/store/loadingStore";
import Spinner from "../Spinner";

export default function AuthButtons({
  isHistory = false,
}: {
  isHistory?: boolean;
}) {
  const { data: session, status } = useSession();

  const googleLoading = useLoadingStore((state) => state.googleLoading);
  const isLoggingIn = googleLoading || status === "loading";

  const fallbackAvatar = `https://api.dicebear.com/8.x/identicon/png?seed=${
    session?.user?.email || "guest"
  }`;
  return (
    <AuthForm session={session} isHistory={isHistory}>
      {session ? (
        <>
          <div className="relative flex gap-3 items-center text-blue-900">
            <UserInfo session={session} fallbackAvatar={fallbackAvatar} />

            <LogoutModal />
          </div>
        </>
      ) : (
        <Button
          type="submit"
          size="lg"
          disabled={googleLoading}
          variant="secondary"
          className={clsx(
            "w-[114px]",
            "max-sm:h-8 max-sm:gap-1.5 max-sm:px-3 max-[370px]:text-xs",
            "max-md:hidden"
          )}
        >
          {!isHistory ? (
            isLoggingIn ? (
              <Spinner size="md" />
            ) : (
              <>
                <FcGoogle size={20} />
                Google
              </>
            )
          ) : googleLoading ? (
            <Spinner size="md" />
          ) : (
            <>
              <FaGoogle size={20} />
              Sign in with Google
            </>
          )}
        </Button>
      )}
    </AuthForm>
  );
}

const UserInfo = ({
  session,
  fallbackAvatar,
}: {
  session: Session;
  fallbackAvatar: string;
}) => {
  return (
    <>
      <Image
        src={session?.user?.image ?? fallbackAvatar}
        alt=""
        width={36}
        height={36}
        className="rounded-full border border-gray-200 max-sm:size-8"
      />
      <span className="font-medium max-sm:text-sm">{session?.user?.name}</span>
    </>
  );
};

const LogoutModal = () => {
  const [showLogout, setShowLogout] = useState(false);
  const logoutLoading = useLoadingStore((state) => state.logoutLoading);
  const isLoggingOut = logoutLoading || status === "loading";

  return (
    <div className="max-md:hidden">
      <EllipsisVertical
        size={20}
        onClick={() => setShowLogout((prev) => !prev)}
        className="cursor-pointer hover:text-teal-500 transition-colors duration-300"
      />
      <AnimatePresence>
        {showLogout && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute p-6 shadow-lg bg-blue-50 top-14 -right-4 rounded-xl"
          >
            <Button
              type="submit"
              size="lg"
              disabled={logoutLoading}
              className="max-sm:h-8 max-sm:gap-1.5 max-sm:px-3 max-[370px]:text-xs w-[100px]"
            >
              {isLoggingOut ? <Spinner size="md" /> : "Logout"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
