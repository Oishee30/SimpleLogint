const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //checking if the input is valid else return the input error
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //if input is valid, then finding in the databse if the user is available or not
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).sendFile("error.html", { root: __dirname });

  //checks if the hashpassword matches
  const validPasword = await bcrypt.compare(req.body.password, user.password);

  //if unsuccessful
  if (!validPasword)
    return res.status(400).sendFile("error.html", {
      root: require("path").resolve(__dirname, "../views"),
    });
  //if successful
  res.sendFile("success.html", {
    root: require("path").resolve(__dirname, "../views"),
  });
});

//vailidate function check the email and passwords pattern is right or not initially
function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
