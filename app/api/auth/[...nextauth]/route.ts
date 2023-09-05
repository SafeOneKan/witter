import NextAuth, {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/Sclient";

import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";
import { CustomSession } from "@/app/lib/types";

const createUserInDB = async (user: User) => {
  // Extract necessary information from the profile
  try {
    const dbuser = await prisma.user.findUnique({
      where: {
        email: user?.email!,
      },
    });
    if (dbuser) return dbuser;

    return await prisma.user.create({
      data: {
        username: user?.name!,
        email: user?.email!,
        photoUrl: user?.image,
      },
    });
  } catch (e) {
    return false;
  }
  // Create the user record in the database
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credential) => {
        if (!credential?.email || !credential?.password)
          throw new Error("Missing credentials");
        const user = await prisma.user.findUnique({
          where: {
            email: credential?.email!,
          },
        });
        if (!user) throw new Error("User not found");

        const isvalidepassword = await compare(
          credential?.password,
          user.password!
        );
        if (!isvalidepassword) throw new Error("Invalid Password Or Email");

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          image: user.photoUrl,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If a user is logged in, add the user's "sub" (subject) to the token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session: async (params) => {
      const user = params.user as User;
      const token = params.token as JWT;
      const session = params.session as CustomSession;

      session.user = { ...session.user, id: token.sub };
      return session;
    },
    signIn: async (params) => {
      const user = params.user as User;
      const dbuser = await createUserInDB(user);

      if (dbuser) params.user.id = dbuser.id;
      return true;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_URL,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
