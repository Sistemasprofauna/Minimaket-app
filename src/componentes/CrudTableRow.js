import React from "react";


const CrudTableRow = ({el,setDataToEdit,deleteData}) =>{
    let{nombre,puesto,id}=el
    return(
        
        <tr>
            <td>{nombre}</td>
            <td>{puesto}</td>
            <td><button class="btn btn-warning" onClick={()=>setDataToEdit(el)} >Editar</button><span> </span>
            <button class="btn btn-danger" onClick={()=>deleteData(id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default CrudTableRow;