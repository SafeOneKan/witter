"use server";

import { getServerSession } from "next-auth";
import { prisma } from "./Sclient";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CustomSession } from "./types";

export const insertTweet = async (data: FormData, userId: string) => {
  const Content = data.get("area")?.valueOf() as string;
  if (!Content || !userId || userId.length === 0) return false;
  const tweet = await prisma.tweet.create({
    data: {
      content: Content,
      userId: userId,
    },
  });
  return tweet;
};

export const getTweets = async (
  limit: number = 10,
  cursor: { id: string; created_at: Date } | null = null
) => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const currentUser = session?.user;
  const data = await prisma.tweet.findMany({
    skip: cursor ? 1 : 0,
    take: limit,
    cursor: cursor ? { created_at_id: cursor } : undefined,
    orderBy: [
      {
        created_at: "desc",
      },
      {
        id: "desc",
      },
    ],
    select: {
      id: true,
      content: true,
      created_at: true,
      _count: { select: { likes: true } },
      likes: currentUser?.id
        ? {
            where: {
              userId: currentUser?.id,
            },
          }
        : false,
      user: {
        select: {
          id: true,
          username: true,
          photoUrl: true,
        },
      },
    },
  });

  // Initialize lastCursor as null
  // Check if data has at least one record
  if (data.length >= limit) {
    // Set lastCursor to the last record's created_at and id
    cursor = {
      created_at: data[data.length - 1]?.created_at,
      id: data[data.length - 1].id,
    };
  } else if (data.length < limit) {
    cursor = null;
  }
  return {
    data: data.map((tweet) => {
      return {
        id: tweet.id,
        content: tweet.content,
        created_at: tweet.created_at,
        likeCount: tweet._count.likes,
        user: tweet.user,
        likedByUser: tweet.likes.length > 0,
      };
    }),
    lastCursor: cursor,
  };
};
