'use client';

import { formSearchParamsUrl } from '@/lib/url';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const FILTER = 'filter';

export function UrlFilter({
  items,
  ...props
}: React.ComponentProps<typeof Tabs> & {
  items: { name: string; value: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(
    () => searchParams.get(FILTER) || ''
  );

  const updateFilter = (value: string) => {
    if (selected === value) {
      value = '';
    }
    const url = formSearchParamsUrl({
      name: FILTER,
      value,
    });
    router.push(url, { scroll: false });
    setSelected(value);
  };

  return (
    <Tabs
      {...props}
      value={selected}
      activationMode='manual'
    >
      <TabsList variant='line'>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            onClick={() => updateFilter(item.value)}
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
