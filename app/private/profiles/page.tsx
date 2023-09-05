import { prisma } from "@/app/lib/Sclient";
import React from "react";

type Props = {
  props: { id: string };
};

const page = async ({ props }: Props) => {
  const user = await prisma.user.findUnique({
    where: {
      id: props.id,
    },
  });
  return <div>{user?.username}</div>;
};

export default page;
