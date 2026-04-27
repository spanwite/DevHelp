import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevExchange',
  description:
    'Платформа движемая сообществом для обмена знаниями и опытом в сфере разработки программного обеспечения. Задавайте вопросы, делитесь решениями и учитесь у других разработчиков. Независимо от вашего уровня опыта, DevExchange поможет вам найти ответы на ваши вопросы по различным темам: веб-разработка, мобильная разработка, базы данных, DevOps и многое другое. Присоединяйтесь к нашему сообществу и начните обмениваться знаниями уже сегодня!',
};

export default function Home() {
  return (
    <div className='container mx-auto px-4'>
      <div className='mt-10 text-3xl font-bold flex flex-wrap gap-2 justify-center'>
        Welcome to <pre className='text-accent'>/home</pre> page!
      </div>
    </div>
  );
}
