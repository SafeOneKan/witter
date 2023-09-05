import { prisma } from "@/app/lib/Sclient";
import React from "react";

type param = {
  params: { id: string };
};

const page = async ({ params }: param) => {
  const profil = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return <div>{profil?.email}</div>;
};

export default page;
