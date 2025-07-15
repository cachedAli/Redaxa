"use client";

import React from "react";

import { useLoadingStore } from "@/components/store/loadingStore";
import { signIn, signOut } from "next-auth/react";
import { useShallow } from "zustand/react/shallow";
import { Session } from "next-auth";

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
      className="w-full"
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
