import React, { useState } from 'react';
import CrudForm from "./CrudForm";
import CrudTable from "./crudTable";

const BDinicial =
[
    {
      id:'1',
      nombre:'Oscar Rojas',
      puesto:'Gerente Operativo'

    },
    {
        id:'2',
        nombre:'Alejandro Rojas',
        puesto:'Director Gneral'
        
    },
    {
        id:'3',
        nombre:'Arnoldo Rodriguez',
        puesto:'Auxiliar de sistemas'
    },
    {
        id:'4',
        nombre:'Daniel Quintanilla',
        puesto:'Lider de almacen'
    },
    {
        id:'5',
        nombre:'Alavaro Rendon',
        puesto:'Lider de compras'
    }
 ]

const CrudApp = () =>{
    const [db, setbd] = useState(BDinicial)
    const [dataToEdit,setDataToEdit]=useState(null)


    const createData = (data)=>{
        data.id=Date.now();
        console.log(data);
        setbd([...db,data]);
    };

    const updateData = (data)=>{
        let newData=db.map((el)=>el.id===data.id?data:el);
        setbd(newData);
    };

    const deleteData = (id)=>{
        let isDelete = window.confirm(
            `Estas seguro de eliminar al colaborador  '${id}'?`);
    

    if(isDelete){
        let newData = db.filter((el)=>el.id!==id);
        setbd(newData);
    }else{
        return;
    };
};

    return(
    <div>
        <h1 class="p-2 bg-primary text-white">MiniMarket APP</h1>
        <article className="grid-1-2">
        <CrudForm 
        createData={createData}
         updateData={updateData}
          dataToEdit={dataToEdit}
           setDataToEdit={setDataToEdit}
           />
        <CrudTable 
        data={db} 
         setDataToEdit={setDataToEdit}
          deleteData={deleteData} />
        </article>
    </div>        
    );
}

export default CrudApp