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

mongoose.connect(process.env.MONGO_URL ?? '')
.then(() => {
    app.listen(PORT);
});

// login endpoint
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        return res.json({message: 'Success', token:jwtToken})
    } else {
        return res.status(400).json({message: "Email or password does not match"})
    }
})

// user management endpoint
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

// questions endpoint
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

// submissions endpoint
app.post('/submit', async (req: Request, res: Response) => {
    const newSubmission = new SubmissionModel({
        title: req.body.title,
        week: req.body.week,
        number: req.body.number,
        score: req.body.score,
        name: req.body.name,
        code: req.body.code,
    });
    await newSubmission.save();
    res.json(newSubmission)
});

// plagiarism algo endpoint
const {distance} = require('fastest-levenshtein')


const MossClient = require('./moss')
const mossId = process.env.MOSS_ID ? process.env.MOSS_ID : '290701924'
var fs  = require("fs");
const tmp = require('tmp')

app.get('/run_algo', async (req: Request, res: Response) => {
    // depending on week query submission
    const submissions: any = await SubmissionModel.find({week: req.query.week}).exec()

    // depending on method run diff algo
    switch (Number(req.query.method)){
        case 0: // Levenschtein
            var codeMatch: Array<number> = []
            for (var i=0; i<submissions.length; i++){
                var minDist = 999
                var current = 999
                for (var j=0; j < submissions.length; j++) {    
                    if (i != j){
                        current = distance(submissions[i].code, submissions[j].code)
                        minDist = Math.min(minDist, current)
                    }        
                }
                codeMatch.push(minDist)
            }
            
            // calculate similarity score 
            var temp: String[] = []
            submissions.map((sub: any, index: number) => {
                var score = ((sub.code.length-codeMatch[index])/(sub.code.length)).toFixed(2)
                temp.push("User: " + sub.name + ", Similarity: " + score + ", Week " + sub.week + " Question " + sub.number) 
            })
            res.json(temp)
            break

        case 1: // MOSS
            try {
                const client = new MossClient("c", mossId)
                client.setComment('Week ' + req.query.week)
                // create a tmp dir stopring file for each submission and add to MOSS script
                const tmpobj = tmp.dirSync();
                submissions.map(async(submission: any) => {
                    await tmp.file({tmpdir: tmpobj.name, keep: true, prefix: "code", postfix: ".c"}, 
                        function _tempFileCreated(err: any, path: any, fd: any, cleanUpCallback: any) {
                        if (err) throw err;
            
                        fs.appendFile(path, submission.code, function (err: any) {
                            if (err) throw err
                            }
                        );
                        client.addFile(path, submission.name)
                    })
                })

                // get the url to view result and cleanup
                var url = await client.process()
                url = url.slice(0, -2)
                res.json(url)

            } catch (e: any) {
                console.log("Error with MOSS submission: ", e.message)
            }
            break
        
        default:
            console.log("defaulted")
    }
})