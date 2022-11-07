import Link from 'next/link'
import React, { useState } from 'react'
import AutoForm from '../../../components/basic/form/crud/AutoForm'
import Modal from '../../../components/basic/modal/normal/v1/Modal'
import PopForm from '../../../components/views/Popup/form/v1/PopForm'


export default function Index({ Data }) {

    const KELAS = JSON.parse(Data)
    const API = "/api/kelas"
    console.log("KELAS", KELAS)

    return (
        <>


            <PopForm type={"add"} data={KELAS[0]} API={API} />

            <br />
            <br />
            <br />


            {
                KELAS.map((kelas, i) =>
                    <div key={i}>
                        <div>
                            {kelas.DISPLAY}
                            <Link href={`kelas/${kelas.SLUG}`}><div>Detail</div></Link>
                            <div><PopForm type={"edit"} data={kelas} API={API} /></div>
                            <div><PopForm type={"delete"} data={kelas} API={API} /></div>
                        </div>
                        <br />
                    </div>
                )
            }
        </>
    )
}

import TB_KELASLIST from './../../../database/schema/kelas/tb_kelas'
export async function getServerSideProps(context) {

    const Data = await TB_KELASLIST.Read()

    // console.log("Data Data Data", Data)

    delete Data.__v

    return {
        props: {
            Data: JSON.stringify(Data)
        }
    }
}