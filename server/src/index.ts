import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { config } from 'dotenv';
config();

import CodeModel from './models/source_codes';

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/', (req: Request, res: Response) => {
    res.send("world")
});

app.post('/codes', async (req: Request, res: Response) => {
    const newCode = new CodeModel({
        title: req.body.title,
        author: req.body.author,
        code: req.body.code
    });
    await newCode.save();
    res.json(newCode)
});

mongoose.connect(process.env.MONGO_URL ?? '')
.then(() => {
    app.listen(PORT);
});
