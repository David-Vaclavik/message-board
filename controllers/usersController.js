const db = require("../db/queries");

exports.usersListGet = async (req, res) => {
  const messages = await db.getAllMessages();
  // console.log(messages);
  res.render("index", { messages });
};

exports.usersNewGet = (req, res) => {
  res.render("new");
};

exports.usersNewPost = async (req, res) => {
  const { author, message } = req.body;
  await db.insertMessage({ author, message });
  res.redirect("/");
};

exports.usersMessageGet = async (req, res) => {
  const { id } = req.params;
  const message = await db.getMessageById(id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("messages", { message });
};
