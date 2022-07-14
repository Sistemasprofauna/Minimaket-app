import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { getUsers } from "../../services/users.service";
import { helpHttp } from "../../helpers/helpHttp";
import { apiUrl } from "../../helpers/config";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { ButtonGroup, Button, Stack, Grid, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { bondsService } from "../../services/bonds.service";


const Row = ({bond, setAlert, refreshRows}) => {
    
    let { employeeId } = bond

    const handleAsign = () => {
        bondsService.asignBond(employeeId, handleError, handleSuccess)    
    }

    const handleError = (message) => {
        handleAlert({
            message,
            severity:'error'
        });
    }

    const handleSuccess = () => {
        handleAlert({
            message: 'Bono asignado de manera exitosa a '+ bond.name,
            severity:'success'
        })
        refreshRows()
    }

    const handleAlert = (alert) => {
        setAlert({...alert});
        setTimeout(() => {
            setAlert(null)
        }, 5000);
    }


    return (
      <TableRow>
        <TableCell width={"70%"}>{bond.name}</TableCell>
        <TableCell>
          <Button color="success" variant="contained" onClick={handleAsign}>
            Asignar
          </Button>
        </TableCell>
      </TableRow>
    );
  };


const Rows = ({setAlert}) => {
  const [bonds, setBonds] = useState(null);

  useEffect(() => {
    refreshRows()
  }, []);

  const refreshRows = () => {
    bondsService.getAvailableBonds(handleError,handleData);
  }

  const handleError = (message) => {
    setAlert({
      message,
      severity: 'error'
    })
  }

  const handleData = (data) => {
    setBonds(data)
  }

  return bonds && bonds.map((bond) => <Row bond={bond} setAlert={setAlert} refreshRows={refreshRows}></Row>);
};

const Headers = () => {
  const columns = ["Colaborador", "Acciones"];

  return columns.map((label) => <TableCell>{label}</TableCell>);
};

export const ListBondsPage = () => {

    const [alert, setAlert] = useState(null);

  const handleAsignAll = () => {
    bondsService.setAllBonds(handleError, handleSuccess);
    setTimeout(() => {
      window.location.reload()
    }, 1500) 
  };

  const handleError = (message) => {
    handleAlert({
        message,
        severity:'error'
    });
}

const handleSuccess = () => {
    handleAlert({
        message: 'Bonos asignados',
        severity:'success'
    })
}

const handleAlert = (alert) => {
    setAlert({...alert});
    setTimeout(() => {
        setAlert(null)
    }, 1500);
}

  return (
    <Container sx={{ padding: 5 }}>
      <Grid container direction={"row-reverse"}>
        <Grid item>
          <Button
            variant="contained"
            xs={2}
            color="error"
            onClick={handleAsignAll}
          >
            Asignar todos
          </Button>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <Headers />
        </TableHead>
        <TableBody>
          {/* Row de datos */}
          <Rows setAlert={setAlert}></Rows>
        </TableBody>
      </Table>
      {alert && 
      <Alert severity={alert.severity}>
        {`${alert.message}`}
      </Alert>
      }
    </Container>
  );
};
