import React, { useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-monokai'
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "./components/SplitPane/SplitPane";
import CodeContext from './components/SplitPane/CodeContext';
import Nav from './components/NavBar/Nav';
import './App.css'


const quotes = [{}]
const codeEditorDefault: string = "#include \<stdio.h\> \n\nint main() \{ \n\tprintf(\"this is boilerplate of c \")\; \n\treturn 0\; \n\}"

function App() {
  const [currQuote, setCurrQuote] = useState(1);
  const [code, setCode] = useState(codeEditorDefault)

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
      <CodeContext.Provider value={{ quotes, currQuote, setCurrQuote }}>
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>
            <SplitPane className="split-pane-col">
              <SplitPaneTop />
              <Divider className="separator-row" />
              <SplitPaneBottom />
            </SplitPane>
          </SplitPaneLeft>
          <Divider className="separator-col" />

          <SplitPaneRight>
            <div>
              <form id='rightPane'>
                <AceEditor
                  className='aceEditor'
                  mode='c_cpp'
                  theme='monokai'
                  fontSize={20}
                  defaultValue={codeEditorDefault}
                  width='100vw'
                  height='85vh'
                />
              </form>
            </div>

            <div className='rightPaneBottom'>
              <input form='rightPane' className='runCodeButton' type='submit' value='Run' onClick={handleRunCode}/>
            </div>
          </SplitPaneRight>
        </SplitPane>
      </CodeContext.Provider>
    </div>
  )
}

export default App
