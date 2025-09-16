import { useForm } from "react-hook-form";
import { approvalSchema, type ApprovalValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router";
import { useRef } from "react";
import { useUpdateWithdraw } from "../hooks/useUpdateWithdraw";
import { AxiosError } from "axios";

export default function ApprovalPage() {
  const { id } = useParams();
  const { mutateAsync, isPending } = useUpdateWithdraw(id ?? "");

  const navigate = useNavigate();

  const uploadRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApprovalValues>({
    resolver: zodResolver(approvalSchema),
  });

  const proof = watch("proof");

  const onSubmit = async (data: ApprovalValues) => {
    console.log(data);

    try {
      const formData = new FormData();

      formData.append("proof", data.proof);

      await mutateAsync(formData);

      navigate("/admin");
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
    <main className="relative flex flex-1">
      <div className="flex bg-white flex-col h-max rounded-3xl max-w-[680px] ml-12 gap-[34px] p-6 mt-14 pb-14">
        <p className="hover:text-heyhao-blue hover:underline">
          <Link to="/admin">Withdraw Request</Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="avatar" className="flex items-center gap-8 relative">
            {proof ? (
              <img
                src={URL.createObjectURL(proof)}
                alt="preview-img"
                className="flex rounded-4xl relative overflow-hidden shrink-0 w-[440px] h-[250px]"
              />
            ) : (
              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                className="flex rounded-[32px] relative overflow-hidden shrink-0 w-[440px] h-[250px] bg-[#D9D9D9] hover:bg-[#c5c5c5] transition"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
                  Add Proof of Payment
                </span>
              </button>
            )}
            <input
              ref={uploadRef}
              onChange={(e) => {
                if (e.target.files) {
                  setValue("proof", e.target.files[0]);
                }
              }}
              type="file"
              className="absolute opacity-0 -z-10"
            />
          </div>
          {errors.proof && (
            <p className="mt-4 text-red-500">
              {errors.proof.message?.toString()}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full py-[14px] px-5 bg-heyhao-blue mt-10 cursor-pointer transition hover:bg-heyhao-blue/90"
          >
            <span className="font-semibold text-white text-nowrap">
              {isPending ? "Loading..." : "Confirm Withdraw Request"}
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}
