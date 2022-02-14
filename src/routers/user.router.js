const express = require("express");
const router = express.Router();

const { insertUser } = require("../model/user/User.model");
const { passwordHash } = require("../helpers/bcrypt.helper");

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
module.exports = router;
