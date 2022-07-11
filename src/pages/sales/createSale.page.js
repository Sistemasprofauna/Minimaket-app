import { 
  Button, StepLabel, 
  Stepper, Typography, 
  Chip, Stack 
} from "@mui/material";
import Step from '@mui/material/Step';
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import React from "react";
import { GetColaboradorComponent } from "../../components/getColaborador.component";
import { SetSaleComponent } from "../../components/sales/SetSale.components";
import { v4 } from 'uuid'
import { apiUrl } from "../../helpers/config";
import axios from "axios";
import { getByPlaceholderText } from "@testing-library/react";
import './img.css'
import { useAuth } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export function CreateSalePage() {

    const [activeStep, setActiveStep] = useState(0);
    const [ventaSuccess, setVentaSuccess] = useState(false);

    const [sale, setSale] = useState({
      id: v4(),
      employeeId: null,
      employeeName: '',
      total: 0
    })

    const steps = [
      "Capturar colaborador",
      "Generar venta",
      "Confirmar"
    ];

    const setColaborador = (employee) => {
      if(employee.employeeId){
        setSale({
          ...sale,
          employeeId: employee.employeeId,
          employeeName: employee.name
        })
      }
      else{
        setSale({
          id: v4(),
          employeeId: null,
          employeeName: '',
          total: 0
        })
      }
    }

    const handleSaleTotal = (total) => {
      setSale({
        ...sale,
        total: total
      })
    }

    //Metodo para confirmar la venta
    const handleFinish = () => {
      var url = apiUrl + `sales/${sale.id}/confirm`
      
      axios
      .post(url)
      .then((res) => {
        if(res.status === 200){
          if(!res.data.error){
            handleNext()
            console.log(res.data)
            setSaleInvoiceNumber(res.data.sale.invoiceNumber)
            setVentaSuccess(true)
          }
        }
        else{
          setVentaSuccess(false)
          console.log('Error al confirmar la venta')
        }
      })
    }

    const setSaleInvoiceNumber = (invoiceNumber) => {
      setSale({
        ...sale,
        invoiceNumber
      })
    }

    function getStepContent(stepIndex) {
      switch(stepIndex){
        case 0:
          return (
            <GetColaboradorComponent sale={sale} updateColaborador={setColaborador}/>
          );
        case 1: 
            return (
              <SetSaleComponent handleReset={handleReset} sale={sale} setSale={setSale} handleNext={handleNext} setSaleTotal={handleSaleTotal}/>
            );
        case 2: 
            return (
              <Box>
                <Typography textAlign={"center"} variant="h4">
                  Datos de la venta
                </Typography>
                <br></br>
                <Typography textAlign={"center"} variant="h5">
                  <div>Colaborador: {sale.employeeName}</div>
                  <div>Total: {sale.total}</div>
                </Typography>
              </Box>
            );
        default: 
        return (
          <div>No data</div>
        )
      }
    }

    const executeValidator = () => {
      switch(activeStep){
        case 0:
          {
            if(!sale.employeeId){
              window.alert('Debes seleccionar un colaborador')
              return false
            }
            else{
              return true
            }
          }
        default: {
          return true
        }
      }
    }

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
      if(executeValidator()){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    };

    const handleReset = () => {
        setActiveStep(0);
        setColaborador({
          employeeName: '',
          employeeId: null
        })
      };

      const NextButton = () => {
        return(
          activeStep != 1 ? (<Button onClick={handleNext}>Next</Button>) : (<></>)
        )
      }

      const GetMensajeFinal = () => {
        return ventaSuccess ? (
          <Box padding={5}>
            <Typography variant="h4" textAlign={"center"}>
              Venta generada con exito
            </Typography>
            <Typography variant="h5" textAlign={"center"}>
              folio: <b>{sale.invoiceNumber}</b>
            </Typography>
            <img className="center" height="100px" src={"http://192.168.2.48:3000/img/success.png"} ></img>
            {/* <Stack direction="row" justifyContent="center">
              <Chip label={`folio: ${sale.invoiceNumber}`} color="success"/>
            </Stack> */}
          </Box>
        ) : (
          <Box padding={5} alignItems="center">
            <Typography variant="h4" component="h4" textAlign={"center"}>
              Ocurrio un error al procesar la venta
            </Typography>
          </Box>
        );
      }

      const auth = useAuth();
      const navigate = useNavigate()

      const handleExit = () => {
        
        auth.signOut(() => {
          navigate('../login')
        })
      }

    return (
      <Box sx={{ width: "100%", padding: 5 }} height="100vh">
        <Box padding={1}>
          <Button onClick={handleExit}>
            Salir
          </Button>
        </Box>
        {/* Componente de pasos */}
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {/* Configuracion de botones Next, Back y Finish */}
        {activeStep === steps.length ? (
          //Boton Reset
          <React.Fragment>
              <GetMensajeFinal></GetMensajeFinal>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Nueva venta</Button>
            </Box>
          </React.Fragment>
        ) : (
          //Botones Next, Back y Finish
          <React.Fragment>
            <Box display="flex" flexDirection="column">
              <Box height="80%" sx={{ padding: 5 }}>
                {getStepContent(activeStep)}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleFinish}>Confirmar</Button>
                ) : <NextButton/>}
              </Box>
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
}