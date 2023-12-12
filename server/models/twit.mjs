import { Schema, model } from 'mongoose';

const TwitSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

model('Twit', TwitSchema);
