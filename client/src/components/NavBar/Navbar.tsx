import { useState } from 'react'
import {
  Nav,
  NavLink
} from './NavbarElements'
import DropdownWeek from '../DropdownWeek/DropdownWeek'
import ntuLogo from '../../assets/ntu-logo.png'

function Navbar() {
    const [selected, setSelected] = useState('Choose week')

    return (
    <>
        <DropdownWeek selected={selected} setSelected={setSelected}/>
        <Nav>
            <div className='navLeft'>
                <img className='ntuLogo' src={ntuLogo} />
            </div>
            
            <div className='navRight'>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='/score'>
                    Check Score
                </NavLink>
                <NavLink to='/logout'>
                    Logout
                </NavLink>
            </div>
        </Nav>
    </>
    );
};
  
export default Navbar;