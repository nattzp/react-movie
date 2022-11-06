import React from 'react'
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";


export const SideNavData = [
    {
        title: "Home",
        path: '/',
        icon: <AiOutlineHome/>,
        className: 'nav-text'

    },
    {
        title: "Discover",
        path: '/discover',
        icon: <AiOutlineCompass/>,
        className: 'nav-text'

    },
]