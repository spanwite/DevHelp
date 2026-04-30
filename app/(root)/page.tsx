import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import { UrlSearch } from '@/components/search';
import { use } from 'react';

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
  const params = await searchParams;

  return (
    <section className='mx-auto max-w-7xl px-9 py-16'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>All Questions</h1>
        <Button variant='gradient-accent' size='lg' asChild>
          <Link href={ROUTES.askQuestion}>Ask a Question</Link>
        </Button>
      </div>
      <UrlSearch placeholder='Search for questions...' className='mb-4' />
      <ul className='flex gap-2'>
        <li>Category #1</li>
        <li>Category #2</li>
        <li>Category #3</li>
        <li>Category #4</li>
      </ul>
      <ul>
        <li>Question #1</li>
        <li>Question #2</li>
        <li>Question #3</li>
        <li>Question #4</li>
      </ul>
    </section>
  );
}
