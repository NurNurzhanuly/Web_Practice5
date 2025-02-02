// server.js
const express = require('express');
const app = express();

// Middleware для логирования запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Основной маршрут
app.get('/', (req, res) => {
    res.send('Hello, World! Updated and deployed with Heroku');
});

// Новый API маршрут
app.get('/api/status', (req, res) => {
    res.json({ status: 'Running', timestamp: new Date().toISOString() });
});

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
