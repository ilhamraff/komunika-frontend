import { useForm } from "react-hook-form";
import CarouselImage from "../components/CarouselImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInValues } from "../utils/schema";
import { useSignIn } from "../hooks/useSignIn";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { Link } from "react-router";
import { useMemo } from "react";
import { AxiosError } from "axios";

export default function SignInPages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const { mutateAsync, isPending, isError, error } = useSignIn();

  const onSubmit = async (data: SignInValues) => {
    console.log(data);

    try {
      const response = await mutateAsync(data);

      secureLocalStorage.setItem(AUTH_KEY, response.data);

      window.location.replace("/home/chats");
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = useMemo(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        return error?.response?.data?.message;
      }

      return "An error occured";
    }

    return null;
  }, [error, isError]);

  return (
    <div className="flex min-h-screen bg-[#EBEDF2]">
      <CarouselImage />
      <main
        id="ContainerInputs"
        className="flex items-center justify-end flex-1 pr-[calc(((100%-1280px)/2)+75px)] py-[60px]"
      >
        <section
          id="BackgroundInputs"
          className="fixed bg-white overflow-hidden rounded-l-[24px] top-0 right-0 bottom-0 left-[685px]"
        >
          {isError && (
            <span
              id="Error"
              className="flex items-center justify-center gap-[10px] absolute top-0 left-0 right-0 h-[56px] bg-heyhao-coral"
            >
              <p className="font-medium leading-[20px] text-white">
                {errorMessage}
              </p>
              <img
                src="/assets/images/icons/close-circle-white.svg"
                alt="icon"
                className="size-[24px] shrink-0"
              />
            </span>
          )}
        </section>
        <section
          id="ContentInputs"
          className="flex w-[435px] h-fit shrink-0 flex-col gap-[40px] relative z-20"
        >
          <section id="CompanyLogo">
            <img
              src="/assets/images/logos/heyhao.svg"
              alt="icon"
              className="w-[178px] h-[38px] shrink-0 mx-auto"
            />
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[40px]"
          >
            <div className="flex flex-col gap-[30px]">
              <header className="flex flex-col gap-3">
                <h1 className="font-semibold text-[24px] leading-[30px] text-center">
                  Welcome Back🤞🏻
                </h1>
                <p className="font-medium leading-[20px] text-center text-heyhao-secondary">
                  Hop into your account to continue!
                </p>
              </header>
              <section id="Inputs" className="flex flex-col gap-[30px]">
                <div>
                  <div id="Email" className="relative">
                    <div className="relative h-[72px] has-[:invalid]:border-heyhao-coral overflow-hidden rounded-[24px] border-[1.5px] border-heyhao-border py-[24px] focus-within:border-heyhao-blue transition-all duration-300">
                      <input
                        {...register("email")}
                        id="Email"
                        placeholder=""
                        type="email"
                        className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-[20px] focus:outline-none pb-[16px] pl-[80px] pt-[36px] z-10"
                      />
                      <img
                        src="/assets/images/icons/sms-grey.svg"
                        alt="icon"
                        className="absolute left-[24px] top-1/2 size-[24px] shrink-0 -translate-y-1/2 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      />
                      <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-[64px] peer-focus:z-30 z-30 peer-placeholder-shown:z-0"></div>
                      <label
                        htmlFor="Email"
                        className="absolute left-[80px] text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 -translate-y-0 peer-focus:-translate-y-0 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>
                  {errors?.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors?.email?.message?.toString()}
                    </p>
                  )}
                </div>
                <div>
                  <div
                    id="Password-Container"
                    className="flex flex-col gap-[12px]"
                  >
                    <div className="relative h-[72px] has-[:invalid]:border-heyhao-coral overflow-hidden rounded-[24px] border-[1.5px] border-heyhao-border py-[24px] focus-within:border-heyhao-blue transition-all duration-300">
                      <button
                        type="button"
                        data-target="Password-Input"
                        className="show-password absolute right-[24px] transform -translate-y-1/2 top-1/2 z-30"
                      >
                        <img
                          src="/assets/images/icons/eye-grey.svg"
                          alt="Hide password icon"
                          className="show-icon size-[24px] shrink-0"
                        />
                        <img
                          src="/assets/images/icons/eye-slash-black.svg"
                          alt="Show password icon"
                          className="hide-icon size-[24px] shrink-0 hidden"
                        />
                      </button>
                      <input
                        {...register("password")}
                        id="Password-Input"
                        placeholder=""
                        type="password"
                        className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-[20px] tracking-[0.2em] focus:outline-none pb-[16px] px-[80px] pt-[36px] z-10"
                      />
                      <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-[64px] peer-focus:z-30 z-30 peer-placeholder-shown:z-0"></div>
                      <img
                        src="/assets/images/icons/lock-grey.svg"
                        alt="Lock icon"
                        className="absolute left-[24px] top-1/2 size-[24px] shrink-0 -translate-y-1/2 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      />
                      <label
                        htmlFor="Password-Input"
                        className="absolute left-[80px] text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 -translate-y-0 peer-focus:-translate-y-0 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      >
                        Password
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="hover:underline font-medium leading-[20px] text-heyhao-secondary text-end"
                    >
                      Forget My password
                    </Link>
                  </div>
                  {errors?.password && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors?.password?.message?.toString()}
                    </p>
                  )}
                </div>
              </section>
            </div>
            <section id="Cta" className="flex flex-col gap-6">
              <button
                type="submit"
                disabled={isPending}
                className="bg-heyhao-blue rounded-full py-4 text-white w-full font-bold leading-[20px] cursor-pointer"
              >
                {isPending ? "Loading..." : "Sign In Now"}
              </button>
              <p className="font-semibold leading-[20px] text-center">
                Don’t Have One?{" "}
                <Link
                  to="/sign-up"
                  className="text-heyhao-blue hover:underline"
                >
                  Create Account Now
                </Link>
              </p>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}
