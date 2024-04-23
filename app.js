const express = require('express');
// Слушаем порт 3000
const PORT = 3000;

const app = express();

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
