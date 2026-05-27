import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import API from './lib/api/routes';
import {
  SignInProvider,
  signInSchema,
  SignInWithOAuthData,
} from './lib/schemas/auth';
import { logger } from './lib/logger';
import { retrieveUsernameFromEmail } from './lib/utils';
import slugify from 'slugify';
import { nanoid } from 'nanoid';
import Credentials from 'next-auth/providers/credentials';
import argon2 from 'argon2';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const { success, data } =
          await signInSchema.safeParseAsync(credentials);
        if (!success) {
          return null;
        }

        const account = await API.accounts.getByProviderAccountId(data.email);
        if (!account) {
          return null;
        }

        const user = await API.users.getById(account.userId.toString());
        if (!user) {
          return null;
        }

        const isPasswordValid = await argon2.verify(
          user.password!,
          data.password
        );
        console.log('Password verification result:', isPasswordValid);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      logger.info('Sign-in callback called', { user, account, profile });

      if (!account) {
        logger.warn('Sign-in callback failed: No account found', {
          user,
          profile,
        });
        return false;
      }

      if (account.type === 'credentials') {
        return true;
      }

      const formUniqueUsername = (): string => {
        let username: string = '';
        if (profile && typeof profile.login === 'string') {
          username = profile.login;
        }
        if (user.name) {
          username = user.name;
        }
        if (user.email) {
          username = retrieveUsernameFromEmail(user.email);
        }
        if (!username) {
          return `user-${nanoid(10)}`;
        }
        username = slugify(username, {
          lower: true,
          trim: true,
          strict: true,
        });
        return `${username}-${nanoid(5)}`;
      };

      const data: SignInWithOAuthData = {
        username: formUniqueUsername(),
        email: user.email!,
        name: user.name!,
        provider: account.provider! as SignInProvider,
        providerAccountId: account.providerAccountId,
        avatar: user.image!,
      };

      try {
        await API.auth.signInWithOAuth(data);
      } catch (error) {
        logger.error('Error during sign-in with OAuth', error, {
          data,
        });
        return false;
      }

      return true;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      return session;
    },
    jwt: async ({ token, account, profile }) => {
      if (!account) {
        return token;
      }
      try {
        if (account.type === 'credentials') {
          const user = await API.users.getByEmail(token.email!);
          token.sub = user._id.toString();
        } else {
          const existingAccount = await API.accounts.getByProviderAccountId(
            account.providerAccountId
          );
          token.sub = existingAccount.userId.toString();
        }
      } catch (error) {
        logger.error('Error in JWT callback', error, {
          token,
          account,
          profile,
        });
      } finally {
        return token;
      }
    },
  },
});
