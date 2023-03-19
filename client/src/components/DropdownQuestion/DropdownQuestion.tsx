import './DropdownQuestion.css'
import { FaCaretDown } from 'react-icons/fa'
import { useState } from 'react'
import { Question } from '../../App'

export default function DropdownQuestion(props) {
    const [isActive, setIsActive] = useState(false)
    const [selected, setSelected] = useState('Question 1')

    return (
        <div className='dropdown-question'>
            <div className='dropdown-btn' onClick={() =>
                setIsActive(!isActive)}>
                {selected}
                <FaCaretDown />
            </div>
            {isActive && props.questionsList && (
                <div className='dropdown-content'> 
                    {props.questionsList.map((question: Question) => (
                        <div onClick={() => {
                            setSelected("Question " + question.number)
                            setIsActive(false)
                            props.setQuestion(question)}}
                            className='dropdown-item'>
                            {"Question " + question.number}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}