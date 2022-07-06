import React from "react";
import CrudRowBono from "./CrudRowBono";


const TablaBono = ({data}) => {
    
    return(
        <div >
            
            <table class="table table-striped table-bordered table-hover text-center" >
                 <thead>
                     <tr>
                         <th scope="row">Nombre</th>
                         <th scope="row">Puesto</th>
                         <th scope="row">Monto</th>
                         <th scope="row">Autorizado</th>
                     </tr>
                 </thead>
                 <tbody>
                 {data.length===0?(
                     <tr>
                        <td colSpan="3">Sin datos</td>
                    </tr>
                    ):(
                    data.map(el=><CrudRowBono key={el.id}el={el}/>)
                    )}

                 </tbody>
             </table>
        
        </div>
   )
}

export default TablaBono