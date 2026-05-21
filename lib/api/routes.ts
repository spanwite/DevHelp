// Auto-generated list of API route paths for convenient usage
// Usage: import { API } from '@/lib/api/routes';

import { Account, AccountDocument } from '@/database/models/Account';
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from './fetch';
import { User, UserDocument } from '@/database/models/User';
import { joinUrl } from '../utils';
import { SignInWithOAuthData } from '../schemas/auth';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const API_USERS_URL = joinUrl(API_BASE_URL, 'users');
const API_ACCOUNTS_URL = joinUrl(API_BASE_URL, 'accounts');
const API_AUTH_URL = joinUrl(API_BASE_URL, 'auth');

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
  auth: {
    root: API_AUTH_URL,
    signInWithOAuth: joinUrl(API_AUTH_URL, 'sign-in', 'oauth'),
  },
};

export const API = {
  users: {
    create(data: User) {
      return fetchApiPost<UserDocument>(API_ROUTES.users.root, data);
    },
    update(id: string, data: Partial<User>) {
      return fetchApiPut<UserDocument>(API_ROUTES.users.byId(id), data);
    },
    delete(id: string) {
      return fetchApiDelete<UserDocument>(API_ROUTES.users.byId(id));
    },
    getAll() {
      return fetchApiGet<UserDocument[]>(API_ROUTES.users.root);
    },
    getById(id: string) {
      return fetchApiGet<UserDocument>(API_ROUTES.users.byId(id));
    },
    getByEmail(email: string) {
      return fetchApiPost<UserDocument>(API_ROUTES.users.byEmail, { email });
    },
  },
  accounts: {
    create(data: Account) {
      return fetchApiPost<AccountDocument>(API_ROUTES.accounts.root, data);
    },
    update(id: string, data: Partial<Account>) {
      return fetchApiPut<AccountDocument>(API_ROUTES.accounts.byId(id), data);
    },
    delete(id: string) {
      return fetchApiDelete<AccountDocument>(API_ROUTES.accounts.byId(id));
    },
    getAll() {
      return fetchApiGet<AccountDocument[]>(API_ROUTES.accounts.root);
    },
    getById(id: string) {
      return fetchApiGet<AccountDocument>(API_ROUTES.accounts.byId(id));
    },
    getByProviderAccountId(providerAccountId: string) {
      return fetchApiPost<AccountDocument>(
        API_ROUTES.accounts.byProviderAccountId,
        { providerAccountId }
      );
    },
  },
  auth: {
    signInWithOAuth(data: SignInWithOAuthData) {
      return fetchApiPost<AccountDocument>(
        API_ROUTES.auth.signInWithOAuth,
        data
      );
    },
  },
};

export default API;
