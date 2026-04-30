import { UrlFilter, UrlSearch } from '@/components/search';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DevExchange',
  description:
    'Платформа движемая сообществом для обмена знаниями и опытом в сфере разработки программного обеспечения. Задавайте вопросы, делитесь решениями и учитесь у других разработчиков. Независимо от вашего уровня опыта, DevExchange поможет вам найти ответы на ваши вопросы по различным темам: веб-разработка, мобильная разработка, базы данных, DevOps и многое другое. Присоединяйтесь к нашему сообществу и начните обмениваться знаниями уже сегодня!',
};

const data = {
  filters: [
    { name: 'Newest', value: 'newest' },
    { name: 'Recommended', value: 'recommended' },
    { name: 'Most Answered', value: 'most-answered' },
    { name: 'Unanswered', value: 'unanswered' },
  ],
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  // TODO: Implement search functionality using searchParams
  const { query, filter } = await searchParams;

  return (
    <section className='mx-auto max-w-7xl space-y-6 px-9 py-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>All Questions</h1>
        <Button variant='gradient-accent' size='lg' asChild>
          <Link href={ROUTES.askQuestion}>Ask a Question</Link>
        </Button>
      </div>
      <UrlSearch placeholder='Search for questions...' />
      <UrlFilter items={data.filters} />
      <ul>
        <li>Question #1</li>
        <li>Question #2</li>
        <li>Question #3</li>
        <li>Question #4</li>
      </ul>
    </section>
  );
}
