import React from "react";
import "./login.css";

const Login = () => {
  return (

    

    <div className="col-md-8">
      <label className="input-group-text" for="inputGroupSelect01"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
      </svg></label>
      <select className="form-select" id="inputGroupSelect01">
        <option value="1">Arnoldo Rodriguez</option>
        <option value="2">Cesar Guzman</option>
        <option value="3">Ramiro Ortega</option>
      </select>
      <div >
  <span class="input-group-text" id="addon-wrapping">@</span>
  <input type="text" className="form-control" name="nombre" placeholder="Nombre"  aria-label="Username" aria-describedby="addon-wrapping" />
</div>
    </div>
    
    

  )
}
export default Login