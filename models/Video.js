const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },
  thumbnailUrl: String,
  duration: { type: Number, required: true },
  views: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: true },
  tags: [String],
});

module.exports = mongoose.model("Video", videoSchema);
