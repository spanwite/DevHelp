import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LucideIcon,
  MessageCircleQuestionMarkIcon,
  StarIcon,
  TagIcon,
  UserIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { joinUrl } from './utils';

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  collections: '/collections',
  jobs: '/jobs',
  communities: '/communities',
  tags: '/tags',
  askQuestion: '/ask-question',
  profiles: '/profiles',
  questions: '/questions',

  profile(id: string) {
    return joinUrl(this.profiles, id);
  },
  tag(id: string | number) {
    return joinUrl(this.tags, id.toString());
  },
  question(id: string) {
    return joinUrl(this.questions, id);
  },
} as const;

export const NAVIGATION_LINKS: {
  title: string;
  url: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Home',
    url: ROUTES.home,
    icon: HomeIcon,
  },
  {
    title: 'Collections',
    url: ROUTES.collections,
    icon: StarIcon,
  },
  {
    title: 'Find Jobs',
    url: ROUTES.jobs,
    icon: BriefcaseBusinessIcon,
  },
  {
    title: 'Tags',
    url: ROUTES.tags,
    icon: TagIcon,
  },
  {
    title: 'Communities',
    url: ROUTES.communities,
    icon: UsersRoundIcon,
  },
  {
    title: 'Profile',
    url: ROUTES.profiles,
    icon: UserIcon,
  },
  {
    title: 'Ask a Question',
    url: ROUTES.askQuestion,
    icon: MessageCircleQuestionMarkIcon,
  },
];
