import React from 'react'
import C from './Card.module.css'

export default function Card({ children, display, mark = false, assign }) {
    return (
        <div className={`${C['layout']} ${mark && C['layout_mark']}`} >

            <div className={`${C['info']} ${mark && C['info_mark']}`} >
                {display}
                <span> {assign}</span>
            </div>

            <div className={C['action']} >
                {children}
            </div>

        </div>
    )
}
