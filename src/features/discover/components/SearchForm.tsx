import { useForm } from "react-hook-form";
import { searchSchema, type SearchValues } from "../utils/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

export default function SearchForm() {
  const { handleSubmit, register } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: SearchValues) => {
    navigate(`/home/discover?search=${data.query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative group">
      <button
        type="submit"
        className="shrink-0 absolute left-4 top-1/2 -translate-y-1/2"
      >
        <img
          src="/assets/images/icons/search-normal.svg"
          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
          alt="icon"
        />
        <img
          src="/assets/images/icons/search-normal-black.svg"
          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
          alt="icon"
        />
      </button>
      <input
        {...register("query")}
        type="text"
        className="bg-white w-[545px] h-[56px] rounded-2xl pl-[48px] border border-heyhao-border placeholder:font-semibold placeholder:text-base placeholder:leading-[20px] placeholder:text-heyhao-secondary font-semibold text-base leading-[20px] text-heyhao-black outline-none focus:border-heyhao-blue transition-all duration-300 pr-4"
        placeholder="Discover your group. Build your network."
      />
    </form>
  );
}
