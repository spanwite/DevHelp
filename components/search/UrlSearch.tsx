'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEBOUNCE_DELAY = 500;
const QUERY_PARAM = 'query';

export function UrlSearch({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
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
    <InputGroup className={cn('border-transparent bg-secondary h-14', className)}>
      <InputGroupInput
        {...props}
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.currentTarget.value)}
      />
      <InputGroupAddon className='pl-4 pr-1.5'>
        <Search className='size-5' />
      </InputGroupAddon>
    </InputGroup>
  );
}
