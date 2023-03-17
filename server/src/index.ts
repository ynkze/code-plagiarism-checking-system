import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { config } from 'dotenv';
config();

import QuestionModel from './models/question';
import SubmissionModel from './models/submission';

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

mongoose.connect(process.env.MONGO_URL ?? '')
.then(() => {
    app.listen(PORT);
});

// endpoints to interact with questions
app.get('/questions', async (req: Request, res: Response) => {
    const questions = await QuestionModel.find({week: req.query.week}).sort({week: 'asc'}).exec()
    res.json(questions)
});

app.post('/add_question', async (req: Request, res: Response) => {
    const newQuestion = new QuestionModel({
        number: req.body.numer,
        title: req.body.title,
        question: req.body.question,
        sample: req.body.sample,
        week: req.body.week,
        test_case: req.body.test_case,
        expected_output: req.body.expected_output
    });
    await newQuestion.save();
    res.json(newQuestion)
});

// endpoints to interact with submissions
