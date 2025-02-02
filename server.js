// server.js
const express = require('express');
const path = require('path');

const app = express();

// Middleware для логирования запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware для обработки JSON-запросов
app.use(express.json());

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Основной маршрут
app.get('/', (req, res) => {
    res.send('Hello, World! Updated and deployed with Heroku');
});

// Новый API маршрут
app.get('/api/status', (req, res) => {
    res.json({ status: 'Running', timestamp: new Date().toISOString() });
});

// Новый API маршрут для обработки POST-запросов
app.post('/api/echo', (req, res) => {
    res.json({ receivedData: req.body });
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
