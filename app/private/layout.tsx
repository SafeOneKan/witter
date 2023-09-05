import { ReactNode } from "react";
import SideBar from "../../components/SideBar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`flex phone:flex-col tablet:flex-row`}>
      <SideBar />
      <div className="flex-grow ">
        <div className="px-4 py-5 bg-slate-200 sticky top-0 z-10 dark:bg-slate-800">
          Home
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
