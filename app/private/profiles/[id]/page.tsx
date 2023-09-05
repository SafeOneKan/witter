import { prisma } from "@/app/lib/Sclient";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const profil = await prisma.user.findUnique({
    where: {
      id: params.slug.valueOf(),
    },
  });
  return <div>{profil?.email}</div>;
};

export default page;
