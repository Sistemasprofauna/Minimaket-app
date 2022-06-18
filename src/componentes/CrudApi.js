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
        try{
            helpHttp().get(url).then((res) => {
    
                if (!res.err) {
                    if(res === 'Error'){
                        setbd([])
                        let error = {
                            status: "API no encontrada",
                            statusText: "404"
                        }
                        setError(error)
                    }else{
                        setbd(res)
                        setError(null)
                    }
    
                } else {
                    setError(res);
                    setbd(null);
                }

            });
        }catch(e){
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
                {error && (<Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />)}
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