import { Model, Schema, Types, model, models } from 'mongoose';

export interface Answer {
  content: string;
  upvotes: number;
  downvotes: number;
  creator: Types.ObjectId;
  question: Types.ObjectId;
}

const AnswerSchema = new Schema<Answer>(
  {
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
  },
  { timestamps: true }
);

const Answer: Model<Answer> = models.Answer || model('Answer', AnswerSchema);

export default Answer;
