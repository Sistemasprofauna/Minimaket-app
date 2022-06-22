import React, { useState, useEffect } from "react";


const initialForm = {

    id: null,
    nombre: "",
    puesto: "",

}

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit])

    const manejoCambios = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const manejoEnvios = (e) => {
        e.preventDefault();

        if (!form.nombre || !form.puesto) {
            alert("Datos Incompletos!");
            return;
        }

        if (form.id === null) {
            createData(form);
        } else {
            updateData(form);
        }

        manejoReseteo();
    };

    const manejoReseteo = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    };

    return (
        <div className="col-md-8" >
            <br></br>
            <h3>{dataToEdit ? "Editar Colaborador" : "Crear Colaborador"}</h3>
            <br></br>
            <form table onSubmit={manejoEnvios} >
                <div className="input-group flex-nowrap w-50 m-2" >
                    <span className="input-group-text" id="addon-wrapping"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></span></span>
                    <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={manejoCambios} value={form.nombre} aria-label="Username" aria-describedby="addon-wrapping" />
                </div>

                <div className="input-group flex-nowrap w-50 m-2" >
                    <span className="input-group-text" id="addon-wrapping"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-award-fill" viewBox="0 0 16 16">
                        <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                    </svg></span></span>
                    <input type="text" className="form-control" name="puesto" placeholder="Puesto" onChange={manejoCambios} value={form.puesto} />
                </div>
                <button type="submit" value="Enviar" className="btn btn-outline-success m-2"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-send-plus-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
</svg> Enviar</button>
                <button type="reset" value="Limpiar" onClick={manejoReseteo} class="btn btn-outline-warning"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
  <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
</svg> Limpiar</button>
            </form>
            <br></br>
        </div>
    );
}

export default CrudForm;