import {
    Container, Paper,
    TextField, Grid, 
    Button, Alert
}
from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { employeeService } from '../../services/employee.service'


export const EditEmployee = () => {

    const [employee, setEmployee] = useState({
        name: '',
        curp: ''
    })
    const [error, setError] = useState();
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {

        const getData = async () => {
            employeeService.getEmployeeById(id, () => {}, handleEmployee)
        }

        getData();
    })

    const handleEmployee = (employee) => {
        setEmployee({
            ...employee
        })
    }

    const handleSave = () => {
        if(employee){
            employeeService.updateEmployee(employee, handleError, handleSuccess)
        }
        else{
            handleError('Datos insuficientes')
        }
    }
    
    const setName = (e) => {
        setEmployee({
            ...employee,
            name: e.target.value
        })
    }
    
    const setCurp = (e) => {
        setEmployee({
            ...employee,
            curp: e.target.value
        })
    }

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setTimeout(() => {
            setError(null)
        }, 1500);
    }

    const handleSuccess = () => {
        navigate('/employees')
    } 

    return (
         <Container maxWidth='sm' sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                        required
                        id="name"
                        label="Nombre"
                        fullWidth
                        variant="standard"
                        onChange={setName}
                        value={employee.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        required
                        id="curp"
                        label="CURP"
                        fullWidth
                        variant="standard"
                        onChange={setCurp}
                        value={employee.curp}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={handleSave}>
                            Guardar
                        </Button>
                    </Grid>
                    
                </Grid>
                <Grid container spacing={3}>
                <Grid item md={6}>
                    {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}