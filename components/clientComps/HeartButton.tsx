"use client";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/lib/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { redirect } from "next/navigation";
import { PutLike } from "@/app/lib/TweetsManager";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../Hooks/useLikeMutation";

const HeartButton = ({
  likedByMe,
  likeCount = 0,
  tweetId,
}: {
  likedByMe?: boolean;
  likeCount?: number;
  tweetId: string;
}) => {
  const { data: session }: { data: CustomSession | null } = useSession();

  const Heart = likedByMe ? AiFillHeart : AiOutlineHeart;

  const styles = "ml-12 w-fit flex justify-center content-center gap-4";
  const [_likeCount, setLikeCount] = useState(likeCount);
  const [_likedByMe, setLikedByMe] = useState(likedByMe);

  const handleClick = async () => {
    if (!session?.user) {
      return redirect("/auth/signin");
    }
    if (likedByMe) return;
    await PutLike(tweetId, session?.user?.id!);
    setLikeCount((pre) => pre + 1);
    setLikedByMe(true);
  };
  const d = useCustomMutation("like", handleClick, "tweets");

  return (
    <div className="flex gap-2">
      <button
        disabled={d.isLoading}
        onClick={() => d.mutate()}
        className={`${styles} cursor-pointer transition-all duration-200 ease-out disabled:stroke-none`}
      >
        <div
          className={`flex content-center self-center ${
            _likedByMe
              ? "text-red-500"
              : "hover:drop-shadow-2xl hover:scale-110 fill-red-700"
          } `}
        >
          <Heart />
        </div>
      </button>
      <span>{_likeCount}</span>
    </div>
  );
};

export default HeartButton;
