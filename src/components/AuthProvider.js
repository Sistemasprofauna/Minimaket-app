import { createContext, useContext, useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { authService } from "../services/auth.service";
import axios from "axios";


const AuthContext = createContext({
    user: null,
    signIn: (username, password) => {},
    signOut: () => {},
    checkAuth: () => {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return authService.checkAuth()
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') ? localStorage.getItem('token') : undefined; 
    });

    axios.defaults.headers.common['Authorization'] = token;

    useEffect(() => {
        setInterval(()=> {
            checkAuth()
        },5000)
    },[])

    const signIn = async (username, password, callback, handleError) => {
        let {error , errorMessage} = await authService.logIn(username, password, setToken);

        if(error){
            handleError(errorMessage)
        }
        else{
            setIsLoggedIn(true)
            callback();
        }
    }

    const signOut = (callback) => {
        authService.logOut();
        setIsLoggedIn(false)
        callback()
    }

    const checkAuth = () => {
        if(authService.checkAuth()){
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }

    let value = {isLoggedIn, signIn, signOut, checkAuth}

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}