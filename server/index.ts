import cors from 'cors';
import express from 'express';
import UsaepayController from './controllers/usaepay';

require('dotenv').config({
    path: '../.envrc',
});

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/usaepay', UsaepayController);

app.get('/is_online', (req, res) => {
    return res.status(200).send({
        data: true,
        message: 'Server is online',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
