import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useParamsSearch(defaultValue = "latest") {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") || defaultValue);

  useEffect(() => {
    const url = search === defaultValue ? "/" : `/?q=${encodeURIComponent(search)}`;
    router.replace(url, { scroll: false });
  }, [search, router, defaultValue]);

  useEffect(() => {
    const urlSearch = searchParams.get("q") || defaultValue;
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams, defaultValue]);

  return [search, setSearch] as const;
}