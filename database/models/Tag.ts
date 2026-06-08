import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    questionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type TagDocument = mongoose.InferHydratedDocTypeFromSchema<
  typeof TagSchema
>;
export type TagRaw = mongoose.InferRawDocTypeFromSchema<typeof TagSchema>;

const Tag: mongoose.Model<TagRaw> =
  mongoose.models.Tag || mongoose.model('Tag', TagSchema);

export default Tag;
