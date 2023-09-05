import { signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import main from "@/styles/Main/home.module.scss";
import NewPost from "../../components/Posts/NewPost";

import PostFeed from "@/components/Posts/PostFeed";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CustomSession } from "../lib/types";
const Page = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className={`${main.container} h-screen w-full`}>
      <NewPost session={session} />
      <PostFeed />
    </div>
  );
};

export default Page;
