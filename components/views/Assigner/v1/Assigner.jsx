import React, { useState, useEffect } from 'react'
import Card from '../../../basic/indicator/card/v1/Card'
import useArray from '../../../hook/useArray'
import PopForm from '../../Popup/form/v1/PopForm'
import A from './Assigner.module.css'
import axios from 'axios';
import Link from 'next/link'


export default function Assigner({ target, assign, APItarget, APIassign, BasePath }) {
    // array
    const { array, push, update, remove, filter } = useArray(target.ASSIGN)


    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (load === true) {
            axios.post(APItarget,
                {
                    _method: "assign",
                    _id: target._id,
                    ASSIGN: array,
                }
            ).then(

                setLoad(false)
            )
                .catch(error => { console.log("ERROR ASSIGN", error) })

        }
    }, [load])





    console.log("array", array)

    return (
        <>
            <div className={A['layout']} >

                <div className={A['target']} >
                    <h3>{target.DISPLAY}</h3>
                    <div onClick={() => setLoad(true)} >SIMPAN</div>

                    {
                        array.map((get, i) =>
                            <div key={"target" + get.SLUG} >

                                <div onClick={() => { filter(n => n.SLUG !== get.SLUG) }} > Hapus </div>
                                <Card display={get.DISPLAY}    >

                                </Card>
                            </div>
                        )
                    }

                </div>

                <div className={A['assigner']} >
                    <h3>ASSIGNER</h3>
                    <label htmlFor={"add" + assign[0].DISPLAY} >TAMBAH</label>
                    {/* <input type={"text"} defaultValue={""} onBlur={(e) => setSearch(n => n.filter(x => x.DISPLAY === e.target.value))} /> */}
                    {
                        assign.map((sign, i) =>
                            <div key={sign.SLUG}>
                                <div onClick={() => { array.some(e => e.SLUG === sign.SLUG) ? null : push(sign) }} > Tambah </div>

                                <Card
                                    display={sign.DISPLAY}
                                    mark={array.some(e => e.SLUG === sign.SLUG) ? true : false}
                                    assign={sign.ASSIGN ? sign.ASSIGN.length : sign.SECTION.length}
                                >

                                    <Link href={`${BasePath}/${sign.SLUG}`} >Detail</Link>
                                    <div>
                                        <PopForm type={"edit"} data={sign} API={APIassign} />
                                    </div>

                                    <PopForm type={"delete"} data={sign} API={APIassign} />

                                </Card>
                            </div>

                        )
                    }

                </div>

            </div>
        </>
    )
}
