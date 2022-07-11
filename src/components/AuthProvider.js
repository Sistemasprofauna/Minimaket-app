import { createContext, useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { authService } from "../services/auth.service";


const AuthContext = createContext({
    getUserData: () => {},
    isLoggedIn: () => {},
    signIn: (username, password, callback) => {},
    signOut: (callback) => {},
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = (props) => {

    const signIn = async (username, password, callback, setError) => {
        let resp = await authService.signIn(username,password);
        if(!resp.error){
            //Login exitoso
            callback();
        }
        else{
            //Login fallido
            setError(resp.errorMessage)
            return;
        }
    }

    const signOut = (callback) => {
        authService.signOut();
        callback();
    }

    const isLoggedIn = () => {
        return authService.isLoggedIn()
    }

    const getUserData = () => {
        return authService.getUserData();
    }

    let value = {getUserData, signIn, signOut, isLoggedIn}

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

export const RequireAuth = (props) => {

    let auth = useAuth();

    if(!auth.isLoggedIn()) {
        return <Navigate to="/login"></Navigate>
    }

    return props.children;
}