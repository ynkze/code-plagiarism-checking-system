import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

import { config } from 'dotenv';
config();

import QuestionModel from './models/question';
import SubmissionModel from './models/submission';
import UserModel from './models/users';

// server connection setup
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

mongoose.connect(process.env.MONGO_URL ?? '')
.then(() => {
    app.listen(PORT);
});

// login endpoint
app.post('/login', async (req: Request, res: Response) => { 
    const { userid, password } = req.body
    const user: any = await UserModel.findOne({userid: userid}).catch(
        (err) => {
            console.log("Error: ", err)
        }
    )
    
    if (user === null || userid !== user.userid){
        res.status(400).json({message: "Email or password does not match"})
        return
    }

    if (await bcrypt.compare(password, user.password)){
        const jwtToken = jwt.sign({userid: user.userid}, process.env.JWT_SECRET)
        console.log("hello1")
        return res.json({message: 'Success', token:jwtToken})
    } else {
        console.log("hello2")
        return res.status(400).json({message: "Email or password does not match"})
    }
})

// endpoints to add new user
app.post('/add_user', async (req: Request, res: Response) => {
    try {
        const hashPw = await bcrypt.hash(req.body.password, 10)
        const newUser = new UserModel({
        userid: req.body.userid,
        name: req.body.name,
        password: hashPw,
        })
        await newUser.save();
        res.json(newUser)
    } catch {
        res.sendStatus(500)
    }
});

// endpoints to interact with questions
app.get('/questions', async (req: Request, res: Response) => {
    const questions = await QuestionModel.find({week: req.query.week}).sort({week: 'asc'}).exec()
    res.json(questions)
});

app.post('/add_question', async (req: Request, res: Response) => {
    const newQuestion = new QuestionModel({
        number: req.body.number,
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
