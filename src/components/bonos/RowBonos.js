import React, { useState } from "react";

export const Row = ({el, handleCheckBoxChange, bono}) =>{

    let{nombre,puesto,monto} = el

    // const [checked, setChecked] = useState(el.asignar)

    return(
        <tr>
            <td className="text-center">{nombre}</td>
            <td className="text-center">{puesto}</td>
            <td className="text-center">{monto}</td>
            <td className="text-center">
            {bono.id}
                <input type="checkbox" id="check" checked={bono.asignar} onChange={() => {
                    handleCheckBoxChange(el.id)
                }}/>
            </td>
        </tr>
    )
}
