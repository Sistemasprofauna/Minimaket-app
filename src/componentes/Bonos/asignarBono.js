import React,{useState} from "react";
import TablaBono from "./CrudTableBono";


const BDbonos =
    [
        {
            id: '1',
            nombre: 'Oscar Rojas',
            puesto: 'Gerente Operativo',
            monto: '200'
 
        },
        {
            id: '2',
            nombre: 'Alejandro Rojas',
            puesto: 'Director Gneral',
            monto: '200'
 
        },
        {
            id: '3',
            nombre: 'Arnoldo Rodriguez',
            puesto: 'Auxiliar de sistemas',
            monto: '200'
        },
        {
            id: '4',
            nombre: 'Daniel Quintanilla',
            puesto: 'Lider de almacen',
            monto: '200'
        },
        {
            id: '5',
            nombre: 'Alavaro Rendon',
            puesto: 'Lider de compras',
            monto: '200'
        }
    ]





const CrudBono = () => {

    const [db] = useState(BDbonos);

    return (
      <div>
        <h3 className="w-50 m-4">Colaboradores</h3>
        <TablaBono data={db} />
        <button
          type="submit"
          value="Enviar"
          className="btn btn-outline-success m-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-door-open"
            viewBox="0 0 16 16"
          >
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
          </svg>
          Cargar Bonos
        </button>
      </div>
    );
};

export default CrudBono;