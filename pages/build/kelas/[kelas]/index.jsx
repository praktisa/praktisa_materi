import React, { useState } from 'react'
import AssignMateri from '../../../../components/layout/build/kelas/AssignMateri'
import Assigner from '../../../../components/views/Assigner/v1/Assigner'
import PopForm from '../../../../components/views/Popup/form/v1/PopForm'

export default function Index({ CURRENT_KELAS, kelas, LIST_MATERI }) {

    const KELAS = JSON.parse(CURRENT_KELAS)
    const MATERI_NOTASSIGN = JSON.parse(LIST_MATERI)

    const API = `/api/kelas/${kelas}`
    const API2 = `/api/kelas/${kelas}`
    const BasePath = `/build/kelas/${kelas}`

    return (
        <>

            <PopForm type={"add"} data={MATERI_NOTASSIGN[0]} API={API} />



            <Assigner
                target={KELAS}
                APItarget={API}

                assign={MATERI_NOTASSIGN}
                APIassign={API2}

                BasePath={BasePath}
            />

        </>

    )
}

import TB_KELASLIST from '../../../../database/schema/kelas/tb_kelas'
import TB_MATERILIST from '../../../../database/schema/kelas/tb_materi'
export async function getServerSideProps(context) {

    const { kelas } = context.query

    const DataKelas = await TB_KELASLIST.FindBySLUG(kelas, "DISPLAY ASSIGN SLUG")

    const DataMateri = await TB_MATERILIST.Read()

    console.log("DataKelas", DataKelas)
    console.log("DataMateri", DataMateri)

    // delete Data.__v

    return {
        props: {
            CURRENT_KELAS: JSON.stringify(DataKelas[0]),
            kelas,
            LIST_MATERI: JSON.stringify(DataMateri)
        }
    }
}