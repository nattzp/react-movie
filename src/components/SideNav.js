import React, { } from 'react' //useState i brackets
import { } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { SideNavData } from './SideNavData';
import './SideNav.css';

function SideNav() {
    return (
        <>
            <nav className='nav-menu'>
                <p id='sidebar-title'>Movies</p>

                <ul className='nav-menu-items'>
                    {SideNavData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <NavLink to={item.path} >
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
