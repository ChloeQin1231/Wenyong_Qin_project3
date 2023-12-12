import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export function returnUser (u) {
  return User.findById(u._id).select('-password');
}

export async function signup (req) {
  const { username, password, nickname } = req.body;
  const u = await User.findOne({ username });
  if (u) {
    throw new Error('User already existed');
  }
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, nickname, password: hash });
  await user.save();
  req.session.user = user;
  return returnUser(user);
}

export async function login (req) {
  const { username, password } = req.body;
  const u = await User.findOne({ username: username });
  if (!u) {
    throw new Error('user not found');
  }
  const ok = await bcrypt.compare(password, u.password);
  if (!ok) {
    throw new Error('password not match');
  }
  req.session.user = u;
  return returnUser(u);
}

export async function edit (req) {
  const { nickname, bio } = req.body;
  const u = await User.findById(req.session.user._id);
  if (!u) {
    throw new Error('user not found');
  }
  u.nickname = nickname;
  u.bio = bio;
  await u.save();
  return returnUser(u);
}

export async function logout (req) {
  req.session.user = null;
}

export async function get (req) {
  // console.log(req.params.id)
  return returnUser(await User.findById(req.params.id));
}

export async function getCurrent (req) {
  return req.session.user ? returnUser(req.session.user) : null;
}

export function loginRequired (req, res, next) {
  if (!req.session.user) {
    res.status(401).json({ msg: 'login required' });
  } else {
    next();
  }
}
