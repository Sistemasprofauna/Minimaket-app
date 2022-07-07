import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"

export function GetColaboradorComponent() {

    const [colaborador, setColaborador] = useState({});

    function getColaborador() {
        setColaborador({
            nombre: "Colaborador 1"
        })
        console.log('Colaborador set')
    }

    return (
      <div>
        <form>
          <div className="form-outline mb-4">
            <input type="search" id="form1Example1" class="form-control" />
            <label class="form-label" for="form1Example1">
              CURP
            </label>
          </div>

          <div className="form-outline mb-4">
            {colaborador && colaborador.nombre}
            <input
              value={`${colaborador.nombre}`}
              type="text"
              id="form1Example2"
              class="form-control"
              disabled
            />
            <label class="form-label" for="form1Example2">
              Colaborador
            </label>
          </div>
        </form>
        <button onClick={() => {getColaborador()}} className="btn btn-primary btn-block">Buscar</button>
      </div>
    );
}