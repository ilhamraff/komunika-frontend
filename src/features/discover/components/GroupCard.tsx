import { Link } from "react-router";

interface CardProps {
  id: string;
  name: string;
  photo: string;
  totalMembers: number;
  type: string;
  about: string;
}

type GroupCardProps = {
  data: CardProps;
};

export default function GroupCard({ data }: GroupCardProps) {
  return (
    <div className="card group vip rounded-3xl border border-heyhao-border relative overflow-hidden p-6 flex flex-col gap-4">
      <img
        src="/assets/images/backgrounds/ornament-featured.png"
        alt="icon"
        className="absolute bottom-0 right-0 h-[210px] opacity-0 group-hover:opacity-100 transition-all duration-300"
      />
      <div className="flex items-center justify-between relative z-10">
        <div className="flex justify-center items-center rounded-full overflow-hidden size-[64px] shrink-0">
          <img src={data.photo} alt="icon" className="size-full object-cover" />
        </div>
        {data.type === "PAID" && (
          <div className="hidden group-[&.vip]:flex items-center gap-[2px] py-[6px] px-2 bg-[#165DFF17] rounded-full">
            <img
              src="/assets/images/icons/crown-blue-fill.svg"
              alt="icon"
              className="size-4 shrink-0"
            />
            <p className="font-bold text-sm leading-[17.5px] text-heyhao-blue">
              VIP
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 relative z-10">
        <h3 className="line-clamp-1 font-semibold text-lg leading-[22.5px]">
          {data.name}
        </h3>
        <div className="flex items-center gap-1">
          <img
            src="/assets/images/icons/profile-2user-green.svg"
            alt="icon"
            className="size-4 shrink-0"
          />
          <div className="flex gap-1">
            <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">
              {data.totalMembers}
            </p>
            <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">
              Members
            </p>
          </div>
        </div>
      </div>
      <p className="relative z-10 font-medium text-sm leading-[25.2px] text-heyhao-secondary line-clamp-2">
        {data.about}
      </p>
      <Link to={`/home/discover/group/${data.id}`} className="relative z-10">
        <div className="flex items-center gap-[2px]">
          <p className="font-semibold text-sm leading-[17.5px] text-heyhao-blue hover:underline">
            View Group Details
          </p>
          <img
            src="/assets/images/icons/arrow-right-blue.svg"
            alt="icon"
            className="size-[12px] shrink-0"
          />
        </div>
      </Link>
    </div>
  );
}
