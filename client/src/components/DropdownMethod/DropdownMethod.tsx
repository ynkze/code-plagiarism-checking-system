import './DropdownMethod.css'
import { FaCaretDown } from 'react-icons/fa'
import { useState } from 'react'

export default function DropdownMethod({handleChangeMethod}) {
    const [isActive, setIsActive] = useState(false)
    const [selected, setSelected] = useState('Choose method')
    const options = [
        'Levenschtein Distance',
        'MOSS'
    ]

    return (
        <div className='dropdown-method'>
            <div className='dropdown-btn' onClick={() =>
                setIsActive(!isActive)}>
                {selected}
                <FaCaretDown />
            </div>
            {isActive &&  (<div className='dropdown-content'>
                {options.map((option, index) => (
                    <div onClick={() => {
                        handleChangeMethod(index)
                        setSelected(option)
                        setIsActive(false)
                    }}
                        className='dropdown-item'>
                        {option}
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}