import { useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import Navbar from './components/NavBar/Navbar'
import { Login } from './pages/Login/Login'
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
      <Navbar handleChangeWeek={handleChangeWeek}/>
      <Routes>
        <Route path='/' element={<RequireAuth loginPath='/login'>
          <HomePage question={question} setQuestion={setQuestion} questionsList={questionsList} />
        </RequireAuth>}/>
        <Route path='/score' element={<RequireAuth loginPath='/login'>
          <CheckScore />
        </RequireAuth>}/>
        <Route path='/login' element={<Login />}></Route>
        {/* <Route path='/logout' element={<Logout />}></Route> */}
      </Routes>
    </div>
  );
}
  
export default App;
