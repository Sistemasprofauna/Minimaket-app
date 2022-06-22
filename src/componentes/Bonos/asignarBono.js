import React from "react";
import TablaBono from "./CrudTableBono";

const BDinicial =
    [
        {
            id: '1',
            nombre: 'Oscar Rojas',
            puesto: 'Gerente Operativo'

        },
        {
            id: '2',
            nombre: 'Alejandro Rojas',
            puesto: 'Director Gneral'

        },
        {
            id: '3',
            nombre: 'Arnoldo Rodriguez',
            puesto: 'Auxiliar de sistemas'
        },
        {
            id: '4',
            nombre: 'Daniel Quintanilla',
            puesto: 'Lider de almacen'
        },
        {
            id: '5',
            nombre: 'Alavaro Rendon',
            puesto: 'Lider de compras'
        }
    ]

const [db] = BDinicial

const CrudBono = () => {
    return (

        <div>
            <p>Crud para asignar bonos</p>
            <TablaBono 
            data={db} 
          />
        </div>

    );
};

export default CrudBono;