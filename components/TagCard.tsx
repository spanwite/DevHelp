import { ROUTES } from '@/lib/constants';
import { getDeviconUrl } from '@/lib/utils';
import { tagDescriptions } from './question/constants';
import { Card, CardHeader, CardContent } from './ui/card';
import MaybeImage from './utils/MaybeImage.server';
import Link from 'next/link';
import { Badge } from './ui/badge';

export default function TagCard({
  data,
}: {
  data: {
    _id: string;
    name: string;
    questionsCount: number;
  };
}) {
  const { _id, name, questionsCount } = data;

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

export function Tag({ data }: { data: { _id: string; name: string } }) {
  return (
    <Badge variant='secondary' asChild>
      <Link href={ROUTES.tag(data._id)}>
        <MaybeImage
          src={getDeviconUrl(data.name)}
          alt={data.name}
          width={14}
          height={14}
        />
        <span>{data.name}</span>
      </Link>
    </Badge>
  );
}

export function TagList({ data }: { data: { _id: string; name: string }[] }) {
  return (
    <ul className='flex flex-wrap gap-2'>
      {data.map((tag) => (
        <li key={tag._id}>
          <Tag data={tag} />
        </li>
      ))}
    </ul>
  );
}
