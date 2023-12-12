import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const Twit = mongoose.model('Twit');

export async function get (req) {
  const { by } = req.query;
  let q = by ? Twit.find({ by: by }) : Twit.find();
  return await q.sort('-at').populate('by');
}

export async function create (req) {
  const { text } = req.body;
  const t = new Twit({ text, by: req.session.user._id });
  await t.save();
  return t;
}

export async function update (req) {
  const { text } = req.body;
  const t = await Twit.findById(req.params.id);
  if (!t) {
    throw new Error('twit not found');
  }
  if (t.by.toString() !== req.session.user._id.toString()) {
    throw new Error('unauthorized');
  }
  t.text = text;
  await t.save();
  return t;
}

export async function remove (req) {
  await Twit.findByIdAndDelete(req.params.id);
}
