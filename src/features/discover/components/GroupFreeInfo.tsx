// import type { DetailGroupValues } from "../api/getDetailGroup";

// interface GroupFreeInfoProps {
//   data: DetailGroupValues | undefined;
// }

export default function GroupFreeInfo() {
  return (
    <form>
      <div className="p-6 rounded-3xl bg-white flex flex-col gap-6">
        <section
          id="Free-Group-Guidelines "
          className="flex flex-col gap-[12px]"
        >
          <h2 className="font-semibold leading-5">Free Group Guidelines</h2>
          <div className="flex-col flex gap-[12px]">
            <div className="flex items-center gap-[6px]">
              <img
                src="/assets/images/icons/checklist-green-fill.svg"
                alt="icon"
                className="size-[24px] shrink-0"
              />
              <p className="font-semibold leading-5">
                Respect & kindness for everyone in the group.
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <img
                src="/assets/images/icons/checklist-green-fill.svg"
                alt="icon"
                className="size-[24px] shrink-0"
              />
              <p className="font-semibold leading-5">
                Be patient and helpful with newcomers.
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <img
                src="/assets/images/icons/checklist-green-fill.svg"
                alt="icon"
                className="size-[24px] shrink-0"
              />
              <p className="font-semibold leading-5">
                No spamming or self-promotion.
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <img
                src="/assets/images/icons/checklist-green-fill.svg"
                alt="icon"
                className="size-[24px] shrink-0"
              />
              <p className="font-semibold leading-5">
                Don’t share personal info without consent.
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <img
                src="/assets/images/icons/checklist-green-fill.svg"
                alt="icon"
                className="size-[24px] shrink-0"
              />
              <p className="font-semibold leading-5">
                Keep discussions relevant to the group's topic.
              </p>
            </div>
          </div>
        </section>
        <button
          type="submit"
          className="rounded-full bg-heyhao-blue py-4 text-white w-full font-bold leading-[20px] text-center"
        >
          Join For Free
        </button>
        <a href="message-room-chat-people.html">
          <div className="rounded-full bg-heyhao-blue flex items-center justify-center gap-[10px] py-4 text-white w-full font-bold leading-[20px] text-center">
            <img
              src="/assets/images/icons/messages-white-fill.svg"
              alt="icon"
              className="size-6 shrink-0"
            />
            <p>Message</p>
          </div>
        </a>
      </div>
    </form>
  );
}
