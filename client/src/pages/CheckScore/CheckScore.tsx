import { useState } from 'react'
import { Button } from 'baseui/button'
import DropdownWeek from '../../components/DropdownWeek/DropdownWeek'
import './CheckScore.css'
import DropdownMethod from '../../components/DropdownMethod/DropdownMethod'

function CheckScore() {
    const [week, setWeek] = useState(1)
    const [method, setMethod] = useState(0)

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
            }).then((res) => {
                console.log(res.json())
            })
          } catch (error) {
            console.error(`ERROR: ${error}`)
          }
    }

    return (
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
    )
}

export default CheckScore