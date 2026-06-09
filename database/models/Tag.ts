import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    questionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type TagRaw = mongoose.InferSchemaType<typeof TagSchema>;
export type TagDocument = mongoose.HydratedDocument<TagRaw>;
export type TagJson = TagRaw & { _id: string };

const Tag: mongoose.Model<TagRaw> =
  mongoose.models.Tag || mongoose.model<TagRaw>('Tag', TagSchema);

export default Tag;
