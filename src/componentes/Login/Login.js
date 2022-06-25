import React from "react";

const Login = () => {
    return (

        <form className="login">
        <fieldset>
          <h2>Inicio sesion</h2>
          <div class="form-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
        </fieldset>
      </form>

    )
}
export default Login