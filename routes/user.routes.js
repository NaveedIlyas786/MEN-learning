const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const drivUserModel = require("../models/driveuser");
const bcrypt = require("bcrypt");

router.get("/driveUserRegister", (req, res) => {
  res.render("driveUserRegister");
});

router.post(
  "/drive-register-form",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({
        Errors: Errors.array(),
        message: "Invalid data!",
      });
    }

    const { username, email, password } = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the new user after validation
    const driveNewuser = await drivUserModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.json(driveNewuser);
    console.log("driveNewuser: ", driveNewuser);
  }
);

module.exports = router;
