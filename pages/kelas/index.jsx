import Link from 'next/link';
import React from 'react'
import Layout from '../../components/layout/0/Layout'

Index.Layout = Layout;

export default function Index({ Data }) {

    const KELAS = JSON.parse(Data)

    console.log("KELAS", KELAS)

    return (
        <>
            {
                KELAS.map((kelas, i) =>
                    <div key={kelas}>
                        <Link href={`/kelas/${kelas.ID_KELAS}`}>{kelas.DISPLAY}</Link>
                    </div>
                )
            }


        </>
    )
}

import TB_KELASLIST from '../../database/schema/kelas/tb_kelas'

export async function getStaticProps() {

    const Data = await TB_KELASLIST.Read('ID_KELAS DISPLAY')

    // const JSON_Data = 

    // if (!JSON_Data) {
    //     return {
    //         notFound: true,
    //     }
    // }

    return {
        props: {
            Data: JSON.stringify(Data)
        }
    }
}