import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RequireAuth = (props) => {

    let { isLoggedIn } = useAuth();
    let location = useLocation();
    
    if(!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    else{
        return props.children;
    }
}