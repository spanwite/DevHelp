import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type QuestionRaw = mongoose.InferSchemaType<typeof QuestionSchema>;
export type QuestionDocument = mongoose.HydratedDocument<QuestionRaw>;
export type QuestionJson = QuestionRaw & { _id: string };

const Question: mongoose.Model<QuestionRaw> =
  mongoose.models.Question || mongoose.model<QuestionRaw>('Question', QuestionSchema);

export default Question;
