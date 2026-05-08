import { useId } from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import MaybeImage from '../utils/MaybeImage.server';
import { getDeviconUrl } from '@/lib/utils';

export function TagsNav({
  items,
}: {
  items: { id: string | number; name: string; count: string | number }[];
}) {
  const titleId = useId();

  return (
    <nav aria-labelledby={titleId}>
      <h2 className='mb-4 text-lg font-bold' id={titleId}>
        Popular Tags
      </h2>
      <ul className='flex flex-wrap gap-2'>
        {items.map((tag) => (
          <li key={tag.id} className='flex items-center justify-between gap-2'>
            <Badge variant='secondary' asChild>
              <Link href={ROUTES.tag(tag.id)}>
                <MaybeImage
                  src={getDeviconUrl(tag.name)}
                  alt={tag.name}
                  width={14}
                  height={14}
                />
                <span>{tag.name}</span>
                <span className='text-muted-foreground text-xs'>
                  {tag.count}
                </span>
              </Link>
            </Badge>
          </li>
        ))}
      </ul>
    </nav>
  );
}
