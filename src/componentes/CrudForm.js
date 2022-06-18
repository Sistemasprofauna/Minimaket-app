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
        <div class="col-md-8" >
            <br></br>
            <h3>{dataToEdit ? "Editar Colaborador" : "Crear Colaborador"}</h3>
            <br></br>
            <form table onSubmit={manejoEnvios}>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></span></span>
                    <input type="text" class="form-control" name="nombre" placeholder="Nombre" onChange={manejoCambios} value={form.nombre} aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
                <input type="text" name="puesto" placeholder="Puesto" onChange={manejoCambios} value={form.puesto} /><span> </span>
                <input type="submit" value="Enviar" class="btn btn-outline-success" /><span> </span>
                <input type="reset" value="Limpiar" onClick={manejoReseteo} class="btn btn-outline-warning" />
            </form>
            <br></br>
        </div>
    );
}

export default CrudForm;