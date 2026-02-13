const path = require("node:path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New" },
];

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Define routes
app.get("/", (req, res) => {
  const formattedMessages = messages.map((msg) => ({
    ...msg,
    // toLocaleString() method has more options to format the date, maybe we can use it in the future
    added: msg.added.toLocaleString("en-GB"),
  }));
  res.render("index", { links, messages: formattedMessages });
});

app.get("/new", (req, res) => {
  res.render("new", { links });
});
app.post("/new", (req, res) => {
  const { author, message } = req.body;
  messages.push({ id: messages.length + 1, text: message, user: author, added: new Date() });
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const { id } = req.params;
  const message = messages.find((msg) => msg.id === parseInt(id));
  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("messages", { links, message });
});

// Start the server
// MUST use env variable for PORT when deploying to Railway, otherwise it will not work
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Listening on port ${PORT}!`);
});
