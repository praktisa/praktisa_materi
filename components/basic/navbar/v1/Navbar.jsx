import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import nav from './navbar.module.css';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"


export default function Navbar() {



    //atur responsif disini
    return (
        <>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className={nav['shape']}

            >
                <div className={nav['shape__grid']}>

                    <div className={nav['grid__logo']}>
                        <Menu type={"logo"} />
                    </div>

                    {/* <SessionProvider> */}
                    <div className={nav['grid__menu']}>
                        <Menu type={"page"} to={"materi"} ><i className="fa fa-book" aria-hidden="true"></i></Menu>
                        <Menu type={"page"} to={"diskusi"} ><i className="fa fa-tachometer" aria-hidden="true"></i></Menu>
                        <Menu type={"page"} to={"tryout"} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Menu>

                        <div className={nav['Res__grid__user']}>
                            <Menu type={"user"} username={"Surya"} />
                        </div>

                    </div>

                    <div className={nav['grid__user']}>
                        <div className={nav['settings']} onClick={() => theme_dispatch({ type: "Jungle" })} ><i className="fa fa-cog" aria-hidden="true"></i></div>
                        <Menu type={"user"} username={"Surya"} />
                    </div>
                    {/* </SessionProvider> */}

                </div>
            </div>
        </>
    )
}
