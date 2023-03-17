import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import CheckScore from './pages/CheckScore/CheckScore'


export interface Question {
  number: Number,
  title: String,
  question: String,
  sample: String,
  test_case: Array<any>,
  expected_output: Array<any>
}

const BlankQuestion: Question = {
  number: 1,
  title: 'Choose week to display question',
  question: ' ',
  sample: 'sample',
  test_case: [],
  expected_output: []
}

function App() {
  const [week, setWeek] = useState(1)
  const [question, setQuestion] = useState(BlankQuestion)
  const [questionsList, setQuestionsList] = useState([BlankQuestion])

  async function handleChangeWeek(weekNum: String) {
    try {
      // get questions for the week
      const weekQuestions =  await fetch('http://localhost:5000/questions?week='+weekNum, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setWeek(Number(weekNum))

      // set question and dropdown
      weekQuestions.json().then((res :Array<Question>) => {
        setQuestion(res[0])
        setQuestionsList(res)
      })

    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  }

  return (
    <div className='App'>
      <Router>
        <Navbar handleChangeWeek={handleChangeWeek}/>
        <Routes>
          <Route path='/' element={<HomePage question={question} setQuestion={setQuestion} questionsList={questionsList} />} />
          <Route path='/score' element={<CheckScore />}/>
        </Routes>
      </Router>
    </div>
  );
}
  
export default App;
