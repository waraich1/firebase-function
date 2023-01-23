const axios = require("axios");
const qs = require("querystring");

const getToken = async function() {
  /*
        all four of these veriables below should be kept secure
    */
  // client id and secret come from making a 'script' app at this site https://www.reddit.com/prefs/apps
  const clientId = "7dlaGED5g8Z9nqyuWifKqA";
  const clientSecret = "qLG8_LvLVlix4p8gfjMJ1LOyTOZ8pg";

  // this is the developers reddit ui
  // d and pwd. as if they were logging into reddit site.
  const uid = "trenddit-dev";
  const pwd = "Varun@legend";

  const resp = await axios
      .post(
          "https://www.reddit.com/api/v1/access_token",
          qs.stringify({
            grant_type: "password",
            username: uid,
            password: pwd,
          }),
          {
            auth: {username: clientId, password: clientSecret},
          },
      )
      .catch(function(err) {
        throw err;
      });

  return resp.data;
};

module.exports = {getToken};

getToken();
