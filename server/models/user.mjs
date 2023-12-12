import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  joined: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

// Save is a MongoDB API, that is called by 'create'
UserSchema.pre("save", async function(next) {
    // this logic below allows us to protect the password
    // in the case of a user update, but
    // where the password
    if(!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

const User = model('User', UserSchema);
export default User;
