import { Outlet } from "react-router";

export default function LayoutPage() {
  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <aside className="flex h-screen w-fit">
        <nav className="flex flex-col h-full justify-between items-center w-[84px] shrink-0 py-[30px] px-5 bg-heyhao-grey">
          <ul className="flex flex-col gap-5">
            <li>
              <a href="#">
                <img
                  src="/assets/images/logos/logo-icon.svg"
                  className="flex w-11 h-9 shrink-0"
                  alt="logo"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="#"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center group-[.active]:bg-heyhao-blue hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/menu.svg"
                  className="size-6 group-[.active]:hidden"
                  alt="icon"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="my-revenue.html"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center group-[.active]:bg-heyhao-blue hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/chart-square-grey.svg"
                  className="size-6 group-[.active]:hidden"
                  alt="icon"
                />
                <img
                  src="/assets/images/icons/chart-square-white-fill.svg"
                  className="size-6 hidden group-[.active]:flex"
                  alt="icon"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="message-room-chat-no-display.html"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center group-[.active]:bg-heyhao-blue hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/messages.svg"
                  className="size-6 group-[.active]:hidden"
                  alt="icon"
                />
                <img
                  src="/assets/images/icons/messages-white-fill.svg"
                  className="size-6 hidden group-[.active]:flex"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
          <ul className="flex flex-col gap-5">
            <li className="group">
              <a
                href="settings-general-settings.html"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center group-[.active]:bg-heyhao-blue hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/setting-2.svg"
                  className="size-6 group-[.active]:hidden"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="size-11 flex shrink-0 bg-white rounded-full overflow-hidden hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/photos/Profile User.png"
                  className="w-full h-full object-cover"
                  alt="photo"
                />
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <Outlet />
    </div>
  );
}
