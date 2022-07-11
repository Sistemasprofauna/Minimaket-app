import React, { useState } from "react";




const CrudRowBono = ({el, handleCheckBoxChange, checked, setChecked}) =>{

    let{nombre,puesto,monto}= el

    return(
        
        <tr>
            <td className="text-center">{nombre}</td>
            <td className="text-center">{puesto}</td>
            <td className="text-center">{monto}</td>
            <td className="text-center">
                <input type="checkbox" id="check" checked={checked} onChange={() => {
                    setChecked(!checked)
                    handleCheckBoxChange(el.id)
                }}></input>
            </td>
        </tr>
    )
}

export default CrudRowBono;