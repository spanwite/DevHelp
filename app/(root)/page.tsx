import { UrlFilter, UrlSearch } from '@/components/search';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import { data } from './data';
import { QuestionCard } from '@/components/question';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'DevExchange',
  description:
    'Платформа движемая сообществом для обмена знаниями и опытом в сфере разработки программного обеспечения. Задавайте вопросы, делитесь решениями и учитесь у других разработчиков. Независимо от вашего уровня опыта, DevExchange поможет вам найти ответы на ваши вопросы по различным темам: веб-разработка, мобильная разработка, базы данных, DevOps и многое другое. Присоединяйтесь к нашему сообществу и начните обмениваться знаниями уже сегодня!',
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  // TODO: Implement search functionality using searchParams
  const { query, filter } = await searchParams;

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
      <UrlFilter items={data.filters} />
      <ul className='grid gap-6'>
        {data.questions.map((question) => (
          <li key={question.id}>
            <QuestionCard data={question} />
          </li>
        ))}
      </ul>
    </section>
  );
}
