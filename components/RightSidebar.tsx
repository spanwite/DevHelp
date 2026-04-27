'use client';

import { NavQuestions } from './navigation/NavQuestions';
import { NavTags } from './navigation/NavTags';
import { Sidebar } from './ui/sidebar';

const data = {
  questions: [
    {
      id: '1',
      text: 'How to implement a binary search algorithm in JavaScript?',
    },
    {
      id: '2',
      text: 'What are the best practices for responsive web design?',
    },
    {
      id: '3',
      text: 'How to optimize React performance for large applications?',
    },
    {
      id: '4',
      text: 'What is the difference between REST and GraphQL APIs?',
    },
  ],
  tags: [
    { id: '1', title: 'JavaScript', count: 120 },
    { id: '2', title: 'React', count: 95 },
    { id: '5', title: 'Next.js', count: 85 },
    { id: '3', title: 'CSS', count: 80 },
    { id: '4', title: 'Node.js', count: 60 },
  ],
};

export function RightSidebar() {
  return (
    <Sidebar side='right' className='max-w-64'>
      <NavQuestions items={data.questions} />
      <NavTags items={data.tags} />
    </Sidebar>
  );
}
