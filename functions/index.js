const functions = require("firebase-functions");
const updateToken = require("./update_token");
const admin = require("firebase-admin");
admin.initializeApp();
exports.scheduleFunction = functions.pubsub
    .schedule("0 0 * * *")
    .onRun((context) => {
      console.log("This will be run every 1 day");
      updateToken.updateToken().catch((e) => {
        console.error(e);
        process.exit(-1);
      });
      return null;
    });
