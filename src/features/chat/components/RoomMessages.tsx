import React, { useEffect, useMemo, useState } from "react";
import { useGetRoom } from "../hooks/useGetRoom";
import type { MessageValues } from "../api/getRoom";
import dayjs from "dayjs";
import { formatDate } from "../../../shared/utils/helper";
import secureLocalStorage from "react-secure-storage";
import type { SignUpResponse } from "../../auth/api/signUp";
import RoomMessagesForm from "./RoomMessagesForm";
import { pusher } from "../utils/pusher";

type Props = {
  roomId: string;
};

export default function RoomMessages({ roomId }: Props) {
  const { room } = useGetRoom(roomId);
  const [messages, setMessages] = useState<MessageValues[]>(
    room?.RoomMessage ?? []
  );

  const auth = secureLocalStorage.getItem("AUTH_KEY") as SignUpResponse;

  const groupMessageByDate = useMemo(() => {
    return messages?.reduce<Record<string, MessageValues[]>>((acc, message) => {
      const date = `${
        dayjs().isSame(message.createdAt, "date") ? "Today, " : ""
      }${formatDate(message.createdAt, "DD MMM")}`;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(message);

      return acc;
    }, {} as Record<string, MessageValues[]>);
  }, [messages]);

  useEffect(() => {
    if (room?.RoomMessage) {
      setMessages(room.RoomMessage);
    }
  }, [room?.RoomMessage]);

  useEffect(() => {
    if (!room) {
      return;
    }

    const channelName = `chat-room-${room.id}`;
    const eventName = `chat-room-${room.id}-event`;

    const channel = pusher.subscribe(channelName);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind(eventName, (message: any) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.id]);

  return (
    <main id="Main-Content-Container" className="relative flex flex-1">
      <div id="Chat-Container" className="flex flex-col flex-1">
        <div
          id="Chat-Navigation"
          className="flex items-center justify-between w-full border-b border-heyhao-border p-5 gap-3 bg-white"
        >
          <div id="Group-Title" className="flex items-center flex-1 gap-3">
            <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
              <img
                src={room?.Group.photo_url}
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-[6px]">
                <h1 className="font-semibold text-lg leading-[23px]">
                  {room?.Group.name}
                </h1>
                {room?.Group.type === "PAID" && (
                  <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                    VIP
                  </p>
                )}
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="group-member-photos flex items-center w-fit">
                  {room?.RoomMember.slice(0, 3).map((item, index) => (
                    <div
                      key={`member-${index + 1}`}
                      className="relative flex size-6 shrink-0 rounded-full overflow-hidden -ml-[10px] first:ml-0 z-20"
                    >
                      <img
                        src={item.user.photo_url}
                        className="w-full h-full object-cover"
                        alt="photo"
                      />
                    </div>
                  ))}
                </div>
                <span className="font-semibold text-sm text-heyhao-secondary">
                  {room?.Group.room._count.RoomMember} Members
                </span>
                {/* <span className="font-semibold text-sm text-heyhao-secondary">
                  •
                </span>
                <span className="font-semibold text-sm text-heyhao-green">
                  19.500 Online
                </span> */}
              </div>
            </div>
          </div>
          <ul className="flex gap-3">
            <li className="group">
              <a
                href="#"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/video.svg"
                  className="size-6"
                  alt="icon"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="#"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/call.svg"
                  className="size-6"
                  alt="icon"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="#"
                id="Info"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/more.svg"
                  className="size-6"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </div>
        <div
          id="Chat-Messages"
          className="relative flex flex-col flex-1 overflow-hidden"
        >
          <div className="gradient-background absolute top-0 rotate-180 bg-[linear-gradient(180deg,rgba(245,246,250,0)_0%,rgba(245,246,250,0.8)_100%)] w-full h-[120px] z-10"></div>
          <div className="gradient-background absolute bottom-0 bg-[linear-gradient(180deg,rgba(245,246,250,0)_0%,rgba(245,246,250,1)_100%)] w-full h-[120px] z-10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/images/backgrounds/chat-Bg.svg"
              className="w-full h-full object-cover"
              alt="bg"
            />
          </div>
          <article className="relative flex-1 flex flex-col gap-5 p-[28px] pb-[130px] pl-5 overflow-y-scroll hide-scrollbar *z-20">
            {Object.entries(groupMessageByDate ?? {}).map(
              ([date, messages]) => (
                <React.Fragment key={date}>
                  <p className="date sticky w-[150px] text-center top-0 mt-[21px] mx-auto rounded-xl py-[10px] px-3 bg-white font-medium text-sm z-30">
                    {date}
                  </p>

                  {messages.map((message, index) => (
                    <React.Fragment key={`message-${index + 1}`}>
                      {message.user.id === auth.id ? (
                        <div className="chat-row">
                          <div className="message-out group flex flex-col gap-3 [&.message-out]:items-end [&.message-in]:items-start">
                            {/* <!-- change message-(in/out) class to swicth the card position to left (in) or right (out) --> */}
                            <div className="time sender flex items-center gap-3 group-[&.message-in]:flex-row-reverse">
                              <div className="flex items-center gap-[6px] group-[&.message-in]:flex-row-reverse">
                                <img
                                  src="/assets/images/icons/Send.svg"
                                  className="flex size-6 shrink-0 group-[&.message-in]:hidden"
                                  alt="icon"
                                />
                                <p className="flex gap-[6px] group-[&.message-in]:flex-row-reverse text-heyhao-secondary">
                                  <span>
                                    {formatDate(message.createdAt, "HH:mm A")}
                                  </span>
                                  <span> • </span>
                                  <span className="text-heyhao-black">You</span>
                                </p>
                              </div>
                              <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                                <img
                                  src={message.user.photo_url}
                                  className="w-full h-full object-cover"
                                  alt="photo"
                                />
                              </div>
                            </div>
                            {message.type === "TEXT" ? (
                              <div className="message-card relative max-w-[584px]">
                                <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                                  <p>{message.content}</p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="message-card preview-img relative max-w-[584px]"
                                data-image-src="/assets/images/thumbnails/Content-modal.png"
                              >
                                <img
                                  src={message.content_url}
                                  className="image max-w-[353px] max-h-[214] overflow-hidden group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none rounded-2xl object-contain"
                                  alt="image"
                                />
                                <div className="absolute transform -translate-x-1/2 left-1/2 bottom-[10px] flex items-center gap-1  border border-[#D7D7D7]/10 rounded-xl py-2 px-3 overflow-hidden bg-[#34343c]">
                                  <img
                                    src="/assets/images/icons/maximize-3-white.svg"
                                    className="flex shrink-0 size-4"
                                    alt="icon"
                                  />
                                  <span className="font-medium text-sm text-white">
                                    Preview
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="chat-row">
                          <div className="message-in group flex flex-col gap-3 [&.message-out]:items-end [&.message-in]:items-start">
                            {/* <!-- change message-(in/out) class to swicth the card position to left (in) or right (out) --> */}
                            <div className="time sender flex items-center gap-3 group-[&.message-in]:flex-row-reverse">
                              <div className="flex items-center gap-[6px] group-[&.message-in]:flex-row-reverse">
                                <img
                                  src="/assets/images/icons/Send.svg"
                                  className="flex size-6 shrink-0 group-[&.message-in]:hidden"
                                  alt="icon"
                                />
                                <p className="flex gap-[6px] group-[&.message-in]:flex-row-reverse text-heyhao-secondary">
                                  <span>
                                    {formatDate(message.createdAt, "HH:mm A")}
                                  </span>
                                  <span> • </span>
                                  <span className="text-heyhao-black">
                                    {message.user.name}
                                  </span>
                                </p>
                              </div>
                              <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                                <img
                                  src={message.user.photo_url}
                                  className="w-full h-full object-cover"
                                  alt="photo"
                                />
                              </div>
                            </div>
                            {message.type === "TEXT" ? (
                              <div className="message-card relative max-w-[584px]">
                                <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                                  <p>{message.content}</p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="message-card preview-img relative max-w-[584px]"
                                data-image-src="/assets/images/thumbnails/Content-modal-2.png"
                              >
                                <img
                                  src={message.content_url}
                                  className="image max-w-[353px] max-h-[214] overflow-hidden group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none rounded-2xl object-contain"
                                  alt="image"
                                />
                                <button
                                  type="button"
                                  className="preview-img absolute transform -translate-x-1/2 left-1/2 bottom-[10px] flex items-center gap-1  border border-[#D7D7D7]/10 rounded-xl py-2 px-3 overflow-hidden bg-[#34343c]"
                                >
                                  <img
                                    src="/assets/images/icons/maximize-3-white.svg"
                                    className="flex shrink-0 size-4"
                                    alt="icon"
                                  />
                                  <span className="font-medium text-sm text-white">
                                    Preview
                                  </span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            )}
          </article>
          <RoomMessagesForm roomId={roomId} />
        </div>
      </div>
    </main>
  );
}
