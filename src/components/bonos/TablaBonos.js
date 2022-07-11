import React, { useRef, useState } from "react";
import { Row } from "./RowBonos";

export const TablaBonos = ({data, autorizarBono, autorizarBonos}) => {

    const [checkStates, setCheckStates] = useState(data.map(bono => ({
        id: bono.id,
        asignar: false
    })))

    const [action, setAction] = useState('Check')


    function asignarBonos(){
        var bonos;
        if(action == 'Check'){
            bonos = checkStates.map(bono => ({
                id: bono.id,
                asignar: true
            }));
            setAction('UnCheck')
        }
        else{
            bonos = checkStates.map(bono => ({
                id: bono.id,
                asignar: false
            }));
            setAction('Check')
        }
        console.log(bonos)
        setCheckStates(bonos)
    }

    function asignarBono(id) {
        console.log(id)
    }

    return (
      <div>
        <table className="table table-striped table-bordered table-hover text-center">
          <thead>
            <tr>
              <th scope="row">Nombre</th>
              <th scope="row">Puesto</th>
              <th scope="row">Monto</th>
              <th scope="row">
                Autorizacion{" "}
                <button onClick={() => {asignarBonos()}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-all"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="3">Sin datos</td>
              </tr>
            ) : (
              data.map((el,index) => <Row key={el.id} el={el} handleCheckBoxChange={asignarBono} bono={checkStates[index]}/>)
            )}
          </tbody>
        </table>
      </div>
    );
}
