import { Session } from "next-auth";

export interface CustomSession extends Session {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export type twet = {
  id: string;
  content: string;
  created_at: Date;
  likeCount: number;
  likedByUser: boolean;
  user: { id: string; username: string; photoUrl: string | null };
};
