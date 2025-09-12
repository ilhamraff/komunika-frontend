import { Link, useNavigate } from "react-router";
import Siderbar from "../../../shared/components/Siderbar";
import { useGetBalance } from "../hooks/useGetBalance";
import { formatRupiah } from "../../../shared/utils/helper";
import secureLocalStorage from "react-secure-storage";
import type { SignUpResponse } from "../../auth/api/signUp";
import { withdrawSchema, type WithdrawValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateWithdraw } from "../hooks/useCreateWithdraw";
import { AxiosError } from "axios";

export default function WithdrawPage() {
  const auth = secureLocalStorage.getItem("AUTH_KEY") as SignUpResponse;
  const { data } = useGetBalance();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<WithdrawValues>({
    resolver: zodResolver(withdrawSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useCreateWithdraw();

  const onSubmit = async (data: WithdrawValues) => {
    console.log(data);

    try {
      await mutateAsync({
        amount: Number.parseInt(data.amount),
        bankAccountName: data.bankAccountName,
        bankName: data.bankName,
        bankAccountNumber: Number.parseInt(data.bankAccountNumber),
      });

      alert("Withdraw success");
      navigate("/home/revenue/payout");
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
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <Siderbar />
      <main id="Main-Content-Container" className="relative flex flex-1">
        <div className="flex flex-col flex-1">
          <div
            id="Header"
            className="relative flex flex-col w-full shrink-0 border-b border-heyhao-border bg-white p-[30px] gap-3"
          >
            <h1 className="font-bold text-2xl leading-[30px]">
              Withdraw Money
            </h1>
            <nav>
              <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                <li>
                  <Link to="/home/revenue" className="hover:underline">
                    My Revenue Stat
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="font-medium leading-5 text-heyhao-blue">
                    Request Withdraw
                  </span>
                </li>
              </ol>
            </nav>
          </div>
          <div id="Content" className="flex flex-1 overflow-y-scroll">
            <div className="flex flex-1 min-h-screen">
              <div className="flex w-[636px] shrink-0 bg-white">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col flex-1 gap-[30px] p-[30px] bg-white"
                >
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Total Amount
                    </p>
                    <label className="relative group">
                      <input
                        {...register("amount")}
                        type="number"
                        autoComplete="off"
                        placeholder=""
                        className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-[110px] gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/dollar-circle-grey.svg"
                          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/dollar-circle-black.svg"
                          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                        <span className="font-semibold group-has-[:placeholder-shown]:text-heyhao-secondary text-heyhao-black">
                          Rp
                        </span>
                      </div>
                      {/* <span className="absolute inset-0 flex items-center right-0 bg-[linear-gradient(90deg,rgba(237,107,96,0)_80%,rgba(237,107,96,0.09)_100%)] rounded-xl border border-heyhao-coral">
                        <img
                          src="/assets/images/icons/information.svg"
                          className="ml-auto flex size-6 shrink-0"
                          alt="icon"
                        />
                        <span className="font-medium text-sm text-heyhao-coral ml-1 mr-5">
                          Balance Kurang
                        </span>
                      </span> */}
                    </label>
                    {errors?.amount && (
                      <p className="text-red-500">{errors.amount.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Select Bank
                    </p>
                    <label className="relative group">
                      <select
                        {...register("bankName")}
                        name="bankName"
                        id="bankName"
                        className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:ring-heyhao-blue transition-all duration-300"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select your bank
                        </option>
                        <option value="BCA">BCA</option>
                        <option value="BNI">BNI</option>
                        <option value="BRI">BRI</option>
                        <option value="Mandiri">Mandiri</option>
                      </select>
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center pointer-events-none">
                        <img
                          src="/assets/images/icons/bank-grey.svg"
                          className="size-6 shrink-0"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                    </label>
                    {errors?.bankName && (
                      <p className="text-red-500">{errors?.bankName.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Bank Account Number
                    </p>
                    <label className="relative group">
                      <input
                        {...register("bankAccountNumber")}
                        type="number"
                        autoComplete="off"
                        placeholder="Type your bank number?"
                        className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/card-grey.svg"
                          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/card-black.svg"
                          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                      {/* <span className="absolute inset-0 flex items-center right-0 bg-[linear-gradient(90deg,rgba(48,178,45,0)_80%,rgba(48,178,45,0.09)_100%)] rounded-r-xl">
                        <img
                          src="/assets/images/icons/verifiy-green-fill.svg"
                          className="ml-auto mr-5 flex size-6 shrink-0"
                          alt="icon"
                        />
                      </span> */}
                    </label>
                    {errors?.bankAccountNumber && (
                      <p className="text-red-500">
                        {errors?.bankAccountNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Bank Account Name
                    </p>
                    <label className="relative group">
                      <input
                        {...register("bankAccountName")}
                        type="text"
                        autoComplete="off"
                        placeholder="Under whose name is the bank you use?"
                        className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/user-square-grey.svg"
                          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/user-square-black.svg"
                          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                    </label>
                    {errors?.bankAccountName && (
                      <p className="text-red-500">
                        {errors.bankAccountName.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="h-[62px] rounded-full py-4 px-6 bg-heyhao-blue font-bold leading-5 text-white w-fit mb-[30px]"
                  >
                    {isPending ? "Loading..." : "Request for Withdraw"}
                  </button>
                  <span className="spacer flex h-[30px] shrink-0"></span>
                </form>
              </div>
              <div className="flex w-[560px] shrink-0">
                <div className="flex flex-1 flex-col gap-[30px] p-[30px]">
                  <div className="relative flex flex-col w-full h-[282px] shrink-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src="/assets/images/backgrounds/ornament-withdraw.png"
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="relative flex flex-col p-6 flex-1">
                      <button className="flex items-center gap-2 rounded-full p-2 pr-4 w-fit bg-heyhao-purple">
                        <img
                          src="/assets/images/icons/idr-flag.svg"
                          className="flex size-8 shrink-0"
                          alt="icon"
                        />
                        <p className="font-bold text-white">IDR</p>
                      </button>
                      <div className="flex flex-col gap-2 mt-[21px]">
                        <p className="font-medium leading-5 text-[#785D93]">
                          Total Balance
                        </p>
                        <p className="font-bold text-[42px] leading-[52.5px]">
                          {formatRupiah(data ?? 0)}
                        </p>
                      </div>
                      <hr className="border-white/[21%] mt-10 mb-6" />
                      <p className="font-medium leading-5 text-[#876A9E]">
                        {auth.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 p-6 rounded-3xl w-full bg-white">
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold leading-5">
                        Withdraw Terms & Conditions
                      </p>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Bank account details must be accurate and valid.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Processing takes up to 3 business days.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Only official platform methods are accepted.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Fake withdrawal requests will be rejected.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Contact support if you encounter issues.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-full py-4 px-6 justify-center bg-heyhao-blue">
                      <img
                        src="/assets/images/icons/messages-2-round-white-fill.svg"
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                      <p className="font-medium leading-5 text-white">
                        Customer Service
                      </p>
                    </div>
                  </div>
                  <span className="spacer flex h-[30px] shrink-0"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
