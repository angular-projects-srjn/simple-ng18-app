const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 4200;

// importing the dotenv module to use environment variables:
require("dotenv").config();

app.use(express.static(resolve(__dirname, "./dist/angular_18_tutorial/browser")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const path = resolve("./dist/angular_18_tutorial/browser" + "/index.html");
  res.sendFile(path);
});


// Server listening:
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  // console.log(`You may access you app at: ${domainURL}`);
});
