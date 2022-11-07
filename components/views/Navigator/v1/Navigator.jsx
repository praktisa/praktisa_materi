import React from 'react'
import Link from 'next/link'
import Indicator from '../../../basic/indicator/path/v1/Indicator'
import Navbar from '../../../basic/navbar/v2/Navbar'

export default function Navigator() {
    return (
        <>
            <Navbar
                user={<div>U</div>}
            >
                <Link href={'/kelas'}>
                    <Indicator path={'/kelas'} >A</Indicator>
                </Link>
                <Link href={'/blog'}>
                    <Indicator path={'/blog'}>B</Indicator>
                </Link>

                <Link href={'/'}>
                    <Indicator path={'A'} > C</Indicator>
                </Link>
            </Navbar>


        </>
    )
}
