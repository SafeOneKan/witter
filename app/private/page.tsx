import main from "@/styles/Main/home.module.scss";
import NewPost from "../../components/Posts/NewPost";

import PostFeed from "@/components/Posts/PostFeed";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CustomSession } from "../lib/types";
import { useSession } from "next-auth/react";
const Page = () => {
  const { data: session }: { data: CustomSession | null } = useSession();
  return (
    <div className={`${main.container} h-screen w-full`}>
      <NewPost session={session} />
      <PostFeed />
    </div>
  );
};

export default Page;
