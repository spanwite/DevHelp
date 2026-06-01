import { DocJSON } from '@/lib/mongodb';
import {
  InferHydratedDocTypeFromSchema,
  Model,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

export interface Question {
  title: string;
  description: string;
  creator: Types.ObjectId;
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
}

const QuestionSchema = new Schema<Question>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Question: Model<Question> =
  models.Question || model('Question', QuestionSchema);

export type QuestionObject = DocJSON<Question>;

export default Question;
