import GroupCard from "../components/GroupCard";
import { Link, useSearchParams } from "react-router";
import { useDiscoverGroups } from "../hooks/useDiscoverGroups";
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import PeopleCard from "../components/PeopleCard";
import { useDiscoverPeoples } from "../hooks/useDiscoverPeoples";

export default function DiscoverPage() {
  const [tab, setTab] = useState<"GROUP" | "PEOPLE">("GROUP");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  const groups = useDiscoverGroups(tab === "GROUP", query ?? "");
  const peoples = useDiscoverPeoples(tab === "PEOPLE", query ?? "");

  console.log(groups.data);

  return (
    <main
      id="Main-Content-Container"
      className="relative flex flex-1 flex-col bg-white overflow-y-auto"
    >
      <section
        id="Nav-Top"
        className="relative w-full p-[30px] bg-[linear-gradient(93.23deg,_#FFFFFF_0%,_#EFF2F7_90%)] flex flex-col gap-[30px] border-b border-heyhao-border"
      >
        <img
          src="/assets/images/backgrounds/ornament-discover-left.png"
          className="absolute h-[252px] bottom-0 left-0"
          alt="ornament"
        />
        <img
          src="/assets/images/backgrounds/ornament-discover-right.png"
          className="absolute h-[252px] top-0 right-0"
          alt="ornament"
        />
        <div className="flex items-center justify-between relative z-30">
          <SearchForm />
          <ul className="flex items-center gap-4">
            <li className="group">
              <a href="">
                <div className="flex items-center gap-1">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/images/icons/code.svg"
                      className="size-6 opacity-100 shrink-0 group-[&.active]:opacity-0 group-hover:opacity-0 transition-all duration-300"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/code-black.svg"
                      className="size-6 opacity-0 top-0 absolute shrink-0 group-[&.active]:opacity-100 group-hover:opacity-100 transition-all duration-300"
                      alt="icon"
                    />
                  </div>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-dark-grey group-[&.active]:text-heyhao-black group-hover:text-heyhao-black transition-all duration-300">
                    Programmer
                  </p>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="">
                <div className="flex items-center gap-1">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/images/icons/bezier.svg"
                      className="size-6 opacity-100 shrink-0 group-[&.active]:opacity-0 group-hover:opacity-0 transition-all duration-300"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/bezier-black.svg"
                      className="size-6 opacity-0 top-0 absolute shrink-0 group-[&.active]:opacity-100 group-hover:opacity-100 transition-all duration-300"
                      alt="icon"
                    />
                  </div>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-dark-grey group-[&.active]:text-heyhao-black group-hover:text-heyhao-black transition-all duration-300">
                    UIUX Design
                  </p>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="">
                <div className="flex items-center gap-1">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/images/icons/path-2.svg"
                      className="size-6 opacity-100 shrink-0 group-[&.active]:opacity-0 group-hover:opacity-0 transition-all duration-300"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/path-2-black.svg"
                      className="size-6 opacity-0 top-0 absolute shrink-0 group-[&.active]:opacity-100 group-hover:opacity-100 transition-all duration-300"
                      alt="icon"
                    />
                  </div>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-dark-grey group-[&.active]:text-heyhao-black group-hover:text-heyhao-black transition-all duration-300">
                    Graphic Designer
                  </p>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="">
                <div className="flex items-center gap-1">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/images/icons/video-play.svg"
                      className="size-6 opacity-100 shrink-0 group-[&.active]:opacity-0 group-hover:opacity-0 transition-all duration-300"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/video-play-black.svg"
                      className="size-6 opacity-0 top-0 absolute shrink-0 group-[&.active]:opacity-100 group-hover:opacity-100 transition-all duration-300"
                      alt="icon"
                    />
                  </div>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-dark-grey group-[&.active]:text-heyhao-black group-hover:text-heyhao-black transition-all duration-300">
                    Entertainment
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        {query !== null ? (
          <header className="flex items-center justify-between relative z-30">
            <h1 className="font-bold text-[42px] leading-[52.5px]">
              Search Result: {query}
            </h1>
            <div
              id="TabButtons"
              className="flex items-center gap-[2px] p-1 bg-heyhao-grey rounded-xl"
            >
              <button
                type="button"
                onClick={() => setTab("GROUP")}
                className={`leading-[20px] transition-all duration-300 px-[26.5px] py-[14px] rounded-xl ${
                  tab === "GROUP"
                    ? "bg-heyhao-blue font-medium hover:bg-heyhao-blue hover:text-white text-white"
                    : "hover:bg-heyhao-blue bg-white font-medium hover:text-white text-heyhao-secondary"
                }`}
              >
                Groups
              </button>
              <button
                type="button"
                onClick={() => setTab("PEOPLE")}
                className={`leading-[20px] transition-all duration-300 px-[26.5px] py-[14px] rounded-xl ${
                  tab === "PEOPLE"
                    ? "bg-heyhao-blue font-medium hover:bg-heyhao-blue hover:text-white text-white"
                    : "hover:bg-heyhao-blue bg-white font-medium hover:text-white text-heyhao-secondary"
                }`}
              >
                People
              </button>
            </div>
          </header>
        ) : (
          <header className="flex items-center justify-between relative z-30">
            <h1 className="font-bold text-[42px] leading-[52.5px]">
              Discover And Explore 🚀 <br />A Community On{" "}
              <span className="text-heyhao-blue">HeyHao</span>.
            </h1>
            <Link to="/home/settings/create-group">
              <div className="flex items-center gap-1 py-[14px] px-[26px] rounded-full bg-heyhao-blue">
                <p className="font-bold leading-[20px] text-white">
                  Create Group
                </p>
                <img
                  src="/assets/images/icons/add-circle-white-fill.svg"
                  alt="icon"
                  className="size-6 shrink-0"
                />
              </div>
            </Link>
          </header>
        )}
      </section>
      <div className="w-full flex flex-col gap-[30px] p-[30px]">
        {tab === "GROUP" && (
          <section id="Featured-Groups" className="flex flex-col gap-[12px]">
            <h2 className="font-semibold text-xl leading-[25px]">
              Featured Groups
            </h2>
            <div id="Cards-Item" className="grid grid-cols-3 gap-4">
              {groups.data?.map((item) => (
                <GroupCard
                  key={item.id}
                  data={{
                    name: item.name,
                    about: item.about,
                    id: item.id,
                    photo: item.photo_url,
                    totalMembers: item.room._count.RoomMember,
                    type: item.type,
                  }}
                />
              ))}
            </div>
          </section>
        )}
        {tab === "PEOPLE" && (
          <section id="ContainerPeople" className="w-full p-[30px]">
            <div id="Result-People" className="flex flex-col gap-4">
              <h2 className="font-semibold text-xl leading-[25px]">
                Features Peoples
              </h2>
              <div id="People-Item" className="grid grid-cols-2 gap-4">
                {peoples.data?.map((item) => (
                  <PeopleCard
                    key={item.id}
                    data={{
                      id: item.id,
                      createdAt: item.createdAt,
                      name: item.name,
                      photo: item.photo_url,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        <section id="Pagination" className="mx-auto">
          <ul className="flex items-center gap-4">
            <div id="Step-Before" className="group nonactive shrink-0">
              <button
                type="button"
                id="Step-Before-Active"
                className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
              >
                <img
                  src="/assets/images/icons/arrow-left.svg"
                  alt="icon"
                  className="size-6 shrink-0"
                />
              </button>
              <button
                disabled
                type="button"
                id="Step-Before-Nonactive"
                className="group-[&.nonactive]:block group-[&.active]:hidden p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
              >
                <img
                  src="/assets/images/icons/arrow-left-nonactive.svg"
                  alt="icon"
                  className="size-6 shrink-0"
                />
              </button>
            </div>
            <div id="Steps" className="flex items-center gap-4">
              <li className="group active">
                <a href="">
                  <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                      1
                    </p>
                  </div>
                </a>
              </li>
              <li className="group">
                <a href="">
                  <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                      2
                    </p>
                  </div>
                </a>
              </li>
              <li className="group">
                <a href="">
                  <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                      3
                    </p>
                  </div>
                </a>
              </li>
            </div>
            <div id="Step-After" className="group active shrink-0">
              <button
                type="button"
                id="Step-After-Active"
                className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
              >
                <img
                  src="/assets/images/icons/arrow-left.svg"
                  alt="icon"
                  className="size-6 rotate-180"
                />
              </button>
              <button
                disabled
                type="button"
                id="Step-After-Nonactive"
                className="group-[&.nonactive]:block group-[&.active]:hidden p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
              >
                <img
                  src="/assets/images/icons/arrow-left-nonactive.svg"
                  alt="icon"
                  className="size-6 rotate-180"
                />
              </button>
            </div>
          </ul>
        </section>
      </div>
    </main>
  );
}
