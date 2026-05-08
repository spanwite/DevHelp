import { ROUTES } from '@/lib/constants';
import { getDeviconUrl, joinUrl } from '@/lib/utils';
import { Question } from '@/types';
import { Dot, Eye, MessageCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { format } from 'timeago.js';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Metric } from '../ui/Metric';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import MaybeImage from '../utils/MaybeImage.server';

export function QuestionCard({ data }: { data: Question }) {
  return (
    <Card className='gap-2' size='lg'>
      <CardHeader className='text-xl font-bold'>
        <Link
          className='py-2'
          href={joinUrl(ROUTES.questions, data.id.toString())}
        >
          {data.title}
        </Link>
      </CardHeader>
      <CardContent className='space-y-6'>
        <ul className='flex flex-wrap gap-2'>
          {data.tags.map((tag) => (
            <li key={tag.id}>
              <Badge variant='secondary' asChild>
                <Link href={ROUTES.tag(tag.id)}>
                  <MaybeImage
                    src={getDeviconUrl(tag.name)}
                    alt={tag.name}
                    width={14}
                    height={14}
                  />
                  <span>{tag.name}</span>
                </Link>
              </Badge>
            </li>
          ))}
        </ul>
        <div className='flex flex-wrap items-center justify-between gap-x-2 gap-y-3'>
          <div className='flex flex-wrap items-center'>
            <Button variant='ghost' asChild>
              <Link
                className='flex items-center gap-1 py-1'
                href={joinUrl(ROUTES.profile, data.creator.id.toString())}
              >
                <Avatar size='sm'>
                  <AvatarImage src={data.creator.image} />
                </Avatar>
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
