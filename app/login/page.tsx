import Register from "@/components/Register";
import React from "react";
import sign from "@/styles/signIn/sign.module.scss";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/private");
  const handleSubmit = (
    email: string,
    passwordhashed: string,
    username?: string
  ) => {
    console.log(email, passwordhashed);
  };
  return (
    <div className={sign.cont}>
      <div className={`${sign.title} lg:hidden`}>
        <span>Embera</span>
        <h1>
          Join our vibrant community and experience a new era of communication
        </h1>
      </div>
      <Register login />
    </div>
  );
};

export default Page;
