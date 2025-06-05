const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const User = require("./models/User");
const Video = require("./models/Video");
const Comment = require("./models/Comment");
const Playlist = require("./models/Playlist");
const Notification = require("./models/Notification");
const Subscription = require("./models/Subscription");
const VideoReaction = require("./models/VideoReaction");
const Token = require("./models/Token");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/your-db";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Promise.all([
      User.deleteMany(),
      Video.deleteMany(),
      Comment.deleteMany(),
      Playlist.deleteMany(),
      Notification.deleteMany(),
      Subscription.deleteMany(),
      VideoReaction.deleteMany(),
      Token.deleteMany(),
    ]);

    // Create users
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(
        new User({
          username: faker.internet.username(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
          fullName: faker.person.fullName(),
          profilePictureUrl: faker.image.avatar(),
        })
      );
    }
    await User.insertMany(users);

    // Create videos
    const videos = [];
    for (let i = 0; i < 15; i++) {
      const user = faker.helpers.arrayElement(users);
      videos.push(
        new Video({
          userId: user._id,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          videoUrl: faker.internet.url(),
          thumbnailUrl: faker.image.url(),
          duration: faker.number.int({ min: 60, max: 3600 }),
          tags: faker.lorem.words(5).split(" "),
        })
      );
    }
    await Video.insertMany(videos);

    // Create playlists
    const playlists = [];
    for (let i = 0; i < 10; i++) {
      const user = faker.helpers.arrayElement(users);
      const sampleVideos = faker.helpers.arrayElements(videos, 3);
      playlists.push(
        new Playlist({
          userId: user._id,
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          isPublic: faker.datatype.boolean(),
          videoIds: sampleVideos.map((v) => v._id),
        })
      );
    }
    await Playlist.insertMany(playlists);

    // Create comments with parent/child
    const comments = [];
    for (let i = 0; i < 30; i++) {
      const user = faker.helpers.arrayElement(users);
      const video = faker.helpers.arrayElement(videos);
      const comment = new Comment({
        userId: user._id,
        videoId: video._id,
        content: faker.lorem.sentence(),
      });
      comments.push(comment);
    }

    // Add replies (nested)
    const replies = [];
    for (let i = 0; i < 10; i++) {
      const parent = faker.helpers.arrayElement(comments);
      const user = faker.helpers.arrayElement(users);
      replies.push(
        new Comment({
          userId: user._id,
          videoId: parent.videoId,
          content: faker.lorem.sentence(),
          parentCommentId: parent._id,
        })
      );
    }
    await Comment.insertMany([...comments, ...replies]);

    // Create notifications
    const notifications = [];
    for (let i = 0; i < 20; i++) {
      const user = faker.helpers.arrayElement(users);
      notifications.push(
        new Notification({
          userId: user._id,
          type: faker.helpers.arrayElement([
            "video_upload",
            "comment",
            "like",
            "subscription",
          ]),
          referenceId: faker.database.mongodbObjectId(),
          message: faker.lorem.sentence(),
          isRead: faker.datatype.boolean(),
        })
      );
    }
    await Notification.insertMany(notifications);

    // Create subscriptions
    const subscriptions = [];
    for (let i = 0; i < 10; i++) {
      let subscriber = faker.helpers.arrayElement(users);
      let channel = faker.helpers.arrayElement(users);
      while (subscriber._id.equals(channel._id)) {
        channel = faker.helpers.arrayElement(users);
      }
      subscriptions.push(
        new Subscription({
          subscriberId: subscriber._id,
          channelId: channel._id,
        })
      );
    }
    await Subscription.insertMany(subscriptions);

    // Create reactions
    const reactions = [];
    for (let i = 0; i < 25; i++) {
      const user = faker.helpers.arrayElement(users);
      const video = faker.helpers.arrayElement(videos);
      reactions.push(
        new VideoReaction({
          userId: user._id,
          videoId: video._id,
          isLike: faker.datatype.boolean(),
        })
      );
    }
    await VideoReaction.insertMany(reactions);

    // Create tokens
    const tokens = [];
    for (let i = 0; i < 10; i++) {
      const user = faker.helpers.arrayElement(users);
      tokens.push(
        new Token({
          user: user._id,
          token: faker.string.uuid(),
        })
      );
    }
    await Token.insertMany(tokens);

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
