const admin = require('firebase-admin');
const twilio = require('./twilio');
const functions = require('firebase-functions');
const own_number = `${functions.config().twilio.own_number}`;

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ message: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));

      twilio.messages.create({
        body: `Your code is ${code}`,
        to: `+${phone}`,
        from: own_number
      }, (error) => {
        if (error) {
          return res.status(422).send({ message: 'Failed to send OTP', error });
        }

        admin.database().ref('users/' + phone)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true });
          });
      });
    })
    .catch((error) => {
      res.status(422).send({ message: 'User not found', error });
    });
}
