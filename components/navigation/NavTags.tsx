import { ROUTES } from '@/lib/constants';
import { getDeviconUrl, joinUrl, resourceExists } from '@/lib/utils';
import Image from 'next/image';
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

export async function TechTag({
  title,
  id,
  count,
}: {
  title: string;
  id: string;
  count: string | number;
}) {
  const iconUrl = getDeviconUrl(title);
  const iconExists = await resourceExists(iconUrl);

  return (
    <Badge variant='secondary' className='' asChild>
      <Link href={joinUrl(ROUTES.tags, id)}>
        {iconExists && (
          <Image src={iconUrl} alt={`${title} icon`} width={14} height={14} />
        )}
        {title}
        <div className='text-muted-foreground text-xs'>{count}</div>
      </Link>
    </Badge>
  );
}
