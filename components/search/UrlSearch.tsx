'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Search } from './Search';

const DEBOUNCE_DELAY = 500;
const QUERY_PARAM = 'query';

export function UrlSearch({ ...props }: React.ComponentProps<typeof Search>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get(QUERY_PARAM) || ''
  );

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(QUERY_PARAM, value);
      } else {
        params.delete(QUERY_PARAM);
      }
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(createQueryString(searchQuery));
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timeout);
  }, [searchParams, searchQuery, createQueryString, router]);

  return (
    <Search
      value={searchQuery}
      onInput={(e) => setSearchQuery(e.currentTarget.value)}
      {...props}
    />
  );
}
