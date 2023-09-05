"use client";
import { SessionProvider } from "next-auth/react";
const ProviderSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProvider;
