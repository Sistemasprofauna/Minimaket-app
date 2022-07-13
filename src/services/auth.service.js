import jwtDecode from "jwt-decode";
import axios from 'axios';
import { apiUrl } from "../helpers/config";
import { axiosCustom } from "../helpers/axiosInstance";

const authService = {
  isAuthenticated: false,
  getUserData: () => {
    let token = localStorage.getItem("token");
    if (token) {
      token = token.split(" ")[1];
      let tokenData = jwtDecode(token);
      let userData = tokenData.user;

      return {
        ...userData,
      };
    } else {
      return null;
    }
  },
  signIn: async (username, password) => {
    //Call API
    let url = apiUrl + "login";
    const response = await axios.post(url, {
      username,
      pin: password,
    });

    let error = {
      error: false,
      errorMessage: "",
    };
    //Comprobar error
    if (!response.data.error) {
      //Guardar token y datos del usuario
      localStorage.setItem("token", response.data.token);
      return error;
    } else {
      //Enviar error
      error = {
        error: response.data.error,
        errorMessage: response.data.errorMessage,
      };
      return error;
    }
  },
  signOut: async () => {
    //Delete token
    localStorage.removeItem("token");
  },
  validToken: () => {
    let token = localStorage.getItem("token");
    if (token) {
      let { exp } = jwtDecode(token);
      let date = new Date();
      if (date.getTime() > exp * 1000) {
        //Borrar token del local storage
        authService.signOut();
        return false;
      } else {
        return true;
      }
    }
    else{
      return false
    }
  },
};

export { authService }