import axios from 'axios';
import { apiUrl } from '../helpers/config'

const getAvailableBonds = async (handleError, handleData) => {
    let url = apiUrl + 'bonds';
    try{
        let response = await axios.get(url)
        if(response){
          console.log(response)
            if(response.data.error){
                handleError(response.data.erroMessage)
            }
            else{
              if(response.data.length > 0)
                handleData(response.data)
                else
                handleError('Si datos para mostrar')
            }
        }
        else{
            handleError('Error al obtener los datos')
        }
    }catch(e){
        handleError(e)
    }
}

const asignBond = async (employeeId, handleError, handleSucces) => {

    let url = apiUrl + 'employees/' + employeeId + '/bonds/confirm'
    try{
        let response = await axios.put(url);

        let message = "";
        if (response) {
          if (response.data.error) {
            //Manejar error
            message = response.data.errorMessage;
          } else {
            handleSucces()
            return;
          }
        } else {
          //Manejar Error
          message = response.data.error.message;
        }
        handleError(message);
    }catch(e){
        handleError(e)
    }
}

const setAllBonds = async (handleError, handleSuccess) => {
  let url = apiUrl + "bonds/confirm";

  try {
    let response = await axios.put(url);

    if (response) {
      if (response.data.error) {
        //Manejar error
        handleError(response.data.errorMessage)
        return
      } else {
        //Manejar mensaje satisfactorio
        handleSuccess(response.data.message)
      }
    } else {
      //Manejar Error
      handleError(response.data.errorMessage);
    }
  } catch (e) {
    handleError(e);
  }
};


export const bondsService = {
    getAvailableBonds,
    asignBond,
    setAllBonds
}