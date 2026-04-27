import { ROUTES } from '@/lib/constants';
import { cn, joinUrl } from '@/lib/utils';
import { CircleQuestionMark } from 'lucide-react';
import Link from 'next/link';
import { useId } from 'react';
import { Button } from '../ui/button';

export function NavQuestions({
  items,
}: {
  items: {
    id: string;
    text: string;
  }[];
}) {
  const titleId = useId();

  return (
    <nav aria-labelledby={titleId}>
      <h2 className='font-bold text-lg mb-3' id={titleId}>Hot Questions</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Button
              asChild
              variant='ghost'
              className='h-auto items-start whitespace-normal text-xs py-2'
            >
              <Link
                href={joinUrl(ROUTES.questions, item.id)}
              >
                <CircleQuestionMark className='mt-0.5 size-4.5 shrink-0' />
                <p className='font-medium'>{item.text}</p>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
