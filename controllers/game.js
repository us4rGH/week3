const { writeData } = require("../utils/data");

const sendAllGames = async (req, res) => {
    
    res.send(req.games);
};

const deleteGame = async (req, res) => {
    
    const gameId = Number(req.params.id);

    req.game = req.games.find((item) => item.id === gameId);

    const index = req.games.findIndex((item) => item.id === gameId);

    req.games.splice(index, 1);

    await writeData("./data/games.json", req.games);

    res.send({
        games: req.games,
        updated: req.game
    });
};

const addGame = async (req, res) => {
    
    req.isNew = !Boolean(req.games.find(item => item.title === req.body.title));
    if (req.isNew) {
        const inArray = req.games.map(item => Number(item.id));
        let maximalId;
        if (inArray.length > 0) {
          maximalId = Math.max(...inArray);
        } else {
          maximalId = 0;
        }
        req.updatedObject = {
          id: maximalId + 1,
          title: req.body.title,
          image: req.body.image,
          link: req.body.link,
          description: req.body.description
        };
        // Добавляем данные о новой игре в список с другими играми
        req.games = [...req.games, req.updatedObject];
    } else {
        res.status(400);
        res.send({ status: "error", message: "Игра с таким именем уже есть." });
        return
    }
    // Записываем обновлённый список игр в файл
    await writeData("./data/games.json", req.games);
    // В качестве ответа отправляем объект с двумя полями
    res.send({
        games: req.games, // Обновлённый список со всеми играми
        updated: req.updatedObject // Новая добавленная игра
    });
};

module.exports = {
    sendAllGames,
    deleteGame,
    addGame
}