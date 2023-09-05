"use client";
import home from "@/styles/Main/home.module.scss";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { insertTweet } from "@/app/lib/TweetsManager";
import { CustomSession } from "@/app/lib/types";
interface Props {
  session: CustomSession | null;
}

const resizeArea = (textarea: HTMLTextAreaElement) => {
  if (!textarea) return;
  textarea.style.height = "0px";
  textarea.style.height = "fit-content";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const NewPost: React.FC<Props> = ({ session }) => {
  const arearef = useRef<HTMLTextAreaElement>();
  const [areavalue, setareaValue] = useState<string>("");
  const textarea = useCallback((textarea: HTMLTextAreaElement) => {
    resizeArea(textarea);

    arearef.current = textarea;
  }, []);

  useLayoutEffect(() => {
    resizeArea(arearef?.current as HTMLTextAreaElement);
  }, [areavalue]);

  const handle = async (data: FormData) => {
    console.log(await insertTweet(data, session?.user?.id!));
    if (arearef.current) {
      arearef.current.value = "";
      arearef.current.style.height = "fit-content";
    }
  };

  return (
    <form
      className={`${home.NewPost} h-2/6 w-full flex flex-col`}
      action={handle}
    >
      <div className="flex align-center gap-2">
        <Avatar alt="Remy Sharp" src={session?.user?.image || ""} />
        <textarea
          ref={textarea}
          className={` bg-transparent text-2xl w-full outline-none resize-none`}
          name="area"
          id="area"
          value={areavalue}
          onChange={(e) => setareaValue(e.target.value)}
          placeholder="What's on your mind"
          inputMode="text"
        />
      </div>
      <SubButton />
    </form>
  );
};

export default NewPost;

const SubButton = () => {
  const dt = useFormStatus();
  return (
    <button
      disabled={dt.pending}
      className="place-self-end px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white hover:scale-110 disabled:opacity-50 "
    >
      Tweet
    </button>
  );
};
