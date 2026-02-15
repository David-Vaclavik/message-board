require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const usersRouter = require("./routes/usersRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

// MUST use env variable for PORT when deploying to Railway, otherwise it will not work
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Listening on port ${PORT}!`);
});
