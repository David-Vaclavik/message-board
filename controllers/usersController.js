const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// Validation rules
const validateMessage = [
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author name is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Author name must be between 1 and 50 characters.")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Author name can only contain letters, numbers, and spaces."),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 1, max: 500 })
    .withMessage("Message must be between 1 and 500 characters."),
];

exports.usersListGet = async (req, res) => {
  const messages = await db.getAllMessages();
  // console.log(messages);
  res.render("index", { messages });
};

exports.usersNewGet = (req, res) => {
  res.render("new", { errors: [] });
};

exports.usersNewPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        errors: errors.array(),
      });
    }

    const { author, message } = req.body;
    await db.insertMessage({ author, message });
    res.redirect("/");
  },
];

exports.usersMessageGet = async (req, res) => {
  const { id } = req.params;
  const message = await db.getMessageById(id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("messages", { message });
};
