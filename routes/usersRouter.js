const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);

usersRouter.get("/new", usersController.usersNewGet);
usersRouter.post("/new", usersController.usersNewPost);

usersRouter.get("/message/:id", usersController.usersMessageGet);

module.exports = usersRouter;
