import mongoose from 'mongoose';

export interface Collection {
  name: string;
  description?: string;
  creator: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
}

const CollectionSchema = new mongoose.Schema<Collection>(
  {
    name: { type: String, required: true },
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  },
  { timestamps: true }
);

const Collection: mongoose.Model<Collection> =
  mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);

export default Collection;
