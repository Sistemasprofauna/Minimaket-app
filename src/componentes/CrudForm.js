import React,{useState,useEffect} from "react";

const initialForm = {

    id:null,
    nombre:"",
    puesto:"",

}

const CrudForm = ({createData,updateData,dataToEdit,setDataToEdit}) =>{
    const[form,setForm]=useState(initialForm);

    useEffect(()=>{
        if(dataToEdit){
            setForm(dataToEdit);
        }else{
            setForm(initialForm);
        }
    },[dataToEdit])

    const manejoCambios = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const manejoEnvios = (e) =>{
        e.preventDefault();

        if(!form.nombre||!form.puesto){
          alert("Datos Incompletos!");
          return;
        }

        if(form.id===null){
            createData(form);
        }else{
            updateData(form);
        }

        manejoReseteo();
    };

    const manejoReseteo = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    };

    return(
        <div class="col-md-8" > 
        <br></br>
         <h3>{dataToEdit ? "Editar Colaborador":"Crear Colaborador"}</h3>
         <br></br>
         <form table onSubmit={manejoEnvios}>
             <input type="text" name="nombre" placeholder="Nombre" onChange={manejoCambios} value={form.nombre}/>
             <input type="text" name="puesto" placeholder="Puesto" onChange={manejoCambios} value={form.puesto}/><span> </span>
             <input type="submit" value="Enviar" class="btn btn-outline-success"/><span> </span>
             <input type="reset" value="Limpiar" onClick={manejoReseteo} class="btn btn-outline-warning" />
         </form>
         <br></br>
        </div>
    );
}

export default CrudForm;