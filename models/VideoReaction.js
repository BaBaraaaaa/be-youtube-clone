const mongoose = require('mongoose');

const videoReactionSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isLike: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VideoReaction', videoReactionSchema);
