import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import LogOut from "./clientComps/LogOut";
import { CustomSession } from "@/app/lib/types";
import ThemeChanger from "./clientComps/ThemeChanger";
const SideBar = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/");
  } else {
    return (
      <div
        className={`border-r-2 flex justify-center  w-[5vw] h-screen sticky top-0  sm:h-fit sm:w-screen z-10 sm:bottom-0 `}
      >
        <ul className="flex sm:flex-row flex-col items-center text-2xl gap-4">
          <li>
            <Link href="/private">Home</Link>
          </li>
          <li>
            <Link href={`/private/profiles/${session?.user.id}`}>Profile</Link>
          </li>
          <li>
            <LogOut />
          </li>
          <li>
            <ThemeChanger />
          </li>
        </ul>
      </div>
    );
  }
};

export default SideBar;
