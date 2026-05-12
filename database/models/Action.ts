import mongoose from 'mongoose';

export interface Action {
  type: 'view' | 'upvote' | 'downvote';
  user: mongoose.Types.ObjectId;
  targetId: mongoose.Types.ObjectId;
}

const ActionSchema = new mongoose.Schema<Action>({
  type: { type: String, enum: ['view', 'upvote', 'downvote'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Action: mongoose.Model<Action> =
  mongoose.models.Action || mongoose.model('Action', ActionSchema);

export default Action;
