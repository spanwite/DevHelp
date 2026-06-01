import Account from '@/database/models/Account';
import User from '@/database/models/User';
import { withErrorHandler } from '@/lib/api/error-handler';
import { formSuccessResponse } from '@/lib/api/response';
import { parseJson, parseSchema } from '@/lib/api/validation';
import { dbConnect } from '@/lib/mongodb';
import { signInWithOAuthSchema } from '@/lib/schemas/auth';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

async function handlePOST(request: NextRequest) {
  const json = await parseJson(request);
  const data = await parseSchema(signInWithOAuthSchema, json);

  await dbConnect();

  const session = await mongoose.startSession();

  try {
    const [account, user] = await session.withTransaction(async () => {
      let user = await User.findOne({ email: data.email }).session(session);
      if (user) {
        const updatedData = {
          ...(data.name !== user.name ? { name: data.name } : {}),
          ...(data.avatar !== user.avatar ? { avatar: data.avatar } : {}),
        };
        if (Object.keys(updatedData).length > 0) {
          await User.updateOne({ _id: user._id }, updatedData).session(session);
        }
      } else {
        [user] = await User.create(
          [
            {
              name: data.name,
              email: data.email,
              avatar: data.avatar,
              username: data.username,
            },
          ],
          { session }
        );
      }

      let account = await Account.findOne({
        userId: user._id,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
      }).session(session);

      if (!account) {
        [account] = await Account.create(
          [
            {
              userId: user._id,
              avatar: user.avatar,
              username: user.username,
              provider: data.provider,
              providerAccountId: data.providerAccountId,
            },
          ],
          { session }
        );
      }

      return [account, user];
    });

    return formSuccessResponse({
      data: { account: account.toObject(), user: user.toObject() },
    });
  } finally {
    await session.endSession();
  }
}

export const POST = withErrorHandler(handlePOST);
