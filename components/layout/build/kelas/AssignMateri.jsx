import React from 'react';
import AM from './AssignMateri.module.css';

export default function AssignMateri({ children }) {
    return (
        <>
            <div className={AM['layout']} >
                {children}
            </div>
        </>

    )
}
