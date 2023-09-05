"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

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

export default SubButton;
