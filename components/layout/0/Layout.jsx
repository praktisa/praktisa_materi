
import React from 'react'
import Navigator from '../../views/Navigator/v1/Navigator'

import L from './Layout.module.css'

export default function Layout({ children }) {

    return (
        <>
            <div className={L['layout']} >
                <div className={L['navbar']} >
                    <Navigator />
                </div>

                <div className={L['content']} >
                    {children}
                </div>
            </div>
        </>
    )
}
