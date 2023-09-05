import React from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const HeartButton = async ({ likedByMe }: { likedByMe?: boolean }) => {
  const { data: session } = useSession();
  return <div>ata skt takwa</div>;
};

export default HeartButton;
