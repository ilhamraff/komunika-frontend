import { formatDate } from "../../../shared/utils/helper";
import { useGetProfile } from "../hooks/useGetProfile";

type Props = {
  userId: string;
  onClose: () => void;
};

export default function PersonalInfoModal({ userId, onClose }: Props) {
  const { profile } = useGetProfile(userId);

  return (
    <div
      id="Info-Modal"
      className="absolute inset-0 z-50 flex bg-heyhao-black/80 overflow-hidden"
    >
      <div className="flex flex-col h-screen ml-auto mr-0 w-[520px] shrink-0 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-heyhao-border py-6 px-5">
          <p className="font-semibold text-lg">Personal Info</p>
          <div className="group">
            <button
              id="Close-Info"
              type="button"
              onClick={() => onClose()}
              className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
            >
              <img
                src="/assets/images/icons/close-circle-grey.svg"
                className="size-6"
                alt="icon"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-scroll hide-scrollbar">
          <div
            id="Header"
            className="flex flex-col items-center py-8 px-6 gap-4 border-b border-heyhao-border"
          >
            <div className="flex size-[120px] rounded-full overflow-hidden">
              <img
                src={profile?.photo_url}
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col items-center gap-[6px]">
              <div className="flex items-center justify-center gap-[6px]">
                <p className="font-semibold text-lg">{profile?.name}</p>
                <div className="flex items-center gap-0.5">
                  <span className="flex size-2 shrink-0 rounded-full bg-heyhao-green"></span>
                  <p className="font-medium text-sm text-heyhao-green">
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 font-semibold text-sm">
                <img
                  src="/assets/images/icons/calendar-2.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
                <span className="text-heyhao-secondary">Joined:</span>
                <span className="text-heyhao-secondary">
                  {formatDate(profile?.createdAt ?? new Date())}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 h-[72px] w-full">
              <div className="group">
                <a
                  href="#"
                  className="w-full h-full flex flex-col gap-[10px] items-center justify-center bg-white rounded-2xl p-[10px] ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/message-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Message
                  </span>
                </a>
              </div>
              <div className="group">
                <a
                  href="#"
                  className="w-full h-full flex flex-col gap-[10px] items-center justify-center bg-white rounded-2xl p-[10px] ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/heart-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Favorite
                  </span>
                </a>
              </div>
              <div className="group">
                <a
                  href="#"
                  className="w-full h-full flex flex-col gap-[10px] items-center justify-center bg-white rounded-2xl p-[10px] ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/user-remove-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Block
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div id="Group-Joined" className="flex flex-col gap-3 p-6">
            <p className="font-semibold leading-5">Joined to Groups</p>
            {profile?.groups.map((group, index) => (
              <div
                key={`group-${index + 1}-${group.name}`}
                className="flex items-center justify-between rounded-2xl ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300 p-4 gap-3"
              >
                <div className="flex size-16 shrink-0 rounded-full overflow-hidden">
                  <img
                    src={group.photo_url}
                    className="w-full h-full object-cover"
                    alt="photo"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-lg leading-[22.5px] truncate w-[290px]">
                        {group.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex font-medium text-sm text-heyhao-secondary gap-0.5 items-center">
                    <p>Member Since:</p>
                    <img
                      src="/assets/images/icons/calendar-2.svg"
                      className="flex size-4 shrink-0"
                      alt="icon"
                    />
                    <p>{formatDate(group.room.RoomMember[0].joinedAt)}</p>
                  </div>
                </div>
                {group.type === "PAID" ? (
                  <p className="badge flex items-center justify-center gap-0.5 rounded-full w-[62px] py-[6px] px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                    <img
                      src="/assets/images/icons/crown-blue-fill.svg"
                      className="flex size-4 shrink-0"
                      alt="icon"
                    />
                    VIP
                  </p>
                ) : (
                  <p className="badge flex items-center justify-center gap-0.5 rounded-full w-[62px] py-[6px] px-2 bg-heyhao-grey font-bold text-sm leading-[17.5px] text-heyhao-secondary">
                    Free
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
