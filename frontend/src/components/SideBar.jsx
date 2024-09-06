import React, { useState } from 'react'
import { DashboardIcon, HistoryIcon, HomeIcon, SettingsIcon } from '../components/icons.jsx'
import { NavLink, useNavigate } from 'react-router-dom'

const SideBar = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const navigate = useNavigate();
    const sideBarLink = [
        {
            name: "dashboard",
            link: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            name: "home",
            link: "/home",
            icon: <HomeIcon />
        },
        {
            name: "history",
            link: "/history",
            icon: <HistoryIcon />
        },
        {
            name: "settings",
            link: "/settings",
            icon: <SettingsIcon />
        }
    ]

    const handleLogout =()=>{
        localStorage.clear();
        navigate("/signin");

    }
    return (
        <div className='flex  bg-slate-200'>
            <div className={`h-full  border-r rounded-3xl  bg-slate-50 w-64 px-4 py-4 dark:bg-gray-800 transition-transform duration-700 transform  ${openSideBar ? 'fixed z-40 top-0 left-0  translate-x-0' : 'lg:flex md:flex hidden'
                }`}>
                <div className="h-full w-full flex flex-col   items-center space-y-2 font-medium">
                    <div className='h-full flex w-full flex-col items-center gap-10'>

                        {
                            sideBarLink.map((sideLink) => {
                                return (
                                    <NavLink
                                        to={sideLink.link}
                                        key={sideLink.name}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'flex gap-4 w-full px-8 items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gradient-to-r from-[#ff6b6b] via-[#ff7b00] to-[#f4d005] dark:hover:bg-gray-700'
                                                : 'flex gap-4 w-full px-8 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gradient-to-r from-[#ff6b6b] via-[#ff7b00] to-[#f4d005] dark:hover:bg-gray-700'
                                        }
                                    >
                                        {sideLink.icon}
                                        <span className='flex-1 ms-3 whitespace-nowrap'>{sideLink.name}</span>
                                    </NavLink>
                                )
                            })
                        }
                    </div>


                    <a  onClick={handleLogout} className="flex gap-4 w-full px-8 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gradient-to-r from-[#ff6b6b] via-[#ff7b00] to-[#f4d005] dark:hover:bg-gray-700 group">
                        <i className="fa-solid fa-arrow-right-from-bracket text-gray-500 group-hover:text-gray-900"></i>
                        <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                    </a>
                </div>
            </div>
            <button data-drawer-target="default-sidebar" onClick={() => setOpenSideBar(!openSideBar)} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`${openSideBar ? 'absolute left-64' : 'flex'} h-10 p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>

                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
        </div>
    )
}

export default SideBar