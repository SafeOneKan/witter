"use client";
import Link from "next/link";
import { twet } from "../../app/lib/types";
import { Avatar } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import HeartButton from "./HeartButton";
const TweetCard = (prop: twet) => {
  return (
    <li key={prop.id} className="flex flex-col py-11 px-10 border-b gap-2">
      <div className="flex gap-2">
        <Link
          className="flex content-center gap-2"
          href={`/private/profiles/${prop.user.id}`}
        >
          <Avatar src={prop.user.photoUrl || ""} alt="photo" />
          <span className="self-center font-bold">{prop.user.username}</span>
        </Link>
        <span className="self-center">-</span>
        <span className="self-center">
          {prop.created_at.toLocaleDateString()}
        </span>
      </div>
      <p className="whitespace-pre-wrap pl-12">{prop.content}</p>
    </li>
  );
};

export default TweetCard;
