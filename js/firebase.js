// Import Firebase Admin SDK
const admin = require("firebase-admin");

// Load the service account key JSON
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK with the service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firebase Admin SDK instance for use in authentication
module.exports = admin;
