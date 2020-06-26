const Joi = require("joi");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");

//connected to mongo db login app
mongoose
  .connect("mongodb://localhost/loginApp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

//applying middleware function
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", auth);
app.use("/api/users", users);

//initiaize to login page
app.get("/", (req, res) => {
  res.sendFile("/views/login.html", { root: __dirname });
});

//listening to port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
