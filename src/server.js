const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());
app.use(router);