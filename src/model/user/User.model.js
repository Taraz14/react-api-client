const { UserSchema } = require("./User.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return false;

    try {
      UserSchema.findOne({ username }, (error, data) => {
        if (error) {
          console.log(error);
          resolve(error);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertUser,
  getUserByUsername,
};
