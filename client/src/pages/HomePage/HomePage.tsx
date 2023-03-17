import React, { useState } from 'react'
import { Modal } from 'antd'
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
import './HomePage.css'

const defaultCode: string = "#include \<stdio.h\> \n\nint main() \{ \n\tprintf(\"this is boilerplate of c \")\; \n\treturn 0\; \n\}"

function HomePage(props) {
  const [code, setCode] = useState(defaultCode)
  const [showRunModal, setShowRunModal] = React.useState(false)
  const [showSubmitModal, setShowSubmitModal] = React.useState(false)

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
      setShowRunModal(true)
      // save code to mongodb

      // process the token?
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  }

  async function handleSubmitCode(e:React.FormEvent) {
    
  }

  return (
    <>
    <Modal
      open={showRunModal}
      title="Result Running Test Case"
      onCancel={()=>setShowRunModal(false)}
      onOk={() => setShowRunModal(false)}>
        
    </Modal>
    <Modal
      open={showSubmitModal}
      title="Are you sure you want to submit?"
      onCancel={()=>setShowSubmitModal(false)}
      onOk={() => setShowSubmitModal(false)}> 
    </Modal>

    <div className="main">
      <SplitPane className="split-pane-row">
        <SplitPaneLeft>
          <SplitPane className="split-pane-col">
            <SplitPaneTop question={props.question} setQuestion={props.setQuestion} questionsList={props.questionsList} />
            <Divider className="separator-row" />
            <SplitPaneBottom question={props.question} handleRunCode={handleRunCode} />

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
                height='86vh'
                onChange={(code: string) => {
                  setCode(code);
                }}
              />
            </form>
          </div>
        </SplitPaneRight>
      </SplitPane>
    </div>
    </>
    
  )
}

export default HomePage