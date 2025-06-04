require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createUser() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = new User({
    name: 'Test User',
    email: 'user@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  });
  await user.save();
  console.log('User created:', user);
  mongoose.disconnect();
}

createUser();
