import { Button, StepLabel, Stepper } from "@mui/material";
import Step from '@mui/material/Step';
import { Box } from "@mui/system";
import { useState } from "react";
import React from "react";
import { GetColaboradorComponent } from "../../components/getColaborador.component";

export function CreateSalePage() {

    const [activeStep, setActiveStep] = useState(0);

    const [colaborador, setColaborador] = useState();

    const steps = [
        {
            label: 'Capturar colaborador',
            content: GetColaboradorComponent({colaborador ,setColaborador})
        },
        {
            label: 'Generar venta',
            content: () => {
                return (
                    <div>Generar venta</div>
                )
            }
        },
        {
            label: 'Confirmar',
            content: () => {
                return (
                    <div>Confirmar</div>
                )
            }
        }
    ]

    const [currentContent, setContent] = useState(steps[0].content)



    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setContent(steps[activeStep - 1].content)
    };

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setContent(getContent())
    };

    const handleReset = () => {
        setActiveStep(0);
        setContent(steps[0].content)
      };

    const getContent = () => steps[activeStep + 1].content

    return (
      <Box sx={{ width: "100%", padding: 5 }} height="100vh">
        {/* Componente de pasos */}
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {/* Configuracion de botones Next, Back y Finish */}
        {activeStep === steps.length ? (
          //Boton Reset
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          //Botones Next, Back y Finish
          <React.Fragment>
            <Box display="flex" flexDirection="column">
                {colaborador && colaborador.nombre}
              <Box height="80%" sx={{padding: 5}}>{currentContent}</Box>
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
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
}