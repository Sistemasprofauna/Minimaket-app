import { createContext, useContext, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { authService } from "../services/auth.service";


const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    getUserData: () => {},
    signIn: (username, password, callback) => {},
    signOut: (callback) => {},
    verifyToken: () => {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const signIn = async (username, password, callback, setError) => {

        //Hacer request de token
        let resp = await authService.signIn(username,password);

        if(!resp.error){
            //Login exitoso
            setIsLoggedIn(true);
            setUser({})
            callback();
        }
        else{
            //Login fallido
            setError(resp.errorMessage)
            return;
        }
    }

    const signOut = (callback) => {
        //Borrar token
        authService.signOut();
        setIsLoggedIn(false)
        callback();
    }

    const getUserData = () => {
        return authService.getUserData();
    }

    const verifyToken = () => {
        if(authService.validToken()){
            console.log('token not expired')
            setIsLoggedIn(true)
        }else{
            console.log('token expired')
            setIsLoggedIn(false)
        }
    }

    let value = {isLoggedIn, user, getUserData, signIn, signOut, verifyToken}

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

export const RequireAuth = (props) => {

    let auth = useAuth();
    let location = useLocation();

    auth.verifyToken();

    if(!auth.isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    else{
        return props.children;
    }
}