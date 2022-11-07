import React from 'react';
import AutoForm from '../../../../basic/form/crud/AutoForm';
import Toggle from '../../../../basic/toggle/v1/Toggle';


export default function PopForm({ type, data, API = "" }) {


    switch (type) {
        case "add":

            return (
                <>
                    <div style={{ position: "fixed", top: "-50px" }} >
                        <Toggle label={type} dataName={data.DISPLAY} >
                            <AutoForm data={data} add action={API} method={"post"} />
                        </Toggle>
                    </div>

                </>
            )
        case "edit":

            return (
                <>
                    <Toggle label={type} dataName={data.DISPLAY} >
                        <AutoForm data={data} action={API} method={"put"} />
                    </Toggle>
                </>
            )

        case "delete":

            return (
                <>
                    <Toggle label={type} dataName={data.DISPLAY} >
                        <AutoForm data={data} action={API} method={"delete"} />
                    </Toggle>
                </>
            )


        default:
            break;
    }

}


// export function PopFormChild({ type, data}){

//     return(
//         <>
//             <label htmlFor={"add" + MATERI_NOTASSIGN[0].DISPLAY} >TAMBAH</label>
//         </>
//     )
// }