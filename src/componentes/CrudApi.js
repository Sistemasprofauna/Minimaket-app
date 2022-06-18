import React, { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from "./CrudForm";
import CrudTable from "./crudTable";
import Loader from './loader';
import Message from './Message';




const CrudApi = () => {
    const [db, setbd] = useState(null)
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5001/colaboradores";

    useEffect(() => {
        setLoading(true);
        try {
            helpHttp().get(url).then((res) => {

                if (!res.err) {
                    if (res === 'Error') {
                        setbd([])
                        let error = {
                            status: "API no encontrada",
                            icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
                            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
                          </svg>,
                            statusText: "404"
                        }
                        setError(error)
                    } else {
                        setbd(res)
                        setError(null)
                    }

                } else {
                    setError(res);
                    setbd(null);
                }

            });
        } catch (e) {
            console.log('Catch capturado')
        }
        setLoading(false);


    }, [url]);


    const createData = (data) => {
        data.id = Date.now();
        //cosole.log(data);

        let options = { body: data, headers: { "content-type": "application/json" }, };
        api.post(url, options).then((res) => {
            console.log(res);
            if (!res.err) {
                setbd([...db, res]);
            } else {
                setError(res);
            }
        });

    };

    const updateData = (data) => {
        let newData = db.map((el) => el.id === data.id ? data : el);
        setbd(newData);
    };

    const deleteData = (id) => {
        let isDelete = window.confirm(
            `Estas seguro de eliminar al colaborador  '${id}'?`);


        if (isDelete) {
            let newData = db.filter((el) => el.id !== id);
            setbd(newData);
        } else {
            return;
        };
    };

    return (
        <div>
            <article className="grid-1-2">
                <CrudForm
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />
                {loading && <Loader />}
                {error && (<Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" icon={error.icon}/>)}
                {db && (
                    <CrudTable
                        data={db}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData} />
                )}
            </article>
        </div>
    );
};

export default CrudApi;