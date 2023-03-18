import React, { useState } from 'react'
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

function HomePage(props: any) {
  const [code, setCode] = useState(defaultCode)
  const [showRunModal, setShowRunModal] = React.useState(false)
  const [showSubmitModal, setShowSubmitModal] = React.useState(false)

  var score = 0
  async function handleRunTest(e:React.FormEvent) {
    e.preventDefault();
    try {
      // get test cases and compile the request to send
      const bodyToSend: any = []
      props.question.test_case.map((testCase: any, index: any) => {
        console.log((props.question.expected_output[index]))
        const current = {
          source_code: Buffer.from(code).toString('base64'),
          language_id: 50,
          stdin: Buffer.from(testCase).toString('base64'),
          expected_output: Buffer.from(props.question.expected_output[index].toString()).toString('base64'),
        }

        bodyToSend.push(current)
      })

      // get batch token from judge0
      const batchTokenRes = await fetch('http://localhost:2358/submissions/batch?base64_encoded=true', {
        method: 'POST',
        body: JSON.stringify({
          submissions: bodyToSend
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((tokens) => {
        return tokens.json()
      })

      // send token to process score
      var batchToken: Array<String> = []
      batchTokenRes.map((token: any) => {
        batchToken.push(token.token)
      })

      score = 0
      setTimeout(async() => {
        const batchRes = await fetch(`http://localhost:2358/submissions/batch?tokens=${batchToken.join(',')}&base64_encoded=true`)
        .then((res) => {
          return res.json()
        })
        batchRes.submissions.map((res: any) => {
          if (res.status.description=='Accepted'){
            score += 1
          }
        })
      }, 2000)

      setCode(defaultCode)
      setShowRunModal(true)
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  }

  async function handleSubmitCode(e:React.FormEvent) {
    e.preventDefault();
    if (score == 0) handleRunTest
    try {
      await fetch('http://localhost:5000/submit', {
      method: 'POST',
      body: JSON.stringify({
        title: props.question.title,
        week: props.question.week,
        number: props.question.number,
        score: score, 
        name: props.user,
        code: code,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.json())
    })
  } catch (error) {
    console.error(`ERROR: ${error}`)
    }
  }

  return (
    <>
    {/* <Modal
      onClose={() => setShowRunModal(false)}
      open={showRunModal}
      center={true}
      animationDuration={300}
    >
      hello
    </Modal> */}
    <div className="main">
      <SplitPane className="split-pane-row">
        <SplitPaneLeft>
          <SplitPane className="split-pane-col">
            <SplitPaneTop question={props.question} setQuestion={props.setQuestion} questionsList={props.questionsList} />
            <Divider className="separator-row" />
            <SplitPaneBottom question={props.question} handleRunTest={handleRunTest} handleSubmitCode={handleSubmitCode} />

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