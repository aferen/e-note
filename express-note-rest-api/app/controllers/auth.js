const jwt = require('jsonwebtoken')

module.exports = {
  login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(404).send({
        message: "Email and password can not be empty!",
      });
    } else {
      const username = req.body.username;
      const password = req.body.password;
      if (
        username === process.env._USERNAME &&
        password === process.env._PASSWORD
      ) {
        const expiration =
          Math.floor(Date.now() / 1000) +
          60 * process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTES;

        const token = jwt.sign(
          {
            data: {
                username
            },
            exp: expiration,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            issuer: "accounts.examplesoft.com",
            audience: "yoursite.net",
          }
        );
        return res.status(200).send({ user: username, token: token });
      }
      return res.status(404).send({
        error: "Invalid username or password.",
      });
    }
  },
};
