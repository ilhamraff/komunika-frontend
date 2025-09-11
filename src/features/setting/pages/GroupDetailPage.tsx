import { Link, useParams } from "react-router";
import Siderbar from "../../../shared/components/Siderbar";
import { useGetGroup } from "../hooks/useGetGroup";
import {
  downloadAsset,
  formatDate,
  formatRupiah,
} from "../../../shared/utils/helper";
import { useMemo } from "react";

export default function GroupDetailPage() {
  const { id } = useParams();
  const { data } = useGetGroup(id ?? "");

  const owner = useMemo(() => {
    return data?.room.RoomMember.find((member) => member.role.role === "OWNER");
  }, [data?.room.RoomMember]);

  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <aside className="flex h-screen w-fit">
        <Siderbar />
      </aside>
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
              My Group Details
            </h1>
            <nav>
              <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                <li>
                  <Link to="/home/settings/groups" className="hover:underline">
                    Settings
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="font-medium leading-5 text-heyhao-blue">
                    Group Details
                  </span>
                </li>
              </ol>
            </nav>
          </header>
          <Link to={`/home/settings/groups/edit/${id}`}>
            <div className="flex items-center gap-2 py-[14px] px-[32px] rounded-full bg-heyhao-blue">
              <p className="font-bold leading-[20px] text-white">Edit Group</p>
              <img
                src="/assets/images/icons/edit-white-fill.svg"
                alt="icon"
                className="size-6 shrink-0"
              />
            </div>
          </Link>
        </section>
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="w-full flex min-h-[calc(100vh-123px)]">
            <div className="p-[30px] bg-white flex flex-col gap-[30px] w-[636px] shrink-0">
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
                    <div
                      id="Free"
                      className="flex shrink-0 items-center gap-[2px] py-[6px] px-[15.5px] bg-heyhao-grey rounded-full !w-fit"
                    >
                      <p className="font-bold text-sm leading-[17.5px] text-heyhao-secondary">
                        Free
                      </p>
                    </div>
                  )}
                </div>
              </section>
              <section id="About-Group" className="flex flex-col gap-[12px]">
                <h2 className="font-semibold leading-5">About Group</h2>
                <p className="font-semibold leading-[32px]">{data?.about}</p>
              </section>
              <section id="Group-Owner" className="flex flex-col gap-[12px]">
                <h2 className="font-semibold leading-5">Group Owner</h2>
                <div className="group online flex items-center border border-heyhao-border p-4 rounded-2xl justify-between">
                  <div className="flex items-center gap-[12px]">
                    <div className="flex items-center shrink-0 justify-center size-[50px] rounded-full overflow-hidden">
                      <img
                        src={owner?.user.photo_url}
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
                            {owner?.user.name}
                          </h3>
                        </div>
                        <span
                          id="Online"
                          className="hidden group-[&.online]:flex text-heyhao-green items-center gap-1 font-medium text-sm leading-[17.5px]"
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
                        <p>{formatDate(owner?.joinedAt ?? new Date())}</p>
                      </div>
                    </div>
                  </div>
                  <Link to="" className="shrink-0">
                    <div className="flex items-center gap-[2px] py-[14px] px-4 rounded-xl bg-[#165DFF17] backdrop-blur-sm">
                      <img
                        src="/assets/images/icons/user-edit-blue.svg"
                        alt="icon"
                        className="size-4 shrink-0"
                      />
                      <p className="font-semibold text-sm leading-[17.5px] text-heyhao-blue">
                        Change Owner
                      </p>
                    </div>
                  </Link>
                </div>
              </section>
              <section id="Group-Member" className="flex flex-col gap-[12px]">
                <h2 className="font-semibold leading-5">Group Member</h2>
                <div className="members flex flex-col gap-4">
                  {data?.room.RoomMember.map((member, index) => (
                    <div
                      key={`member-${member.user.name}-${index + 1}`}
                      className="member group online flex items-center border border-heyhao-border p-[12px] rounded-2xl justify-between"
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="flex items-center shrink-0 justify-center size-[50px] rounded-full overflow-hidden">
                          <img
                            src={member.user.photo_url}
                            alt="image"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px]">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold leading-5">
                              {member.user.name}
                            </h3>
                            <span
                              id="Online"
                              className="hidden group-[&.online]:flex text-heyhao-green items-center gap-1 font-medium text-sm leading-[17.5px]"
                            >
                              <p>•</p>
                              <p>Online</p>
                            </span>
                          </div>
                          <div className="flex items-center gap-[2px] font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                            <img
                              src="/assets/images/icons/profile-tick-grey.svg"
                              alt="icon"
                              className="size-4 shrink-0"
                            />
                            <p>Member Since:</p>
                            <p>{formatDate(member.joinedAt ?? new Date())}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <button type="button" className="shrink-0">
                          <div className="flex items-center gap-[2px] py-[14px] px-4 rounded-xl bg-[#ED6B6017] backdrop-blur-sm">
                            <img
                              src="/assets/images/icons/judge-red-fill.svg"
                              alt="icon"
                              className="size-4 shrink-0"
                            />
                            <p className="font-semibold text-sm leading-[17.5px] text-heyhao-coral">
                              Ban Now
                            </p>
                          </div>
                        </button>
                        <Link to="/home/chats" className="shrink-0">
                          <div className="size-[44px] flex justify-center items-center bg-heyhao-blue rounded-xl">
                            <img
                              src="/assets/images/icons/messages-2-white-fill.svg"
                              alt="icon"
                              className="shrink-0 size-6"
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="#">
                  <div className="flex items-center justify-between bg-heyhao-grey p-4 rounded-xl">
                    <div className="flex items-center gap-[6px]">
                      <img
                        src="/assets/images/icons/add-square-grey.svg"
                        alt="icon"
                        className="size-4 shrink-0"
                      />
                      <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                        Load More
                      </p>
                    </div>
                    <img
                      src="/assets/images/icons/arrow-circle-right-grey.svg"
                      alt="icon"
                      className="size-4 shrink-0"
                    />
                  </div>
                </Link>
              </section>
            </div>
            <div className="flex flex-1 bg-heyhao-grey">
              <div className="w-[560px] shrink-0 bg-heyhao-grey p-[30px] flex flex-col gap-[30px]">
                <div
                  id="Group-Media-Container"
                  className="p-6 rounded-3xl bg-white flex flex-col gap-6"
                >
                  <section
                    id="Group-Media"
                    className="flex flex-col gap-[12px]"
                  >
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
                              {/* <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                                Total Size: -
                              </p> */}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              downloadAsset(item.file_url, item.filename)
                            }
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <img
                              src="/assets/images/icons/receive-square-blue.svg"
                              alt="icon"
                              className="size-4 shrink-0"
                            />
                            <p className="font-semibold text-sm leading-[21px] text-heyhao-blue">
                              Download
                            </p>
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <div
                  id="Benefit-Group-Container"
                  className="p-6 rounded-3xl bg-white flex flex-col gap-6"
                >
                  <section
                    id="Benefit-Group"
                    className="flex flex-col gap-[12px]"
                  >
                    <h2 className="font-semibold leading-5">Benefit Group</h2>
                    <div className="flex-col flex gap-[12px]">
                      {data?.benefit.map((item, index) => (
                        <div
                          key={`benefit-${index + 1}`}
                          className="flex items-center gap-[6px]"
                        >
                          <img
                            src="/assets/images/icons/checklist-green-fill.svg"
                            alt="icon"
                            className="size-[24px] shrink-0"
                          />
                          <p className="font-semibold leading-5">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <hr className="border-heyhao-border" />
                  <section
                    id="Group-Price"
                    className="flex flex-col gap-[12px]"
                  >
                    <h2 className="font-semibold leading-5">Group Price</h2>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        className="font-semibold text-2xl leading-[30px] text-heyhao-coral focus:outline-none"
                        value={formatRupiah(data?.price ?? 0)}
                        readOnly
                      />
                      <div className="py-[6px] px-2 rounded-lg bg-heyhao-grey flex items-center gap-[2px]">
                        <img
                          src="/assets/images/icons/clock-grey-fill.svg"
                          alt="icon"
                          className="size-4 shrink-0"
                        />
                        <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                          LIFETIME
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
