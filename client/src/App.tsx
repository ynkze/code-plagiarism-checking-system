import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import HomePage from './pages/HomePage/HomePage'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={HomePage} />
          {/* <Route path='/about' component={About} />
          <Route path='/events' component={Events} /> */}
        </Routes>
      </Router>
    </div>
  );
}
  
export default App;
