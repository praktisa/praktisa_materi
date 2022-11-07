import React from 'react'
import F from './AutoForm.module.css';


export default function AutoForm({ data, add = false, action, method }) {

    data && delete data.__v

    // console.log("data", Object.entries(data))

    function Form({ label, formvalue = "" }) {
        return (
            <div className={F['layout']}>
                <label htmlFor={label}>{label}</label>
                <input
                    id={label}
                    type={"text"}
                    defaultValue={formvalue}
                    name={label === "ASSIGN" ? label + "[]" : label}
                />
            </div>
        )
    }

    // masa depan ada dibawah sini
    // async function handleSubmit(event, datas) {
    //     event.preventDefault()

    //     console.log("event", event)
    //     console.log("target", event.target)
    //     console.log("datas", datas)
    // }

    return (
        <>
            <form
                action={action}
                method={"POST"}
            // onSubmit={(event) => handleSubmit(event, Object.entries(data))}
            >
                {
                    Object.entries(data).map((obj, i) => {

                        return (
                            <Form key={i} label={obj[0]} formvalue={add ? "" : obj[1]} />
                        )
                    })
                }

                <input type="hidden" name="_method" value={method} />


                <button type={"submit"} >{method}</button>
            </form>

        </>
    )
}
