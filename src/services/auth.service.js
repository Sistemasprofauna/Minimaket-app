import jwtDecode from "jwt-decode";
import axios from 'axios';
import { apiUrl } from "../helpers/config";
import { setAxiosToken } from "../helpers/axiosInstance";

const authService = {
  isAuthenticated: false,
  logIn: async (username, password, setToken) => {
    //Call API
    try {
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
        let token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        return error;
      } else {
        //Enviar error
        error = {
          error: response.data.error,
          errorMessage: response.data.errorMessage,
        };
        return error;
      }
    } catch (e) {
      console.log(e);
      return {
        error: true,
        errorMessage: "Error en el login",
      };
    }
  },
  logOut: async () => {
    //Delete token
    localStorage.removeItem("token");
  },
  checkAuth: () => {
    let token = localStorage.getItem("token");
    if (token) {
      let { exp } = jwtDecode(token);
      let date = new Date();
      if (date.getTime() > exp * 1000) {
        //Borrar token del local storage
        authService.logOut();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },
  getUserData: () => {
    let token = localStorage.getItem("token");
    if (token) {
      token = token.split(" ")[1];
      let tokenData = jwtDecode(token);
      let userData = tokenData.user;

      return { ...userData };
    } else {
      return null;
    }
  },
};

export { authService }