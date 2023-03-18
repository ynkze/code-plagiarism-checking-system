import { Button } from 'baseui/button'
import './CheckScore.css'

function CheckScore() {
    return (
        <div className="main">
            <div>
                <h2>Select week:</h2>
            </div>
            <div>
                <h2>Select method:</h2>
            </div>
            <Button>Run</Button>
        </div>
    )
}

export default CheckScore