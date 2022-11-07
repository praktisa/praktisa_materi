import React from 'react'
import T from './Toggle.module.css'

export default function Toggle({ label = "no label", dataName = "", children }) {

    const ID = label + dataName

    return (
        <>
            <label htmlFor={ID}>{label}</label>
            <input
                className={T['toggler']} type={'checkbox'} id={ID} style={{ display: "none" }}
                name={"Toggle"}
            />

            <label htmlFor={ID} className={T['target']} >
                <div className={T['target__style']} >
                    {children}
                </div>
            </label>

        </>
    )
}
