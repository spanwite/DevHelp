import { Model, model, models, Schema, Types } from 'mongoose';

export interface Question {
  title: string;
  content: string;
  creator: Types.ObjectId;
  tags: Types.ObjectId[];
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
}

const QuestionSchema = new Schema<Question>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  { timestamps: true }
);

const Question: Model<Question> =
  models.Question || model('Question', QuestionSchema);

export default Question;
