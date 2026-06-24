import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Problem title is required'],
      trim: true
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy'
    },
    status: {
      type: String,
      enum: ['Solved', 'Pending'],
      default: 'Pending'
    },
    link: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Problem', problemSchema);