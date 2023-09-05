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
        className={`tablet:border-r-[0.2px] phone:border-t-[.5px] phone:py-3
         flex justify-center tablet:h-screen  tablet:sticky phone:fixed tablet:top-0 phone:bottom-0
           phone:h-fit phone:w-screen tablet:w-fit tablet:px-2 z-10
             bg-slate-200 dark:bg-slate-800 `}
      >
        <ul className="flex phone:flex-row tablet:flex-col items-center text-2xl gap-4">
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
