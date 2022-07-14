import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { apiUrl } from '../../helpers/config';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Button, Stack} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { employeeService } from '../../services/employee.service';


const columns = [
    'Colaborador',
    'Acciones'
]

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
export const ListColaboradoresPage = () => {
  
  const [data, setData] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    let pageSize = parseInt(event.target.value, 10)
    setRowsPerPage(pageSize);
    setPage(0);
  };

  const handleChangePage = (page, newPage) => {
    setPage(newPage);
    // let limit = rowsPerPage;
    // let offset = (page) * rowsPerPage    
    handleData(newPage,rowsPerPage)
  }

  const handleError = (message) => {
    
  }

  const handleSuccess = (data) => {
    setData(data)
  }

  const handleData = async (page, rowsPerPage) => {
    let _start = 0,
    _end = 5;

    if(page && rowsPerPage){
      _start = page * rowsPerPage;
      _end = _start + rowsPerPage;
    }

    let url = apiUrl + "employees"+`?_start=${_start}&_end=${_end}`;
    employeeService.getEmployeesList(url, handleError, handleSuccess)
  }

  useEffect(() => {
    handleData()
  },[])

  function returnRows(data){

    const Row = ({employee}) => {  

      let navigate = useNavigate();
      let { id } = employee;
      const handleEdit = () => {
        navigate(`/employees/${id}`);
      };

      const handleDelete = () => {
        employeeService.removeEmployee(id);
        window.location.reload()
      }

      return (
        <TableRow key={employee.id}>
          {/* Nombre */}
          <TableCell key={employee.name} width='70%'>{employee.name}</TableCell>
          {/* fecha creacion */}
          {/* <TableCell key={employee.dateCreated}>
            {employee.dateCreated}
          </TableCell> */}
          {/* Acciones */}
          <TableCell key={"actions"}>
            <Stack direction='row' spacing={2}>
            <Button key="edit" color='warning' variant='contained' onClick={handleEdit}>
                Editar
              </Button>
            <Button key="delete" color="error" variant='contained' onClick={handleDelete}>
              Eliminar
            </Button>
            </Stack>
          
            {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
              
            </ButtonGroup> */}
          </TableCell>
        </TableRow>
      );
    }

    return(
      data && data.map(employee => {
        return (<Row employee={employee}></Row>)
      })
      )
  }  


    return (
      <Container maxWidth="xl">
        <Box padding={5}>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
          <Link to={`/employees/create`}>
            <Button>Nuevo</Button>
          </Link>
        </Box>
        <Table
        sx={{ minWidth: 500, width: "100%" }}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow key={"r1"}>
            {columns.map((name) => {
              return <TableCell key={name}>{name}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Rows de tabla */}
          {returnRows(data)}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 50,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        {/* Paginacion de tabla */}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
                colSpan={3}
                count={200}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table> 
        </Box>
        
      </Container>
      // <TableContainer component={Paper} sx={{padding: 2}}>
      
      // </TableContainer>
    );
}