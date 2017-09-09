const admin = require('firebase-admin');

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ message: 'Bad Input' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin.auth().createUser({ uid: phone })
    .then(user => res.send({ message: 'Create user success' }))
    .catch(error => {
      res.status(422).send({ message: 'Failed to create user', error });
    });
}
