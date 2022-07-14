import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";
import { apiUrl } from "../../helpers/config";
import { helpHttp } from "../../helpers/helpHttp";
import "./login.css";
import {Alert} from '@mui/material';

const Login = () => {
  let navigate = useNavigate();
  let auth = useAuth();

  var [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState(null)
  const [pin, setPin] = useState(null)
  const [error, setError] = useState(null)

  let location = useLocation();

  let from = location.state?.from?.pathname || '/';

  var url = apiUrl + "users";

  useEffect(() => {
    try {
      helpHttp()
        .get(url)
        .then((res) => {
          if (!res.err) {
            if (res === "Error") {
              setUsers([]);
            } else {
              setUsers(res);
            }
          } else {
            setUsers([]);
          }
        });
    } catch (e) {
      console.log("Catch capturado");
    }
  }, [url]);

  const handleLogin = () => {
    if(selectedUser && pin){
      auth.signIn(selectedUser, pin , () => {
        navigate(from, {replace: true})
      }, handleLoginError)
    }
  };

  const handleLoginError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    },2500)
  }
  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value)
  }

  const handlePinChange = (e) => {
    setPin(e.target.value)
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Ingresar</h3>
          {/* Usuario */}
          <div className="mb-3">
            <label>Usuario</label>
            <select className="form-control" onChange={handleUserSelect}>
              <option></option>
              {users &&
                users.map((username) => (
                  <option key={username}>{username}</option>
                ))}
            </select>
          </div>
          {/* Password */}
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="contraseña"
              onChange={handlePinChange}
            />
          </div>
          <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
        <br/>
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </div>
  );
};

export default Login;
