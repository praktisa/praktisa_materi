
import React from 'react'
import nav from './navbar.module.css'





export default function Navbar({ children, user }) {

    return (
        <>
            <div className={nav['layout']} >
                <div className={nav['logo']} >Logo</div>
                <div className={nav['menu']} >
                    {children}
                    <div className={nav['user__mobile']} >
                        {user}
                    </div>
                </div>
                <div className={nav['user']} >{user}</div>
            </div>

        </>
    )
}
