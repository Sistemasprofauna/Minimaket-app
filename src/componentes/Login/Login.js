import React, { useEffect, useState } from "react";
import { apiUrl } from "../../helpers/config";
import { helpHttp } from "../../helpers/helpHttp";
import { getUsers } from "../services/users.service";
import "./login.css";

const Login = () => {

  var [users, setUsers] = useState();

  var url = apiUrl + 'users';

  useEffect(() => {
    try {
        helpHttp().get(url).then((res) => {

            if (!res.err) {
                if (res === 'Error') {
                    setUsers([])
                } else {
                    setUsers(res)
                }

            } else {
                setUsers([]);
            }
        });
    } catch (e) {
        console.log('Catch capturado')
    }
}, [url]);


  return (
    <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Ingresar</h3>
              {/* Usuario */}
              <div className="mb-3">
                <label>Usuario</label>
                <select className="form-control">
                  {
                    users && users.map(username => (
                      <option>
                        {username}
                      </option>
                    ))
                  }
                </select>
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="usuario"
                /> */}
              </div>
              {/* Password */}
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="contraseña"
                />
              </div>
              
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              {/* <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p> */}
            </form>
          </div>
        </div>
  );
}


export default Login
