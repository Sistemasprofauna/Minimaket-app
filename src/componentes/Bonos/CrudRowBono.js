import React from "react";


const CrudRowBono = ({el}) =>{
    let{nombre,puesto}=el
    return(
        
        <tr>
            <td>{nombre}</td>
            <td>{puesto}</td>
            
        </tr>
    )
}

export default CrudRowBono;