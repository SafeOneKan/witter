"use server";

import { signIn } from "next-auth/react";
import { prisma } from "./Sclient";
import { hash } from "bcrypt";

import error from "../signin/error";
import { ZodError } from "zod";

export const Register_cred = async (data: FormData) => {
  const username = data.get("username")?.valueOf() as string;
  const email = data.get("email")?.valueOf() as string;
  const password = data.get("password")?.valueOf() as string;

  const hashedpassword = await hash(password, 10);
  const dbuser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        {
          email: email,
        },
      ],
    },
  });
  if (dbuser) throw new Error("User already exists");

  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedpassword,
    },
  });

  return true;
};
