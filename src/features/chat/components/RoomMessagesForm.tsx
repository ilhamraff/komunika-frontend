import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageInputSchema, type MessageInputValues } from "../utils/schema";
import { useCreateMessage } from "../hooks/useCreateMessage";
import { AxiosError } from "axios";
import { useRef } from "react";

type Props = {
  roomId: string;
};

export default function RoomMessagesForm({ roomId }: Props) {
  const { handleSubmit, register, resetField } = useForm<MessageInputValues>({
    resolver: zodResolver(messageInputSchema),
  });

  const { mutateAsync, isPending } = useCreateMessage();

  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: MessageInputValues) => {
    console.log(data);

    try {
      const formData = new FormData();

      formData.append("message", data.message);
      formData.append("roomId", roomId);

      await mutateAsync(formData);

      resetField("message");
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(
          error?.response?.data?.message ?? "An Axios error occured"
        );
      }

      const err = error as Error;
      alert(err?.message ?? "An error occured");
    }
  };

  const onUploadAttach = async (file: File) => {
    try {
      const formData = new FormData();

      formData.append("message", file.name);
      formData.append("roomId", roomId);
      formData.append("attach", file);

      await mutateAsync(formData);
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(
          error?.response?.data?.message ?? "An Axios error occured"
        );
      }

      const err = error as Error;
      alert(err?.message ?? "An error occured");
    }
  };

  return (
    <div className="relative flex w-full z-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed bottom-0 w-full max-w-[calc(100%-444px)] p-5 gap-[10px] z-20"
      >
        <div className="relative">
          <input
            {...register("message")}
            id="Chat-Input"
            placeholder="Type a message..."
            className="appearance-none outline-none w-full min-h-[60px] max-h-[200px] h-fit rounded-2xl p-5 pl-4 pr-[112px] bg-white break-words font-medium leading-5 hide-scrollbar focus:ring-2 focus:ring-heyhao-blue transition-all duration-300 empty:text-heyhao-secondary empty:before:content-['Type_a_message...'] text-heyhao-black shadow-sm"
          />
          <div className="absolute flex right-2 bottom-2 gap-2">
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              id="Upload-Image"
              className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
            >
              <img
                src="/assets/images/icons/gallery-import.svg"
                className="size-6"
                alt="icon"
              />
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex shrink-0 w-11"
            >
              <img
                src="/assets/images/icons/Send-Button-blue-bg.svg"
                className="object-contain"
                alt="icon"
              />
            </button>
          </div>
        </div>
      </form>
      <input
        ref={imageRef}
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            onUploadAttach(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
}
