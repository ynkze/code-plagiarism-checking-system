import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background: rgb(0, 0, 38);
  height: 85px;
  display: flex;
  justify-content: right;
  padding: 0px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;
  
export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
  }
`;