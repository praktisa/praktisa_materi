import React, { useState } from 'react';
import M from './Modal.module.css';

export default function Modal({ type }) {

    const [show, setShow] = useState(false)

    function Toggler({ type = "", label = "no label" }) {
        return (
            <>
                <label htmlFor={type}>{label}</label>
                <input className={M['toggler']} type={'checkbox'} id={type} style={{ display: "none" }} />
            </>
        )
    }

    switch (type) {
        case "add":
            return (
                <>
                    <Toggler type={type} label="add" />

                    <div className={M['layout']} >
                        Modal {type}
                    </div>

                </>
            )


        case "edit":
            return (
                <>
                   

                    <Toggler type={type} label="edit" />
                    <div className={M['layout']} >
                        Modal {type}
                    </div>

                    
                </>
            )


        case "delete":

            return (
                <>
                    

                    <Toggler type={type} label="delete" />
                    <div className={M['layout']} >
                        Modal {type}
                    </div>

                    
                </>
            )

        default:
            break;
    }


}
