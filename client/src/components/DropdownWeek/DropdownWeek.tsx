import './DropdownWeek.css'
import { FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';

export default function DropdownWeek({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false)
    const options = ['Week 1', 'Week 2', 'Week 3']

    return (
        <div className='dropdown'>
            <div className='dropdown-btn' onClick={() =>
                setIsActive(!isActive)}>
                {selected}
                <FaCaretDown />
            </div>
            {isActive && (
                <div className='dropdown-content'>
                    {options.map((option) => (
                        <div onClick={()=> {
                            setSelected(option)
                            setIsActive(false)}}
                            className='dropdown-item'>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}