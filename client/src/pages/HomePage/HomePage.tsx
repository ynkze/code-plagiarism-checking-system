import React, { useState } from 'react'
import './HomePage.css'
import { Buffer } from 'buffer'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-monokai'
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "../../components/SplitPane/SplitPane"
import CodeContext from '../../components/SplitPane/CodeContext'

const quotes = [{}]
const defaultCode: string = "#include \<stdio.h\> \n\nint main() \{ \n\tprintf(\"this is boilerplate of c \")\; \n\treturn 0\; \n\}"

function HomePage() {
  const [currQuote, setCurrQuote] = useState(1)
  const [code, setCode] = useState(defaultCode)

  async function handleRunCode(e:React.FormEvent) {
    e.preventDefault();
    try {
      // get token from judge0
      const tokenSubmit =  await fetch('http://localhost:2358/submissions/?base64_encoded=true', {
        method: 'POST',
        body: JSON.stringify({
          source_code: Buffer.from(code).toString('base64'),
          language_id: 50
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setCode(defaultCode)
       
      // save code to mongodb

      // process the token?
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  }

  async function handleRunTest(e:React.FormEvent) {
    
  }

  return (
    <div className="main">
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
            <div className='rightPane'>
              <form id='codeEditor'>
                <AceEditor
                  mode='c_cpp'
                  theme='monokai'
                  fontSize={20}
                  defaultValue={defaultCode}
                  width='72vw'
                  height='85vh'
                  onChange={(code: string) => {
                    setCode(code);
                  }}
                />
              </form>
            </div>
          </SplitPaneRight>
        </SplitPane>
      </CodeContext.Provider>
    </div>
  )
}


{/* <div className='rightPaneBottom'>
<input form='codeEditor' className='runCodeButton' type='submit' value='Run' onClick={handleRunCode}/>
</div> */}

export default HomePage