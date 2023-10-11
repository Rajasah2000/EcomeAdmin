import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Main() {
    return (
        <>
            <div className='app-container app-theme-white fixed-header fixed-sidebar fixed-footer'>
                <Header />
                <div className='app-main d-flex'>
                    {/* <Sidebar /> */}
                    <div className='app-main__outer'>
                        <div className='app-main__inner'>
                            <Outlet />
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>

        </>
    )
}
