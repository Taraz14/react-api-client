const express = require("express");
const router = express.Router();

const { insertUser, getUserByUsername } = require("../model/user/User.model");
const { passwordHash, comparePass } = require("../helpers/bcrypt.helper");
const { json } = require("body-parser");

router.all("/", (req, res, next) => {
  //   res.json({ message: "return form user router" });

  next();
});

router.post("/", async (req, res) => {
  const { name, company, address, phone, email, username, password } = req.body;

  try {
    //hashing
    const passHash = await passwordHash(password);

    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      username,
      password: passHash,
    };

    const result = await insertUser(newUserObj);
    console.log(result);
    res.json({ message: "New User created", result });
  } catch (error) {
    console.log(error);
    res.json({ statux: "error", message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ status: "error", message: "Invalid form submition" });
  }

  const user = await getUserByUsername(username);

  const passFromDB = user._id ? user.password : null;

  if (!passFromDB)
    return res.json({ status: "error", message: "Invalid form submition" });

  const result = await comparePass(password, passFromDB);
  console.log(result);

  res.json({ status: "berhasil", message: "login berhasil" });
});
module.exports = router;
