import React, { useState} from 'react' 
import { } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { SideNavData } from './SideNavData';
import { AiOutlineMenu } from "react-icons/ai";
import './SideNav.css';

function SideNav() {
    const [showNavData, setshowNavData] = useState(false)
    const navItemStyle = {
        visibility: showNavData && 'visible'
    }
    const navMenuStyle = {
        height: showNavData && '100%'
    }

    
    return (
        <>
            <nav style ={navMenuStyle} className='nav-menu'>
            <button onClick={() => setshowNavData(!showNavData)} className='nav-toggle'> <AiOutlineMenu/> </button>
                <p id='sidebar-title'>Movies</p>
                <ul style={navItemStyle} className='nav-menu-items'>
                    {SideNavData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <NavLink onClick={() => setshowNavData(false)} to={item.path} >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default SideNav
