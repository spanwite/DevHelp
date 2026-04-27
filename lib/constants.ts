import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LucideProps,
  MessageCircleQuestionMarkIcon,
  StarIcon,
  TagIcon,
  UserIcon,
  UsersRoundIcon,
} from 'lucide-react';

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  collections: '/collections',
  jobs: '/jobs',
  communities: '/communities',
  tags: '/tags',
  askQuestion: '/ask-question',
  profile: '/profile',
} as const;

export const NAVIGATION_LINKS: {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: 'Home',
    href: ROUTES.home,
    icon: HomeIcon,
  },
  {
    title: 'Collections',
    href: ROUTES.collections,
    icon: StarIcon,
  },
  {
    title: 'Find Jobs',
    href: ROUTES.jobs,
    icon: BriefcaseBusinessIcon,
  },
  {
    title: 'Tags',
    href: ROUTES.tags,
    icon: TagIcon,
  },
  {
    title: 'Communities',
    href: ROUTES.communities,
    icon: UsersRoundIcon,
  },
  {
    title: 'Profile',
    href: ROUTES.profile,
    icon: UserIcon,
  },
  {
    title: 'Ask a Question',
    href: ROUTES.askQuestion,
    icon: MessageCircleQuestionMarkIcon,
  },
];
