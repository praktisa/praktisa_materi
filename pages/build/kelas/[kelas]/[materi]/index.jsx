import React from 'react'
import Assigner from '../../../../../components/views/Assigner/v1/Assigner'
import PopForm from '../../../../../components/views/Popup/form/v1/PopForm'

export default function Index({ CURRENT, kelas, materi, LIST_ASSIGN }) {
    const KELAS = JSON.parse(CURRENT)
    const MATERI_NOTASSIGN = JSON.parse(LIST_ASSIGN)


    const API = `/api/kelas/${kelas}/${materi}`
    const API2 = `/api/kelas/${kelas}/${materi}`
    const BasePath = `/build/kelas/${kelas}/${materi}`


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

// import TB_KELASLIST from '../../../../../database/schema/kelas/tb_kelas'
import TB_MATERILIST from '../../../../../database/schema/kelas/tb_materi'
import TB_SUBMATERILIST from '../../../../../database/schema/kelas/tb_submateri'
export async function getServerSideProps(context) {

    const { kelas, materi } = context.query

    const DataKelas = await TB_MATERILIST.FindBySLUG(materi, "DISPLAY ASSIGN SLUG")

    const DataMateri = await TB_SUBMATERILIST.Read()

    console.log("DataKelas", DataKelas)
    console.log("DataMateri", DataMateri)

    // delete Data.__v

    return {
        props: {
            CURRENT: JSON.stringify(DataKelas[0]),
            kelas,
            materi,
            LIST_ASSIGN: JSON.stringify(DataMateri)
        }
    }
}