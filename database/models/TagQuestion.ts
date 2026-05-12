import mongoose from 'mongoose';

export interface TagQuestion {
  tag: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
}

const TagQuestionSchema = new mongoose.Schema<TagQuestion>({
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

const TagQuestion: mongoose.Model<TagQuestion> =
  mongoose.models.TagQuestion ||
  mongoose.model('TagQuestion', TagQuestionSchema);

export default TagQuestion;
