const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String },
  avatar: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  country: { type: String },
  status: { type: String },
  age: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
