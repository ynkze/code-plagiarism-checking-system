import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  NavLink
} from './NavbarElements'
import DropdownWeek from '../DropdownWeek/DropdownWeek'
import ntuLogo from '../../assets/ntu-logo.png'

function Navbar({handleChangeWeek}) {
    const signOut = useSignOut();
    const navigate = useNavigate();
  
    const logout = () => {
      signOut();
      navigate("/login");
    };

    return (
    <>
        <DropdownWeek handleChangeWeek={handleChangeWeek}/>
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
                <NavLink to='/login' onClick={logout}>
                    Logout
                </NavLink>
            </div>
        </Nav>
    </>
    );
};
  
export default Navbar;