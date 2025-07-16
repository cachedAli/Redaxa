"use client";

import React from "react";

import { useLoadingStore } from "@/components/store/loadingStore";
import { signIn, signOut } from "next-auth/react";
import { useShallow } from "zustand/react/shallow";
import { Session } from "next-auth";
import clsx from "clsx";

type AuthFormProps = {
  children: React.ReactNode;
  isHistory?: boolean;
  session: Session | null;
};
export default function AuthForm({
  children,
  isHistory,
  session,
}: AuthFormProps) {
  const { setGoogleLoading, setLogoutLoading } = useLoadingStore(
    useShallow((state) => ({
      setGoogleLoading: state.setGoogleLoading,
      setLogoutLoading: state.setLogoutLoading,
    }))
  );

  return (
    <form
      className={clsx(
        "w-full",
        isHistory && " flex items-center justify-center"
      )}
      action={async () => {
        setGoogleLoading(true), setLogoutLoading(true);

        if (!isHistory && session) await signOut();
        else await signIn("google");
      }}
    >
      {children}
    </form>
  );
}
