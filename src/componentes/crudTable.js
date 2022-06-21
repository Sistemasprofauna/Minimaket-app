import React from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable =({data,setDataToEdit,deleteData}) =>{
    return(
         <div>
             <h5>Colaboradores</h5>
             <table class="table table-striped table-bordered table-hover" >
                 <thead>
                     <tr>
                         <th scope="row">Nombre</th>
                         <th scope="row">Puesto</th>
                         <th scope="row">Acciones</th>
                     </tr>
                 </thead>
                 <tbody>
                 {data.length===0?(
                     <tr>
                        <td colSpan="3">Sin datos</td>
                    </tr>
                    ):(
                    data.map(el=><CrudTableRow key={el.id}el={el} setDataToEdit={setDataToEdit} deleteData={deleteData} />)
                    )}

                 </tbody>
             </table>
         </div>
    )
}

export default CrudTable;