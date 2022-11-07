import React from 'react'
import Layout from '../../../components/layout/0/Layout'

Index.Layout = Layout;

export default function Index({ kelas, Data }) {

    const MATERI = JSON.parse(Data)

    console.log("Materi", MATERI)
    return (
        <>
            <h1>{MATERI.DISPLAY}</h1>
            <ul>
                {
                    MATERI['ASSIGN_MATERI'].map((materi, i) =>
                        <li key={i}>{materi.SLUG}</li>
                    )
                }

            </ul>

        </>
    )
}



import TB_KELASLIST from '../../../database/schema/kelas/tb_kelas'

export async function getStaticPaths() {

    const Data = await TB_KELASLIST.Read('ID_KELAS')

    let paths = []

    for (var i = 0; i < Data.length; i++) {
        paths.push({
            params:
            {
                kelas: `${Data[i].ID_KELAS}`
            }
        })
    }

    return {
        paths,
        fallback: false,
    };
}

import TB_MATERILIST from '../../../database/schema/kelas/tb_materi'

export async function getStaticProps(context) {

    const { kelas } = context.params

    const Data_kelas = await TB_KELASLIST.FindByIdKelas(kelas, "DISPLAY DESKRIPSI ASSIGN_MATERI")

    console.log("Data_kelas", Data_kelas)

    return {
        props: {
            kelas,
            Data: JSON.stringify(Data_kelas[0])
        }
    }
}