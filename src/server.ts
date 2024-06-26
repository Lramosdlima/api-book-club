import 'reflect-metadata';

import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors({
    // origin: process.env.FRONTEND_URL
    origin: '*'
}));

app.use(router);

app.get('/', (req, res) => {
    res.json({
        message: 'API Book Club',
        time: new Date().toString(),
    });
});