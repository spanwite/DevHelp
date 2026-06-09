import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
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

export type UserRaw = mongoose.InferSchemaType<typeof UserSchema>;
export type UserDocument = mongoose.HydratedDocument<UserRaw>;
export type UserJson = UserRaw & { _id: string };

const User: mongoose.Model<UserRaw> =
  mongoose.models.User || mongoose.model<UserRaw>('User', UserSchema);

export default User;
