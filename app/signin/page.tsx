import Register from "@/components/Register";
import sign from "@/styles/signIn/sign.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/private");
  return (
    <div className={`${sign.cont} `}>
      <div className={`${sign.title} phone:hidden`}>
        <span>Embera</span>
        <h1>
          Join our vibrant community and experience a new era of communication
        </h1>
      </div>
      <Register />
    </div>
  );
};

export default page;
