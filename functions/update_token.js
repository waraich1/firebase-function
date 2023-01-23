const {initializeApp, cert, getApp, getApps} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

const getToken = require("./reddit_outh");
const json = require("./firebaseConfig.json");

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const updateToken = async () => {
  const app = !getApps().length ?
    initializeApp({credential: cert(json)}) :
    getApp();
  const db = getFirestore(app);
  const outh = db.collection("access_token").doc("outh");
  const data = await getToken.getToken();
  console.log(data.access_token);
  const scope = data.scope;
  const expiresIn = data.expires_in;
  const accessToken = data.access_token;
  const tokenType = data.token_type;
  await outh.set({
    scope: scope,
    expires_in: expiresIn,
    access_token: accessToken,
    token_type: tokenType,
  });
};

module.exports = {updateToken};
