import { ROUTES } from '@/lib/constants';
import { getDeviconUrl, joinUrl } from '@/lib/utils';
import { Dot, Eye, MessageCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { format } from 'timeago.js';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Metric } from '../ui/Metric';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import MaybeImage from '../utils/MaybeImage.server';
import { UserAvatar } from '../UserAvatar';
import { TagList } from '../TagCard';

interface Props {
  data: {
    _id: string;
    title: string;
    tags: {
      _id: string;
      name: string;
    }[];
    creator: {
      _id: string;
      name: string;
      avatar?: string | null;
    };
    createdAt: Date;
    upvotes: number;
    answers: number;
    views: number;
  };
}

export function QuestionCard({ data }: Props) {
  return (
    <Card className='gap-2' size='lg'>
      <CardHeader className='text-xl font-bold'>
        <Link className='py-2' href={joinUrl(ROUTES.questions, data._id)}>
          {data.title}
        </Link>
      </CardHeader>
      <CardContent className='space-y-6'>
        <TagList data={data.tags} />
        <div className='flex flex-wrap items-center justify-between gap-x-2 gap-y-3'>
          <div className='flex flex-wrap items-center'>
            <Button variant='ghost' asChild>
              <Link
                className='flex items-center gap-1 py-1'
                href={joinUrl(ROUTES.profiles, data.creator._id)}
              >
                <UserAvatar
                  image={data.creator.avatar}
                  name={data.creator.name}
                  size='sm'
                />
                {data.creator.name}
              </Link>
            </Button>
            <div className='flex items-center px-2 text-center'>
              <Dot className='max-xs:hidden -ml-4' /> asked{' '}
              {format(data.createdAt)}
            </div>
          </div>
          <ul className='flex flex-wrap'>
            <li>
              <Metric icon={ThumbsUp} value={data.upvotes} label='Votes' />
            </li>
            <li>
              <Metric icon={Eye} value={data.views} label='Views' />
            </li>
            <li>
              <Metric
                icon={MessageCircle}
                value={data.answers}
                label='Answers'
              />
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
