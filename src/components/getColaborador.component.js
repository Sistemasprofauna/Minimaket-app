import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { apiUrl } from "../helpers/config"
import axios from "axios"
import { QrModal } from "./QrModal.components"


export function GetColaboradorComponent({sale, updateColaborador, showDialog}) {

  var code = '';
  const getUserData = async () => {

    var url = apiUrl + `employees?code=${code}` 

    console.log(url)
    try {
      let response = await axios.get(url);

      if(response){
        updateColaborador(response.data)
      }
        // helpHttp().get(url).then((res) => {

        //     if (!res.err) {
        //         if (res.message === 'Error') {
        //           updateColaborador({})
        //         } else {
        //           updateColaborador(res)
        //         }

        //     } else {
        //       updateColaborador({});
        //     }
        // });
    } catch (e) {
        console.log('Catch capturado')
    }
}
    const handleQrResult = (data) => {
      code = data;
      getUserData()
    }

    return (
      <div>
        <form>
          <div className="form-outline mb-4">
            {/* <input type="text" id="form1Example1" class="form-control" value={code}/> */}
            <label class="form-label" for="form1Example1">
              Codigo
            </label>
            <QrModal setResult={handleQrResult}/>
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


      </div>
    );
}