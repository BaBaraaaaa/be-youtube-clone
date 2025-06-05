// controllers/videoController.js

exports.watchVideo = (req, res) => {
  const videoId = req.params.videoId;
  res.json({ message: `Watch video ${videoId}` });
};

exports.editVideo = (req, res) => {
  const videoId = req.params.videoId;
  res.json({ message: `Edit video ${videoId}` });
};

exports.uploadVideo = (req, res) => {
  res.json({ message: "Upload video" });
};
