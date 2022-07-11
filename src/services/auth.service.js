import jwtDecode from "jwt-decode";
import axios from 'axios';
import { apiUrl } from "../helpers/config";

const authService = {
    isLoggedIn: () => {
        //Comprobar si hay token y si aun esta vigente
        let token = localStorage.getItem('token')

        if(token){
            return true
        }
        else{
            return false
        }
    },
    getUserData: () => {
        let token = localStorage.getItem('token').split(' ')[1];
        let tokenData = jwtDecode(token);
        let userData = tokenData.user;
        
        return {
            ...userData
        }
    },
    signIn: async (username, password) => {

        //Call API
        let url = apiUrl + 'login'
        const response = await axios.post(url, {
            username,
            pin: password
        })

        let error = {
            error: false,
            errorMessage: ''
        }
        //Comprobar error
        if(!response.data.error){
            //Guardar token y datos del usuario
            localStorage.setItem('token',response.data.token)
            return error;
        }else{
            //Enviar error
            error = {
                error: response.data.error,
                errorMessage: response.data.errorMessage
            }
            return error;
        }
    },
    signOut: async () => {
        //Delete token
        localStorage.removeItem('token')
    }
}

export { authService }