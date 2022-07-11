import { useState } from "react"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { helpHttp } from "../../helpers/helpHttp";
import { apiUrl } from "../../helpers/config";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export const SetSaleComponent = ({setSale, handleReset, sale, handleNext, setSaleTotal}) => {

    const [total, setTotal] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [maxTotal, setMaxTotal] = useState(0);

    const [inputValue, setInputValue] = useState(0)

    const handleOpenModal = () => setOpenModal(true)

    const handleCloseModal = () => setOpenModal(false)

    const handleOkModal = () => {
        setTotal(maxTotal)
        setInputValue(maxTotal)
        setSaleTotal(maxTotal)
        crearVenta()
        handleCloseModal()
    }

    const crearVenta = async () => {

      var url = apiUrl + "sales";

      console.log(sale);
      try{
        const response = await axios.put(url,{
          uuid: sale.id,
          employeeId: sale.employeeId,
          total: sale.total
        })

        //Capturar Error
        var data = response.data;
        if(data.error){

          //No hay saldo disponible en la cuenta y balance mayor de 0
          if(data.noBalance){
            //Colaborador sin saldo
            if(data.balance == 0){
              window.alert('El colaborador no tiene saldo disponible')
              handleReset();
              return;
            }

            //Mostrar modal, en caso de ser correcto el modal actualiza el total de la venta a lo disponible
            setMaxTotal(data.balance)
            setSaleTotal(data.balance)
            handleOpenModal()
          }

          //Venta repetida realizar reset
          if(data.reset){
            handleReset()
          }
        }else{
          //No hay error la venta se genero con exito
          setSale({
            ...sale,
            total: sale.total,
          });
          handleNext();
        }
      }catch(error){
        console.error(error)
      }
    }

    const handleSaveButton = () => {
      if(total == 0){
        window.alert('La venta debe ser mayor a 0')
        return
      }

      crearVenta();
    }

    const handleChange = (e) => {
        if(e.target.value === ''){
            setTotal(0)
            setInputValue('')
            setSaleTotal(0)
        }
        else{
            setTotal(e.target.value)
            setSaleTotal(e.target.value)
            setInputValue(e.target.value)
        }
    }

    return (
      <div>
        <form>
          <div className="form-outline mb-4">
            <label class="form-label" for="form1Example1">
              Total
            </label>
            <input
              type="number"
              id="form1Example1"
              class="form-control"
              placeholder={0}
              onChange={handleChange}
              inputmode="numeric" pattern="[0-9]*"
              value={inputValue}
              
            />
          </div>
        </form>
        <button onClick={handleSaveButton} className="btn btn-primary btn-block">
          Guardar
        </button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop
        >
          <Box sx={style}>
            <label>
              La compra no se puede procesar, el saldo disponible es: ${maxTotal}
            </label>
            <br/>
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={handleOkModal} variant="contained" color="success">
                  Aceptar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleReset} variant="contained" color="error">
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
}