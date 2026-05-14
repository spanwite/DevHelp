// Auto-generated list of API route paths for convenient usage
// Usage: import { API } from '@/lib/api/routes';

import { Account } from '@/database/models/Account';
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from './fetch';
import { User } from '@/database/models/User';
import { joinUrl } from '../utils';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const API_USERS_URL = joinUrl(API_BASE_URL, 'users');
const API_ACCOUNTS_URL = joinUrl(API_BASE_URL, 'accounts');

const API_ROUTES = {
  users: {
    root: API_USERS_URL,
    byId: (id: string) => joinUrl(API_USERS_URL, id),
    byEmail: joinUrl(API_USERS_URL, 'email'),
  },
  accounts: {
    root: API_ACCOUNTS_URL,
    byId: (id: string) => joinUrl(API_ACCOUNTS_URL, id),
    byProviderAccountId: joinUrl(API_ACCOUNTS_URL, 'provider'),
  },
};

export const API = {
  users: {
    create(data: User) {
      return fetchApiPost<User>(API_ROUTES.users.root, data);
    },
    update(id: string, data: Partial<User>) {
      return fetchApiPut<User>(API_ROUTES.users.byId(id), data);
    },
    delete(id: string) {
      return fetchApiDelete<User>(API_ROUTES.users.byId(id));
    },
    getAll() {
      return fetchApiGet<User[]>(API_ROUTES.users.root);
    },
    getById(id: string) {
      return fetchApiGet<User>(API_ROUTES.users.byId(id));
    },
    getByEmail(email: string) {
      return fetchApiPost<User>(API_ROUTES.users.byEmail, { email });
    },
  },
  accounts: {
    create(data: Account) {
      return fetchApiPost<Account>(API_ROUTES.accounts.root, data);
    },
    update(id: string, data: Partial<Account>) {
      return fetchApiPut<Account>(API_ROUTES.accounts.byId(id), data);
    },
    delete(id: string) {
      return fetchApiDelete<Account>(API_ROUTES.accounts.byId(id));
    },
    getAll() {
      return fetchApiGet<Account[]>(API_ROUTES.accounts.root);
    },
    getById(id: string) {
      return fetchApiGet<Account>(API_ROUTES.accounts.byId(id));
    },
    getByProviderAccountId(providerAccountId: string) {
      return fetchApiPost<Account>(API_ROUTES.accounts.byProviderAccountId, {
        providerAccountId,
      });
    },
  },
  auth: {
    // next-auth catch-all route, append rest as needed
    root: '/api/auth',
    nextAuth: (path = '') => `/api/auth/${path}`.replace(/\/+$/, ''),
  },
};

export default API;
