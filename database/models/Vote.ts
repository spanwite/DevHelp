import mongoose from 'mongoose';

export interface Vote {
  user: mongoose.Types.ObjectId;
  targetId: mongoose.Types.ObjectId;
  /** The vote value, 1 for upvote, -1 for downvote */
  value: number;
}

const VoteSchema = new mongoose.Schema<Vote>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    value: { type: Number, enum: [1, -1], required: true },
  },
  { timestamps: true }
);

const Vote: mongoose.Model<Vote> =
  mongoose.models.Vote || mongoose.model('Vote', VoteSchema);

export default Vote;
