const mongoose = require('mongoose');

const { Schema } = mongoose;

const HostelSchema = new Schema({
  id: { type: Number, required: true},
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  ratedFeatures: [
    {
      feature: { type: String },
      rating: { type: Number },
      featureId: { type: Number },
    },
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
  avgRating: { type: Number },
});

module.exports = mongoose.model('hostel', HostelSchema);
