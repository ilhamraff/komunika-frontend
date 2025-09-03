import { Link, useParams } from "react-router";
import { useDetailGroup } from "../hooks/useDetailGroup";
import { formatDate } from "../../../shared/utils/helper";
import GroupPaidInfo from "../components/GroupPaidInfo";
import GroupFreeInfo from "../components/GroupFreeInfo";

export default function DetailGroupPage() {
  const { groupId } = useParams();

  const { data, isLoading } = useDetailGroup(groupId ?? "");

  return (
    <main
      id="Main-Content-Container"
      className="relative flex flex-1 flex-col bg-white overflow-y-auto"
    >
      <section
        id="Nav-Top"
        className="relative w-full p-[30px] bg-white border-b border-heyhao-border flex items-center justify-between"
      >
        <header className="flex flex-col gap-[12px]">
          <h1 className="font-bold text-2xl leading-[30px]">
            Group Details Overview
          </h1>
          <nav>
            <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
              <li>
                <Link to="/home/discover" className="hover:underline">
                  Discover Groups
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-medium leading-5 text-heyhao-blue">
                  Group Profile
                </span>
              </li>
            </ol>
          </nav>
        </header>
        <ul className="flex items-center gap-5">
          <li className="shrink-0">
            <a href="#">
              <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                <img
                  src="/assets/images/icons/like.svg"
                  className="size-6"
                  alt="icon"
                />
              </div>
            </a>
          </li>
          <li className="shrink-0">
            <a href="#">
              <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                <img
                  src="/assets/images/icons/dislike.svg"
                  className="size-6"
                  alt="icon"
                />
              </div>
            </a>
          </li>
          <li className="shrink-0">
            <a href="#">
              <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                <img
                  src="/assets/images/icons/flag-2.svg"
                  className="size-6"
                  alt="icon"
                />
              </div>
            </a>
          </li>
          <li className="shrink-0">
            <a href="#">
              <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                <img
                  src="/assets/images/icons/link.svg"
                  className="size-6"
                  alt="icon"
                />
              </div>
            </a>
          </li>
        </ul>
      </section>
      <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="w-full flex min-h-[calc(100vh-123px)]">
          <div className="p-[30px] bg-white flex flex-col gap-[30px] w-full">
            <section id="Group-Name" className="flex flex-col gap-[12px]">
              <h2 className="font-semibold leading-5">Group Name</h2>
              <div className="flex items-center justify-between p-4 border border-heyhao-border rounded-2xl">
                <div className="flex items-center gap-[12px]">
                  <div className="flex justify-center items-center size-[64px] shrink-0 rounded-full overflow-hidden">
                    <img
                      src={data?.photo_url}
                      alt="image"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative z-10">
                    <h3 className="line-clamp-1 font-semibold text-lg leading-[22.5px]">
                      {data?.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/profile-2user-green.svg"
                        alt="icon"
                        className="size-4 shrink-0"
                      />
                      <div className="flex gap-1">
                        <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">
                          {data?.room._count.RoomMember}
                        </p>
                        <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">
                          Members
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {data?.type === "PAID" ? (
                  <div className="shrink-0 flex items-center gap-[2px] py-[6px] px-2 bg-[#165DFF17] rounded-full">
                    <img
                      src="/assets/images/icons/crown-blue-fill.svg"
                      alt="icon"
                      className="size-4 shrink-0"
                    />
                    <p className="font-bold text-sm leading-[17.5px] text-heyhao-blue">
                      VIP
                    </p>
                  </div>
                ) : (
                  <div className="shrink-0 flex items-center gap-[2px] py-[6px] px-2 bg-[#165DFF17] rounded-full">
                    <p className="font-bold text-sm leading-[17.5px] text-heyhao-green">
                      FREE
                    </p>
                  </div>
                )}
              </div>
            </section>
            <section id="About-Group" className="flex flex-col gap-[12px]">
              <h2 className="font-semibold leading-5">About Group</h2>
              <p className="font-medium leading-[32px] text-heyhao-secondary">
                {data?.about}
              </p>
            </section>
            <section id="Group-Owner" className="flex flex-col gap-[12px]">
              <h2 className="font-semibold leading-5">Group Owner</h2>
              <div className="group flex items-center border border-heyhao-border p-4 rounded-2xl justify-between">
                <div className="flex items-center gap-[12px]">
                  <div className="flex items-center shrink-0 justify-center size-[50px] rounded-full overflow-hidden">
                    <img
                      src={data?.room.RoomMember[0].user.photo_url}
                      alt="image"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <img
                          src="/assets/images/icons/owner-badge-blue-fill.svg"
                          alt="icon"
                          className="shrink-0 size-5"
                        />
                        <h3 className="font-semibold leading-5">
                          {data?.room.RoomMember[0].user.name}
                        </h3>
                      </div>
                      <span
                        id="Offline"
                        className="hidden items-center gap-1 font-medium text-sm leading-[17.5px] text-heyhao-secondary"
                      >
                        <p>•</p>
                        <p>Offline</p>
                      </span>
                      <span
                        id="Online"
                        className="flex text-heyhao-green items-center gap-1 font-semibold text-sm leading-[17.5px]"
                      >
                        <p>•</p>
                        <p>Online</p>
                      </span>
                    </div>
                    <div className="flex items-center gap-[2px] font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                      <p>Member Since:</p>
                      <img
                        src="/assets/images/icons/calendar-2.svg"
                        alt="icon"
                        className="size-4 shrink-0"
                      />
                      <p>
                        {formatDate(
                          data?.room.RoomMember[0].joinedAt ?? new Date()
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/home/chats" className="shrink-0">
                  <div className="flex items-center gap-[2px] py-[14px] px-4 rounded-xl bg-[#165DFF17] backdrop-blur-sm">
                    <img
                      src="/assets/images/icons/messages-2-blue.svg"
                      alt="icon"
                      className="size-4 shrink-0"
                    />
                    <p className="font-semibold text-sm leading-[17.5px] text-heyhao-blue">
                      Message
                    </p>
                  </div>
                </Link>
              </div>
            </section>
            <section id="Group-Media" className="flex flex-col gap-[12px]">
              <h2 className="font-semibold leading-5">Group Media</h2>
              <div className="flex flex-col gap-4">
                {data?.GroupAsset.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border border-heyhao-border p-4 rounded-2xl justify-between"
                  >
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[44px] shrink-0 bg-[#ED6B6017] rounded-2xl flex justify-center items-center">
                        <img
                          src="/assets/images/icons/document-text-red-fill.svg"
                          alt="icon"
                          className="size-6"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold leading-5">
                          {item.filename}
                        </h3>
                        <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                          Total Size: 40 GB
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm leading-[21px] bg-[linear-gradient(97.03deg,_#165DFF_-14.12%,_#30A9EE_114.12%)] bg-clip-text text-transparent">
                      VIP Media
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="w-[560px] shrink-0 bg-heyhao-grey p-[30px] flex flex-col gap-[30px]">
            <section
              id="Build-Community"
              className="relative flex flex-col gap-5 pt-6 px-[30px] rounded-3xl overflow-hidden shrink-0"
            >
              <img
                src="/assets/images/backgrounds/ornament-group-profile.png"
                alt="image"
                className="absolute top-0 left-0 w-full h-full"
              />
              <div className="flex items-center justify-between gap-20 relative z-10">
                <strong className="font-bold text-[30px] leading-[37.5px]">
                  Build Community For Better Future
                </strong>
                <img
                  src="/assets/images/icons/medal-star-black-fill.svg"
                  alt="icon"
                  className="size-[62px] shrink-0"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-t-3xl bg-white gap-2 relative z-10">
                <img
                  src="/assets/images/photos/Group Members.png"
                  alt="image"
                  className="w-[156px] shrink-0"
                />
                <p className="font-semibold leading-[22.4px]">
                  Over{" "}
                  <span className="font-bold text-heyhao-blue">52,600+</span>{" "}
                  people already own groups. You’re next!
                </p>
              </div>
            </section>
            {data?.type === "PAID" ? (
              <GroupPaidInfo data={data} />
            ) : (
              <GroupFreeInfo />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
