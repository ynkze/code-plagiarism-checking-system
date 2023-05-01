import { useState } from 'react'
import { Button } from 'baseui/button'
import { Modal } from 'antd'
import DropdownWeek from '../../components/DropdownWeek/DropdownWeek'
import './CheckScore.css'
import DropdownMethod from '../../components/DropdownMethod/DropdownMethod'

function CheckScore() {
    const [week, setWeek] = useState(1)
    const [method, setMethod] = useState(0)
    const [showLevenModal, setShowLevenModal] = useState(false)
    const [showMossModal, setShowMossModal] = useState(false)
    const [levenResult, setShowLevenResult] = useState([])
    const [mossURL, setMossURL] = useState('')

    function handleChangeWeek(weekNum: String) {
        setWeek(Number(weekNum))
    }

    function handleChangeMethod(methodNum: number) {
        setMethod(methodNum)
    }

    async function handleRunAlgo(week: number, method: number) {
        try {
            // send request to run algo
            await fetch('http://localhost:5000/run_algo?week=' + 
                week.toString() + '&method=' + method.toString(), {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
            }).then((res) => {return res.json()}).then((json) => {
                if (method==0){
                    setShowLevenResult(json)
                    setShowLevenModal(true)
                } else {
                    setMossURL(JSON.stringify(json))
                    setShowMossModal(true)
                }
            })
          } catch (error) {
            console.error(`ERROR: ${error}`)
          }
    }

    return (
    <>
        <Modal
        title={'Levenschtein Distance'}
        open={showLevenModal}
        onCancel={() => {
            setShowLevenModal(false)
        }}
        >
        {levenResult.map((item, index) => {
        if (index === 0) {
            return <>{item}</>
        }
        return <><br/>{item}</>
        })}
        </Modal>

        <Modal
        title={'MOSS Result'}
        open={showMossModal}
        onCancel={() => {
            setShowMossModal(false)
        }}
        >
        URL: {mossURL}
        </Modal>

        <div className="scoreMain">
            <div>
                <br />
                <h2>Select week:</h2>
                <DropdownWeek handleChangeWeek={handleChangeWeek}></DropdownWeek>
            </div>
            <div>
                <h2>Select method:</h2>
                    <DropdownMethod handleChangeMethod={handleChangeMethod}></DropdownMethod>
            </div>
            <br />
            <div>
                <Button kind='secondary' onClick={() => {handleRunAlgo(week, method)}}>Run</Button>
            </div>
        </div>
    </>
    )
}

export default CheckScore