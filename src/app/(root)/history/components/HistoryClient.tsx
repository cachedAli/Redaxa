import React from "react";

import NotLoggedInHistory from "./NotLoggedInHistory";
import LoggedInHistory from "./LoggedInHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";

export default async function History() {
  const session = await getServerSession(authOptions);

  return session ? (
    <LoggedInHistory session={session} />
  ) : (
    <NotLoggedInHistory />
  );
}
