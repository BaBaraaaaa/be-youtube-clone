// controllers/playlistController.js

// Xử lý GET /playlist/:playlistId
exports.viewPlaylist = (req, res) => {
  const playlistId = req.params.playlistId;
  res.json({ message: `View playlist ${playlistId}` });
};

// Xử lý PUT /playlist/edit/:playlistId
exports.editPlaylist = (req, res) => {
  const playlistId = req.params.playlistId;
  res.json({ message: `Edit playlist ${playlistId}` });
};

// Xử lý POST /playlist/create
exports.createPlaylist = (req, res) => {
  res.json({ message: "Create playlist" });
};
