const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //checking if the input is valid else return the input error
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  //if input is valid, then finding in the databse if the user is already registered or not
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  //hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //saving the user
  await user.save();

  //showing user infomration
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
