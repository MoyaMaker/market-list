"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "../hooks/use-debounce";
import { Input } from "@/lib/components/ui/input";

const SEARCH_PARAM_KEY = "search";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get(SEARCH_PARAM_KEY) || ""
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = () => {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (urlSearchParams.has(SEARCH_PARAM_KEY)) {
      urlSearchParams.set(SEARCH_PARAM_KEY, searchTerm);
    } else {
      urlSearchParams.append(SEARCH_PARAM_KEY, searchTerm);
    }

    if (!searchTerm) urlSearchParams.delete(SEARCH_PARAM_KEY);

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    // <label className="inline-flex items-center gap-3 bg-white p-2 fill-gray-400 focus-within:outline outline-1 focus-within:fill-black">
    //   <svg
    //     fill="currentColor"
    //     className="fill-inherit"
    //     width="24px"
    //     height="24px"
    //     viewBox="0 0 1920 1920"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
    //       fillRule="evenodd"
    //     />
    //   </svg>
    //   <input
    //     defaultValue={searchTerm}
    //     placeholder="Buscar"
    //     className="outline-none"
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />
    // </label>
    <Input
      placeholder="Buscar"
      defaultValue={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
