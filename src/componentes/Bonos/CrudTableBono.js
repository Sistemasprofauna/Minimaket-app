import React from "react";
import CrudRowBono from "./CrudRowBono";

function seleccionarTodo() {
    for (let i=0; i < document.f1.elements.length; i++) {
        if(document.f1.elements[i].type === "checkbox") {
            document.f1.elements[i].checked = true;
        }
    }
}

const TablaBono = ({data}) => {
    
    return(
        <div >
            
            <table  className="table table-striped table-bordered table-hover text-center"  >
                 <thead>
                     <tr>
                         <th scope="row">Nombre</th>
                         <th scope="row">Puesto</th>
                         <th scope="row">Monto</th>
                         <th scope="row">Autorizacion <button ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
</svg></button></th>
                     </tr>
                 </thead>
                 <tbody >
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