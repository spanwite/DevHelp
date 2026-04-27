import { ROUTES } from '@/lib/constants';
import { getDeviconClass, joinUrl } from '@/lib/utils';
import Link from 'next/link';
import { useId } from 'react';
import { Badge } from '../ui/badge';

export function NavTags({
  items,
}: {
  items: { id: string; title: string; count: string | number }[];
}) {
  const titleId = useId();

  return (
    <nav aria-labelledby={titleId}>
      <h2 className='mb-4 text-lg font-bold' id={titleId}>
        Popular Tags
      </h2>
      <ul className='flex flex-wrap gap-2'>
        {items.map((item) => (
          <li key={item.id} className='flex items-center justify-between gap-2'>
            <TechTag {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function TechTag({
  title,
  id,
  count,
}: {
  title: string;
  id: string;
  count: string | number;
}) {
  return (
    <Badge variant='secondary' className='' asChild>
      <Link href={joinUrl(ROUTES.tags, id)}>
        <i className={getDeviconClass(title)} />
        {title}
        <div className='text-muted-foreground text-xs'>{count}</div>
      </Link>
    </Badge>
  );
}
