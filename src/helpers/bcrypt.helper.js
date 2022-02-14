const bcrypt = require("bcrypt");
const saltRounds = 10;

const passwordHash = (passwordPlain) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(passwordPlain, saltRounds));
  });
};

const comparePass = (passPlain, passFromBD) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passPlain, passFromBD, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  passwordHash,
  comparePass,
};
