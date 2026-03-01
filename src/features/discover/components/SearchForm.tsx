import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { searchFormSchema, SearchFormValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function SearchForm() {
    const { handleSubmit, register, setValue } = useForm<SearchFormValues>({
        resolver: zodResolver(searchFormSchema),
    });

    const navigate = useNavigate();

    const onSubmit = (data: SearchFormValues) => {
        if (data.query.trim() === "") {
            navigate(`/home/discover`);
        } else {
            navigate(`/home/discover?q=${data.query}`);
        }
    };

    useEffect(() => {
        const handleClear = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setValue("query", "");
                navigate(`/home/discover`);
            }

            if (e.key === "Enter") {
                handleSubmit(onSubmit)();
            }
        };
        window.addEventListener("keydown", handleClear);
        return () => window.removeEventListener("keydown", handleClear);
    }, []);

    return (
        <form className="relative group" onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" className="shrink-0 absolute left-4 top-1/2 -translate-y-1/2">
                <img src="/assets/images/icons/search-normal.svg" className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex" alt="icon" />
                <img src="/assets/images/icons/search-normal-black.svg" className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden" alt="icon" />
            </button>
            <input
                type="text"
                className="bg-white w-[545px] h-[56px] rounded-2xl pl-[48px] border border-heyhao-border placeholder:font-semibold placeholder:text-base placeholder:leading-[20px] placeholder:text-heyhao-secondary font-semibold text-base leading-[20px] text-heyhao-black outline-none focus:border-heyhao-blue transition-all duration-300 pr-4"
                placeholder="Discover your group. Build your network."
                {...register("query")}
            />
        </form>
    );
}