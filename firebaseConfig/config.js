const admin = require("firebase-admin");
const serviceAccount = require("./key.json");
const serviceAccountProduction = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountProduction),
});

module.exports = admin;
