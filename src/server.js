const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    res.json({
        message: 'API Book Club',
        time: new Date().toString(),
    });
});