import { useGetRoom } from "../hooks/useGetRoom";

type Props = {
  roomId: string;
};

export default function RoomMessages({ roomId }: Props) {
  const { room } = useGetRoom(roomId);

  console.log(room);

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
                src="/assets/images/photos/bwa.svg"
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-[6px]">
                <h1 className="font-semibold text-lg leading-[23px]">
                  Laravel PHP Indonesia
                </h1>
                <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                  VIP
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="group-member-photos flex items-center w-fit">
                  <div className="relative flex size-6 shrink-0 rounded-full overflow-hidden -ml-[10px] first:ml-0 z-20">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="relative flex size-6 shrink-0 rounded-full overflow-hidden -ml-[10px] z-10">
                    <img
                      src="/assets/images/photos/photo-2.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="relative flex size-6 shrink-0 rounded-full overflow-hidden -ml-[10px]">
                    <img
                      src="/assets/images/photos/photo-3.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <span className="font-semibold text-sm text-heyhao-secondary">
                  22.259 Members
                </span>
                <span className="font-semibold text-sm text-heyhao-secondary">
                  •
                </span>
                <span className="font-semibold text-sm text-heyhao-green">
                  19.500 Online
                </span>
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
            <p className="date sticky w-[150px] text-center top-0 mt-[21px] mx-auto rounded-xl py-[10px] px-3 bg-white font-medium text-sm z-30">
              Yesterday, 18 Dec
            </p>
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
                      <span>12:06 AM</span>
                      <span> • </span>
                      <span className="text-heyhao-black">Neb</span>
                    </p>
                  </div>
                  <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <div className="message-card relative max-w-[584px]">
                  <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                    <p>
                      Halo, semuanya! buat baru join. Yuk, kenalan dulu biar
                      diskusinya nanti tambah seru dan santai!😎
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                      <span>12:06 AM</span>
                      <span> • </span>
                      <span className="text-heyhao-black">You</span>
                    </p>
                  </div>
                  <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <div
                  className="message-card preview-img relative max-w-[584px]"
                  data-image-src="/assets/images/thumbnails/Content-modal.png"
                >
                  <img
                    src="/assets/images/thumbnails/Content.png"
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
                <div className="message-card relative max-w-[584px]">
                  <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                    <p>
                      Saya sudah bikin fitur ini namun sepertinya masih ada
                      kesalahan dari segi perfomance boleh bantu periksa
                      semuanya, lorem ipsum
                    </p>
                  </div>
                </div>
                <div className="message-card relative max-w-[584px]">
                  <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                    <p>Cek kelas diskon www.buildwithangga.com/sale</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="date sticky w-[150px] text-center top-0 mt-[21px] mx-auto rounded-xl py-[10px] px-3 bg-white font-medium text-sm z-30">
              Today, 19 Dec
            </p>
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
                      <span>12:06 AM</span>
                      <span> • </span>
                      <span className="text-heyhao-black">Neb</span>
                    </p>
                  </div>
                  <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <div className="message-card relative max-w-[584px]">
                  <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                    <p>
                      Data divalidasi pake $request-&gt;validated() buat cek
                      aturan di StoreOrderRequest. Kalau lolos, lanjut proses
                      order! 👍
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                      <span>12:06 AM</span>
                      <span> • </span>
                      <span className="text-heyhao-black">Neb</span>
                    </p>
                  </div>
                  <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <div
                  className="message-card preview-img relative max-w-[584px]"
                  data-image-src="/assets/images/thumbnails/Content-modal-2.png"
                >
                  <img
                    src="/assets/images/thumbnails/Content-modal-2.png"
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
              </div>
            </div>
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
                      <span>12:06 AM</span>
                      <span> • </span>
                      <span className="text-heyhao-black">You</span>
                    </p>
                  </div>
                  <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <div className="message-card relative max-w-[584px]">
                  <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                    <p>Eh bro thanks ya udah bikin komunitas yang solid</p>
                  </div>
                </div>
              </div>
            </div>
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
                      <span>12:06 AM</span>
                      <span> • </span>
                      <span className="text-heyhao-black">Neb</span>
                    </p>
                  </div>
                  <div className="flex size-8 shrink-0 overflow-hidden rounded-full">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                </div>
                <div className="message-card relative max-w-[584px]">
                  <div className="w-fit rounded-3xl group-[&.message-out]:rounded-tr-none group-[&.message-in]:rounded-tl-none py-5 px-4 gap-2 bg-heyhao-card-meesage group-[&.message-in]:bg-white leading-[28px]">
                    <p>Sama-sama bro, thanks juga udah join</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div className="relative flex w-full z-30">
            <form className="fixed bottom-0 w-full max-w-[calc(100%-444px)] p-5 gap-[10px] z-20">
              <div className="relative">
                <div
                  id="Chat-Input"
                  contentEditable="true"
                  spellCheck="false"
                  className="appearance-none outline-none w-full min-h-[60px] max-h-[200px] h-fit rounded-2xl p-5 pl-4 pr-[112px] bg-white break-words font-medium leading-5 hide-scrollbar focus:ring-2 focus:ring-heyhao-blue transition-all duration-300 empty:text-heyhao-secondary empty:before:content-['Type_a_message...'] text-heyhao-black shadow-sm"
                ></div>
                <div className="absolute flex right-2 bottom-2 gap-2">
                  <button
                    type="button"
                    id="Upload-Image"
                    className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                  >
                    <img
                      src="/assets/images/icons/gallery-import.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </button>
                  <button type="submit" className="flex shrink-0 w-11">
                    <img
                      src="/assets/images/icons/Send-Button-blue-bg.svg"
                      className="object-contain"
                      alt="icon"
                    />
                  </button>
                </div>
              </div>
              <div
                id="Typing-Indicator-Container"
                className="flex h-[28px] shrink-0"
              >
                <div className="flex items-center gap-2 mt-[10px]">
                  <img
                    src="/assets/images/icons/Texting-Animation.svg"
                    className="w-10"
                    alt="animation"
                  />
                  <p className="text-sm text-heyhao-blue">
                    <span className="font-semibold">Masayoshi </span>
                    is typing...
                  </p>
                </div>
              </div>
            </form>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
