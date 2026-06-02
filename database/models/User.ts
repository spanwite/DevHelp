import mongoose from 'mongoose';

export interface User {
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  location?: string;
  website?: string;
  bio?: string;
  reputation?: number;
}

const UserSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: String,
    location: String,
    website: String,
    bio: String,
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type UserDocument = mongoose.InferHydratedDocTypeFromSchema<
  typeof UserSchema
>;

const User: mongoose.Model<User> =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default User;
