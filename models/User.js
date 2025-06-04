const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // username duy nhất
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  fullName: String,
  profilePictureUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Tự động cập nhật updatedAt khi chỉnh sửa
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
