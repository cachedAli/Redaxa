"use client";

import React from "react";

import NotLoggedInHistory from "./NotLoggedInHistory";
import LoggedInHistory from "./LoggedInHistory";
import { useSession } from "next-auth/react";

export default function History() {
  const { data: session } = useSession();

  return session ? <LoggedInHistory /> : <NotLoggedInHistory />;
}
