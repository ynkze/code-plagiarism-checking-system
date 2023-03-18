import './DropdownWeek.css'
import { FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';

export default function DropdownWeek({ handleChangeWeek }) {
    const [isActive, setIsActive] = useState(false)
    const [selected, setSelected] = useState('Choose week')
    const options = [
        'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 
        'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', ]

    return (
        <div className='dropdown-week'>
            <div className='dropdown-btn' onClick={() =>
                setIsActive(!isActive)
            }>
                {selected}
                <FaCaretDown />
            </div>
            {isActive && (
                <div className='dropdown-content'>
                    {options.map((option) => (
                        <div onClick={() => {
                            handleChangeWeek(option.slice(-1))
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