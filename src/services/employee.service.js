import axios from 'axios';
import { apiUrl } from '../helpers/config'

const createEmployee = async (employee, handleError, handleSuccess) => {
    let url = apiUrl + 'employees'

    if(employee.name && employee.curp){
        let response = await axios.post(url,{
            ...employee
        });

        if(response.data.error){
            handleError(response.data.errorMessage)
            return 
        }
        else{
            handleSuccess()
            return
        }
    }
    else{
        handleError('Datos insuficientes')
    }
}

const getEmployeesList = async (url, handleError, handleSuccess) => {
    try{
        let response = await axios.get(url);
        if(response){
            if(response.data.error){
                handleError(response.data.errorMessage)
            }
            else{
                handleSuccess(response.data)
            }
        }else{
            handleError('Error al obtener los datos')
        }
    }catch(e){
        handleError(e)
    }
}

const getEmployeeById = async (id, handleError, handleEmployee) => {
    let url = apiUrl + 'employees/' + id

    if(id){
        let response = await axios.get(url);

        if(response.data.error){
            handleError(response.data.errorMessage)
        }
        else{
            handleEmployee(response.data)
        }
    }
}

const updateEmployee = async (employee, handleError, handleSucces) => {

    let url = apiUrl + 'employees/' + employee.employeeId
    console.log(url)
    try{
        let response = await axios.put(url,{
            ...employee
        })

        if(response){
            if(response.data.error){
                handleError(response.data.errorMessage)
            }
            else{
                handleSucces()
            }
        }
    }catch(e){
        handleError({error: true, e})
        return
    } 
}

export const employeeService = {
    createEmployee,
    getEmployeeById,
    updateEmployee,
    getEmployeesList
}