import { formatDate } from "../../../shared/utils/helper";

type People = {
  id: string;
  photo: string;
  name: string;
  createdAt: string;
};

interface PeopleCardProps {
  data: People;
}

export default function PeopleCard({ data }: PeopleCardProps) {
  return (
    <div className="people group border border-heyhao-border p-6 rounded-3xl flex items-center justify-between relative overflow-hidden">
      <img
        src="/assets/images/backgrounds/ornament-people.png"
        alt="icon"
        className="absolute bottom-0 right-0 h-[112px] opacity-0 group-hover:opacity-100 transition-all duration-300"
      />
      <div className="flex items-center gap-4 w-full">
        <div className="flex items-center justify-center rounded-full overflow-hidden size-[64px] shrink-0">
          <img
            src={data.photo}
            alt="image"
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-[6px] w-full">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg leading-[22.5px] line-clamp-1">
              {data.name}
            </h3>
            <span className="flex text-heyhao-green items-center gap-1 font-semibold text-sm leading-[17.5px]">
              <p>•</p>
              <p>Online</p>
            </span>
          </div>
          <div className="flex items-center gap-[2px] font-medium text-sm leading-[17.5px] text-heyhao-secondary">
            <img
              src="/assets/images/icons/calendar-2.svg"
              alt="icon"
              className="size-4 shrink-0"
            />
            <p>Joined:</p>
            <p>{formatDate(data.createdAt)}</p>
          </div>
        </div>
      </div>
      <a href="message-room-chat-people.html" className="shrink-0">
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
      </a>
    </div>
  );
}
