const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  propertyResponse: {},
  rate: {
    type: Number,
  },
  language: {
    type: String,
  },
  hostel: {
    type: Schema.Types.ObjectId,
    ref: 'hostel',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('review', ReviewSchema);
