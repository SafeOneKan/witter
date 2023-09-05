import React from "react";

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
