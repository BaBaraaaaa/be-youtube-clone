const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  subscriberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Ở đây channel là User (người dùng)
  subscribedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
