import { Link, Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function LayoutPage() {
  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <aside className="flex h-screen w-fit">
        <Sidebar />
      </aside>

      <Outlet />
    </div>
  );
}
