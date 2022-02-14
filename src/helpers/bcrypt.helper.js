const bcrypt = require("bcrypt");
const saltRounds = 10;

const passwordHash = (passwordPlain) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(passwordPlain, saltRounds));
  });
};

module.exports = {
  passwordHash,
};
