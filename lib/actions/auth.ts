'use server';

import { SignInData, SignUpData } from '../schemas/auth';
import { dbConnect } from '../mongodb';
import mongoose from 'mongoose';
import User from '@/database/models/User';
import { ConflictError, ForbiddenError, NotFoundError } from '../api/errors';
import argon2 from 'argon2';
import Account from '@/database/models/Account';
import { signIn, signOut as nextSignOut } from '@/auth';
import { logger } from '../logger';

export async function signUpWithCredentials(data: SignUpData) {
  await dbConnect();

  const [existingUserWithEmail, existingUserWithUsername] = await Promise.all([
    User.findOne({ email: data.email }),
    User.findOne({ username: data.username }),
  ]);

  if (existingUserWithEmail || existingUserWithUsername) {
    const field = existingUserWithEmail ? 'email' : 'username';
    throw new ConflictError(`A user with this ${field} already exists`, {
      data,
    });
  }

  const passwordHash = await argon2.hash(data.password);
  const session = await mongoose.startSession();

  try {
    const { user, account } = await session.withTransaction(async () => {
      const [user] = await User.create(
        [
          {
            username: data.username,
            name: data.name,
            email: data.email,
            password: passwordHash,
          },
        ],
        { session }
      );

      const [account] = await Account.create(
        [
          {
            userId: user._id,
            username: data.username,
            provider: 'credentials',
            providerAccountId: user.email,
            password: passwordHash,
          },
        ],
        { session }
      );

      return { user, account };
    });

    logger.info('User signed up successfully', {
      user,
      account,
    });

    await signIn('credentials', {
      email: user.email,
      password: data.password,
      redirect: false,
    });
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(data: SignInData) {
  const { email, password } = data;

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('No user found with this email', {
      email,
    });
  }

  const account = await Account.findOne({
    provider: 'credentials',
    providerAccountId: email,
  });
  if (!account) {
    throw new NotFoundError('No account found for this user', {
      email,
    });
  }

  const isPasswordValid = await argon2.verify(account.password!, password);
  if (!isPasswordValid) {
    throw new ForbiddenError('Invalid password', {
      email,
      password,
    });
  }

  await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
}

export async function signOut() {
  await nextSignOut();
}
