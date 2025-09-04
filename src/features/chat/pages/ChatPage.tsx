import { Link } from "react-router";
import Siderbar from "../../../shared/components/SiderBar";
import SearchModal from "../components/SearchModal";
import EmptyActiveRoom from "../components/EmptyActiveRoom";

export default function ChatPage() {
  return (
    <>
      <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
        <aside className="flex h-screen w-fit">
          <Siderbar />
          <div
            id="Sidebar"
            className="flex flex-col w-[360px] shrink-0 h-screen rounded-l-3xl border-r border-heyhao-border bg-white overflow-hidden"
          >
            <div
              id="Top-Bar"
              className="flex items-center justify-between border-b border-heyhao-border py-6 px-5 gap-3"
            >
              <p className="font-semibold text-2xl">Chats</p>
              <ul className="flex gap-3">
                <li className="group">
                  <Link
                    to="#"
                    className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                  >
                    <img
                      src="/assets/images/icons/document-filter.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </Link>
                </li>
                <li className="group">
                  <button
                    id="Search"
                    className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                  >
                    <img
                      src="/assets/images/icons/search-normal.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <div
              id="Menu"
              className="flex flex-col flex-1 p-5 pb-0 gap-5 overflow-hidden"
            >
              <Link to="/home/discover">
                <div className="relative flex items-center rounded-2xl ring-1 ring-heyhao-border overflow-hidden hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                  <img
                    src="/assets/images/backgrounds/discover-group-bg.png"
                    className="absolute w-full h-full object-cover"
                    alt="background"
                  />
                  <div className="relative flex items-center justify-between rounded-2xl w-full p-5 gap-[10px]">
                    <div>
                      <p className="font-medium leading-5">
                        Discover More Groups
                      </p>
                      <p className="font-medium text-sm text-heyhao-secondary">
                        Tingkatkan skills & networking
                      </p>
                    </div>
                    <img
                      src="/assets/images/icons/crown-blue-bg.svg"
                      className="flex size-11 shrink-0"
                      alt="icon"
                    />
                  </div>
                </div>
              </Link>
              <div
                id="Tab-Buttons-Container"
                className="flex items-center gap-0.5 rounded-xl p-1 bg-heyhao-grey"
              >
                <button
                  type="button"
                  className="tab-btn group w-full active"
                  data-target="All"
                >
                  <div className="w-full rounded-xl py-[10px] px-6 text-center group-[.active]:bg-white group-hover:bg-white transition-all duration-300">
                    <span className="text-heyhao-secondary group-[.active]:font-medium group-[.active]:text-heyhao-blue group-hover:text-heyhao-blue transition-all duration-300">
                      All
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  className="tab-btn group w-full"
                  data-target="Groups"
                >
                  <div className="w-full rounded-xl py-[10px] px-6 text-center group-[.active]:bg-white group-hover:bg-white transition-all duration-300">
                    <span className="text-heyhao-secondary group-[.active]:font-medium group-[.active]:text-heyhao-blue group-hover:text-heyhao-blue transition-all duration-300">
                      Groups
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  className="tab-btn group w-full"
                  data-target="People"
                >
                  <div className="w-full rounded-xl py-[10px] px-6 text-center group-[.active]:bg-white group-hover:bg-white transition-all duration-300">
                    <span className="text-heyhao-secondary group-[.active]:font-medium group-[.active]:text-heyhao-blue group-hover:text-heyhao-blue transition-all duration-300">
                      People
                    </span>
                  </div>
                </button>
              </div>
              <div
                id="tabs-content-container"
                className="flex flex-1 h-full overflow-hidden"
              >
                <div id="All" className="relative tab-content w-full h-full">
                  <div className="flex flex-col h-full gap-1">
                    <p className="text-sm text-heyhao-secondary">
                      All Message (5)
                    </p>
                    <div
                      id="Message-container"
                      className="flex h-full w-full overflow-y-scroll hide-scrollbar"
                    >
                      <div className="flex flex-col w-full gap-1">
                        <Link
                          to="message-room-chat-people.html"
                          className="chats-card group last:pb-8"
                        >
                          <div className="flex items-center rounded-2xl p-4 gap-3 group-[.active]:bg-heyhao-card-grey hover:bg-heyhao-card-grey transition-all duration-300">
                            <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden border border-heyhao-border">
                              <img
                                src="/assets/images/photos/photo-1.png"
                                className="w-full h-full object-cover"
                                alt="photo"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                              <div className="flex items-center justify-between gap-[6px]">
                                <p className="font-medium leading-5 max-w-[182px] truncate">
                                  Masayoshi
                                </p>
                                <span className="text-xs text-heyhao-secondary">
                                  Now
                                </span>
                              </div>
                              <div className="flex items-center gap-1 justify-between">
                                <div className="w-full max-w-[178px] text-sm text-heyhao-secondary line-clamp-1 mt-1">
                                  <p className="flex items-center gap-1 text-heyhao-secondary group-[.new]:text-heyhao-black group-[.typing]:!hidden">
                                    <span className="truncate">
                                      {" "}
                                      Sama-sama bro, thanks juga udah join{" "}
                                    </span>
                                  </p>
                                  <p className="hidden group-[.typing]:!flex text-heyhao-blue truncate">
                                    Maiden is typing...
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="message-room-chat-group.html"
                          className="chats-card group last:pb-8"
                        >
                          <div className="flex items-center rounded-2xl p-4 gap-3 group-[.active]:bg-heyhao-card-grey hover:bg-heyhao-card-grey transition-all duration-300">
                            <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden border border-heyhao-border">
                              <img
                                src="/assets/images/photos/bwa.svg"
                                className="w-full h-full object-cover"
                                alt="photo"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                              <div className="flex items-center justify-between gap-[6px]">
                                <p className="font-medium leading-5 max-w-[182px] truncate">
                                  Laravel PHP Indonesia
                                </p>
                                <span className="text-xs text-heyhao-secondary">
                                  12:12
                                </span>
                              </div>
                              <div className="flex items-center gap-1 justify-between">
                                <div className="w-full max-w-[178px] text-sm text-heyhao-secondary line-clamp-1 mt-1">
                                  <p className="flex items-center gap-1 text-heyhao-secondary group-[.new]:text-heyhao-black group-[.typing]:!hidden">
                                    <span className="truncate">
                                      {" "}
                                      Alex: Itu redirect() ngapain ya abis
                                      pesenan berhasil{" "}
                                    </span>
                                  </p>
                                  <p className="hidden group-[.typing]:!flex text-heyhao-blue truncate">
                                    Maiden is typing...
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <EmptyActiveRoom />
      </div>
      <SearchModal />
    </>
  );
}
