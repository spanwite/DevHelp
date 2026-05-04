import { Question } from '@/types';

export const data: {
  filters: { name: string; value: string }[];
  questions: Question[];
} = {
  filters: [
    { name: 'Newest', value: 'newest' },
    { name: 'Recommended', value: 'recommended' },
    { name: 'Most Answered', value: 'most-answered' },
    { name: 'Unanswered', value: 'unanswered' },
  ],
  questions: [
    {
      id: 1,
      title: 'How to center a div in CSS?',
      tags: [
        { id: 1, name: 'CSS' },
        { id: 2, name: 'HTML' },
      ],
      creator: {
        id: 1,
        name: 'John Doe',
        image: '/avatar-placeholder.png',
      },
      createdAt: new Date('2024-01-15T10:00:00Z'),
      upvotes: 12,
      answers: 3,
      views: 150,
    },
    {
      id: 2,
      title: 'What is the difference between let and var in JavaScript?',
      tags: [
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'ES6' },
      ],
      creator: { id: 2, name: 'Jane Smith', image: '/avatar-placeholder.png' },
      createdAt: new Date('2024-02-20T14:30:00Z'),
      upvotes: 27,
      answers: 5,
      views: 420,
    },
    {
      id: 3,
      title: 'How do I fetch data from an API in React?',
      tags: [
        { id: 3, name: 'JavaScript' },
        { id: 5, name: 'React' },
        { id: 6, name: 'API' },
      ],
      creator: { id: 3, name: 'Alice Johnson', image: '/avatar-placeholder.png' },
      createdAt: new Date('2024-03-05T08:15:00Z'),
      upvotes: 34,
      answers: 7,
      views: 980,
    },
  ],
};
