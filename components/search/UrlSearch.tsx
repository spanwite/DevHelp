'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { formSearchParamsUrl } from '@/lib/url';

const QUERY_PARAM = 'query';

export function UrlSearch({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<string>(
    () => searchParams.get(QUERY_PARAM) || ''
  );
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const url = formSearchParamsUrl({
      name: QUERY_PARAM,
      value: debouncedQuery,
    });
    router.push(url, { scroll: false });
  }, [debouncedQuery, router]);

  return (
    <InputGroup
      className={cn('bg-secondary h-14 border-transparent', className)}
    >
      <InputGroupInput
        {...props}
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
      />
      <InputGroupAddon className='pr-1.5 pl-4'>
        <Search className='size-5' />
      </InputGroupAddon>
    </InputGroup>
  );
}
