'use client';

import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Search as SearchIcon } from 'lucide-react';

export function Search({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className={cn('relative', className)}>
      <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2' />
      <Input {...props} className='pl-13 h-14 border-transparent bg-muted' />
    </div>
  );
}
