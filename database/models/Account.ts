import { Model, model, models, Schema, Types } from 'mongoose';

export interface Account {
  userId: Types.ObjectId;
  username: string;
  avatar?: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}

const AccountSchema = new Schema<Account>(
  {
    username: { type: String, required: true },
    avatar: String,
    password: String,
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Account: Model<Account> =
  models.Account || model('Account', AccountSchema);

export default Account;
