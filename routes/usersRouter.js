const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);

usersRouter.get("/new", usersController.usersNewGet);
usersRouter.post("/new", usersController.usersNewPost);

usersRouter.get("/message/:id", usersController.usersMessageGet);

// // Define routes
// app.get("/message/:id", (req, res) => {
//   const { id } = req.params;
//   const message = messages.find((msg) => msg.id === parseInt(id));
//   if (!message) {
//     return res.status(404).send("Message not found");
//   }

//   res.render("messages", { message });
// });

module.exports = usersRouter;
