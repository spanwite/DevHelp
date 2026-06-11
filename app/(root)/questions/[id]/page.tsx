import { AnswerForm } from '@/components/AnswerForm';
import Preview from '@/components/Preview';
import { TagList } from '@/components/TagCard';
import { Button } from '@/components/ui/button';
import { Metric } from '@/components/ui/Metric';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/UserAvatar';
import { findQuestionById, viewQuestionById } from '@/lib/actions/question';
import { ROUTES } from '@/lib/constants';
import { safeAsync } from '@/lib/utils';
import {
  ArrowBigDown,
  ArrowBigUp,
  Clock,
  Eye,
  MessageCircle,
  Star,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';
import { after } from 'next/server';
import * as timeago from 'timeago.js';

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  after(() => viewQuestionById(id));

  const response = await safeAsync(() => findQuestionById(id));

  if (!response.success) {
    return <div>Error occured</div>;
  }

  if (response.data === null) {
    return <div>Question not found</div>;
  }

  const { data } = response;
  const { creator, tags } = data;

  return (
    <div className='flex flex-col gap-9'>
      <header className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <Link
            href={ROUTES.profile(creator._id)}
            className='flex items-center gap-2 font-medium'
          >
            <UserAvatar name={creator.name} image={creator.avatar} size='md' />
            {creator.name}
          </Link>
          <div className='flex items-center gap-1'>
            <Button variant='ghost'>
              <ArrowBigUp className='text-green-400' />
              <span className='bg-border text-muted-foreground flex size-5 items-center justify-center rounded-sm text-xs'>
                {data.upvotes}
              </span>
            </Button>
            <Button variant='ghost'>
              <ArrowBigDown className='text-red-400' />
              <span className='bg-border text-muted-foreground flex size-5 items-center justify-center rounded-sm text-xs'>
                {data.downvotes}
              </span>
            </Button>
            <Button variant='ghost'>
              <Star className='text-yellow-500' />
            </Button>
          </div>
        </div>
        <h1 className='text-2xl font-medium'>{data.title}</h1>
        <ul className='flex flex-wrap'>
          <li>
            <Metric
              icon={Clock}
              label={`Asked ${timeago.format(data.createdAt)}`}
            />
          </li>
          <li>
            <Metric icon={ThumbsUp} value={data.upvotes} label='Votes' />
          </li>
          <li>
            <Metric icon={Eye} value={data.views} label='Views' />
          </li>
          <li>
            <Metric icon={MessageCircle} value={data.answers} label='Answers' />
          </li>
        </ul>
      </header>
      <Preview content={data.description} />
      <TagList data={tags} />
      <Separator className='-my-2' />
      <AnswerForm />
    </div>
  );
}
