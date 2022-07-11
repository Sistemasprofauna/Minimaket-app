import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { apiUrl } from "../helpers/config"
import { helpHttp } from "../helpers/helpHttp"

export function GetColaboradorComponent({sale, updateColaborador}) {

  const [curp, setCurp] = useState('')

  const getUserData = () => {

    var url = apiUrl + `employees?curp=${curp}` 

    try {
        helpHttp().get(url).then((res) => {

            if (!res.err) {
                if (res.message === 'Error') {
                  updateColaborador({})
                } else {
                  updateColaborador(res)
                }

            } else {
              updateColaborador({});
            }
        });
    } catch (e) {
        console.log('Catch capturado')
    }
}

    const handleChange = () => {
      console.log(curp)
      getUserData()
    }

    const handleCurpChange = (e) => {
      setCurp(e.target.value.toUpperCase())
    }

    const handleKeyUpCurp = (e) => {
      e.target.value = e.target.value.toUpperCase();
    }

    return (
      <div>
        <form>
          <div className="form-outline mb-4">
            <input type="search" id="form1Example1" class="form-control" onChange={handleCurpChange} onKeyUp={handleKeyUpCurp}/>
            <label class="form-label" for="form1Example1">
              CURP
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              value={sale.employeeName}
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
        <button onClick={handleChange} className="btn btn-primary btn-block">Buscar</button>
      </div>
    );
}