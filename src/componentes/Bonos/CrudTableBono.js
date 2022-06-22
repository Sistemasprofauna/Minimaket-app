import React from "react";
import CrudRowBono from "./CrudRowBono";

const TablaBono = ({data}) => {
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
                    data.map(el=><CrudRowBono key={el.id}el={el} />)
                    )}
                 </tbody>
             </table>
        </div>
    )
}

export default TablaBono