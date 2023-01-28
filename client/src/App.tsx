import React, { useState } from 'react'
import AceEditor from 'react-ace'
import './App.css'

function App() {

  const [code, setCode] = useState('')

  async function handleRunCode(e:React.FormEvent) {
    e.preventDefault();
    await fetch('', {
      method: 'POST',
      body: JSON.stringify({
        code
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setCode('')
  }

  return (
    <div className="App">
      <form>
        <AceEditor
          name='editor' 
          mode='csharp'
          theme='terminal'
          fontSize={20}
          defaultValue='hello world'
        />

        <input type='submit' value='Run' onClick={handleRunCode} />
      </form>
    </div>
  )
}

export default App
