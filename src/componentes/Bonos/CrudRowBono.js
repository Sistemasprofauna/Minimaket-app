import React from "react";


const CrudRowBono = ({el}) =>{
    let{nombre,puesto,monto}=el
    return(
        
        <tr>
            <td className="text-center">{nombre}</td>
            <td className="text-center">{puesto}</td>
            <td className="text-center">{monto}</td>
            <td className="text-center"><input type="checkbox" ></input></td>
            
        </tr>
    )
}

export default CrudRowBono;