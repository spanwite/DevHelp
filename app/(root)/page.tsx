import { UrlFilter, UrlSearch } from '@/components/search';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import { QuestionCard } from '@/components/question';
import { findQuestions } from '@/lib/actions/question';
import ThemeImage from '@/components/utils/ThemeImage';

export const metadata: Metadata = {
  title: 'DevExchange',
  description:
    'Платформа движемая сообществом для обмена знаниями и опытом в сфере разработки программного обеспечения. Задавайте вопросы, делитесь решениями и учитесь у других разработчиков. Независимо от вашего уровня опыта, DevExchange поможет вам найти ответы на ваши вопросы по различным темам: веб-разработка, мобильная разработка, базы данных, DevOps и многое другое. Присоединяйтесь к нашему сообществу и начните обмениваться знаниями уже сегодня!',
};

const filters = [
  { name: 'Newest', value: 'newest' },
  { name: 'Recommended', value: 'recommended' },
  { name: 'Most Answered', value: 'most-answered' },
  { name: 'Unanswered', value: 'unanswered' },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { query, filter, page = 1, limit = 10 } = await searchParams;

  const content = await (async () => {
    try {
      const { questions } = await findQuestions({
        page: Number(page),
        limit: Number(limit),
        query,
        filter,
      });

      if (questions.length === 0) {
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
        <ul className='grid gap-6'>
          {questions.map((question) => (
            <li key={question._id}>
              <QuestionCard data={question} />
            </li>
          ))}
        </ul>
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unhandled error happened while retrieving questions...';
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
        <h1 className='text-3xl font-bold'>All Questions</h1>
        <Button
          variant='gradient-accent'
          size='lg'
          className='max-xs:flex-1'
          asChild
        >
          <Link href={ROUTES.askQuestion}>Ask a Question</Link>
        </Button>
      </div>
      <UrlSearch placeholder='Search for questions...' />
      <UrlFilter items={filters} />
      {content}
    </section>
  );
}
