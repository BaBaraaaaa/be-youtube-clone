exports.getProfile = (req, res) => {
  res.json({ message: "User profile", user: req.user });
};

exports.updateSettings = (req, res) => {
  res.json({ message: "Update settings" });
};

exports.getSubscriptions = (req, res) => {
  res.json({ message: "User subscriptions" });
};

exports.getHistory = (req, res) => {
  res.json({ message: "User watch history" });
};
