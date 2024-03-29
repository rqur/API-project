const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const { setTokenCookie } = require("../../utils/auth");
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  console.log(hashedPassword);
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });
  console.log({ firstName, lastName, user });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
  // console.log({ safeUser });

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});
module.exports = router;
