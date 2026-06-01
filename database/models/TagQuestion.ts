import mongoose from 'mongoose';

export interface TagQuestion {
  tagId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
}

const TagQuestionSchema = new mongoose.Schema<TagQuestion>({
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

const TagQuestion: mongoose.Model<TagQuestion> =
  mongoose.models.TagQuestion ||
  mongoose.model('TagQuestion', TagQuestionSchema);

export default TagQuestion;
