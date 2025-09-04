import { Outlet } from "react-router";
import Siderbar from "./SiderBar";

export default function LayoutPage() {
  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <aside className="flex h-screen w-fit">
        <Siderbar />
      </aside>
      <Outlet />
    </div>
  );
}
