import { useId } from 'react';
import { TechBadge } from '../TechBadge';

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
            <TechBadge data={tag} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

