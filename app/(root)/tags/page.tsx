import { UrlFilter, UrlSearch } from '@/components/search';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import ThemeImage from '@/components/utils/ThemeImage';
import { findManyTags } from '@/lib/actions/tag';
import TagCard from '@/components/TagCard';

const filters = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Oldest', value: 'oldest' },
  { name: 'A-Z', value: 'name' },
];

export default async function TagsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { query, filter, page = 1, limit = 10 } = await searchParams;

  const content = await (async () => {
    try {
      const { tags } = await findManyTags({
        page: Number(page),
        limit: Number(limit),
        query,
        sort: filter,
      });

      if (tags.length === 0) {
        return (
          <div className='mx-auto mt-8 flex max-w-sm flex-col items-center gap-4'>
            <ThemeImage
              srcLight='/auth-light.svg'
              srcDark='/auth-dark.svg'
              alt='Error illustration'
              width={270}
              height={200}
            />
            <h2 className='mt-2 text-2xl font-bold'>
              There’s no question to show
            </h2>
            <p>
              Be the first to break the silence! 🚀 Ask a Question and kickstart
              the discussion. our query could be the next big thing others learn
              from. Get involved! 💡
            </p>
            <Button variant='gradient-accent' size='lg' asChild>
              <Link href={ROUTES.askQuestion}>Ask a Question</Link>
            </Button>
          </div>
        );
      }

      return (
        <ul className='flex flex-wrap gap-6'>
          {tags.map((tag) => (
            <li key={tag._id} className='max-w-56'>
              <TagCard data={tag} />
            </li>
          ))}
        </ul>
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unhandled error happened while finding tags...';
      return (
        <div className='mx-auto mt-8 flex max-w-sm flex-col items-center gap-3.5'>
          <ThemeImage
            srcLight='/error-light.svg'
            srcDark='/error-dark.svg'
            alt='Error illustration'
            width={270}
            height={200}
          />
          <h2 className='mt-2 text-2xl font-bold'>
            Opps! Something Went Wrong
          </h2>
          <p>{message}</p>
          <Button variant='secondary' size='lg' asChild>
            <Link href={ROUTES.home}>Go back</Link>
          </Button>
        </div>
      );
    }
  })();

  return (
    <section className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <h1 className='text-3xl font-bold'>All Tags</h1>
      </div>
      <UrlSearch placeholder='Search for questions...' />
      <UrlFilter items={filters} />
      {content}
    </section>
  );
}
