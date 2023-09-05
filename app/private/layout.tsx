import { ReactNode } from "react";
import SideBar from "../../components/SideBar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`flex sm:flex-col`}>
      <SideBar />
      <div className="flex-grow">
        <div className="px-4 py-5 bg-slate-400"></div>
        {children}
      </div>
    </div>
  );
};

export default layout;
