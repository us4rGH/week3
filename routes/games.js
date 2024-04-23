const { sendAllGames, deleteGame, addGame } = require("../controllers/game");

const gamesRouter = require("express").Router()
const {getAllGames} = require("../middlewares/games");

gamesRouter.get("/games", getAllGames, sendAllGames)
gamesRouter.delete("/games/:id", getAllGames, deleteGame);
gamesRouter.post("/games", getAllGames, addGame);

module.exports = gamesRouter;
