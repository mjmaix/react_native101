const twilio = require('twilio');
const functions = require('firebase-functions');

const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;
module.exports = new twilio.Twilio(accountSid, authToken);
