import { ROUTES } from '@/lib/constants';
import { getDeviconUrl } from '@/lib/utils';
import { tagDescriptions } from './question/constants';
import { Card, CardHeader, CardContent } from './ui/card';
import MaybeImage from './utils/MaybeImage.server';
import Link from 'next/link';

export default function TagCard({
  data: { _id, name, questionsCount },
}: {
  data: {
    _id: string;
    name: string;
    questionsCount: number;
  };
}) {
  return (
    <Card className='h-full gap-2'>
      <CardHeader className='font-bold'>
        <Link className='flex items-center gap-2 py-2' href={ROUTES.tag(_id)}>
          <MaybeImage
            src={getDeviconUrl(name)}
            alt={name}
            width={16}
            height={16}
          />
          {name}
        </Link>
      </CardHeader>
      <CardContent className='flex h-full flex-col justify-between gap-4'>
        {tagDescriptions[name] && (
          <p className='text-muted-foreground text-xs'>
            {tagDescriptions[name]}
          </p>
        )}
        <div className='flex items-center gap-2 text-xs font-medium'>
          <span className='text-accent text-sm font-bold'>
            {questionsCount}+
          </span>
          Questions
        </div>
      </CardContent>
    </Card>
  );
}
