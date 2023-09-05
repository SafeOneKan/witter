"use client";
import { signOut } from "next-auth/react";
import React from "react";

interface Props {}

const LogOut = () => {
  return <button onClick={() => signOut()}>Log Out</button>;
};

export default LogOut;
