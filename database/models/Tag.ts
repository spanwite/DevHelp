import mongoose, { InferHydratedDocTypeFromSchema } from 'mongoose';

export interface Tag {
  name: string;
  description?: string;
  questionsCount: number;
}

const TagSchema = new mongoose.Schema<Tag>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    questionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tag: mongoose.Model<Tag> =
  mongoose.models.Tag || mongoose.model('Tag', TagSchema);

export type TagDocument = InferHydratedDocTypeFromSchema<typeof TagSchema>;

export default Tag;
