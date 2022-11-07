import React from 'react';
import I from './Indicator.module.css';
import { useRouter } from 'next/router'

export default function Indicator({ children, path }) {

    const router = useRouter()
    const { asPath } = router

    // console.log("router", router)

    return (
        <>
            <div className={` ${I['container']}`}>
                <span
                    className={` ${asPath.includes(path) ? I['current'] : I['stable']}`}
                >
                    {children}
                </span>

            </div>
        </>
    )
}
