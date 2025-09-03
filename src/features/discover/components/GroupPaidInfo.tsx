import { AxiosError } from "axios";
import { formatRupiah } from "../../../shared/utils/helper";
import type { DetailGroupValues } from "../api/getDetailGroup";
import { useJoinPaidGroup } from "../hooks/useJoinPaidGroup";
import { Link } from "react-router";

interface GroupPaidInfoProps {
  data: DetailGroupValues | undefined;
}

export default function GroupPaidInfo({ data }: GroupPaidInfoProps) {
  const { mutateAsync, isPending } = useJoinPaidGroup();

  const onJoinGroup = async () => {
    try {
      if (!data) {
        return alert("Group not found");
      }

      const response = await mutateAsync({ groupId: data.id });

      window.location.replace(response.data.redirect_url);
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error?.response?.data?.message ?? "An error occured");
      }

      const err = error as Error;

      alert(err?.message ?? "An error occured");
    }
  };

  return (
    <form>
      <div className="p-6 rounded-3xl bg-white flex flex-col gap-6">
        <section id="Benefit-Group" className="flex flex-col gap-[12px]">
          <h2 className="font-semibold leading-5">Benefit Group</h2>
          <div className="flex-col flex gap-[12px]">
            {data?.benefit.map((item, index) => (
              <div
                key={`${item + index + 1}`}
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
        <section id="Group-Price" className="flex flex-col gap-[12px]">
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
        <button
          type="button"
          disabled={isPending}
          onClick={onJoinGroup}
          className="rounded-full bg-heyhao-blue py-4 text-white w-full font-bold leading-[20px] text-center cursor-pointer"
        >
          {isPending ? "Loading..." : "Pay With Midtrains & Join"}
        </button>
        <Link to="/home/chats">
          <div className="rounded-full bg-heyhao-blue flex items-center justify-center gap-[10px] py-4 text-white w-full font-bold leading-[20px] text-center cursor-pointer">
            <img
              src="/assets/images/icons/messages-white-fill.svg"
              alt="icon"
              className="size-6 shrink-0"
            />
            <p>Message</p>
          </div>
        </Link>
      </div>
    </form>
  );
}
