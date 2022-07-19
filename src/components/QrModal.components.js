import { Box, Button, Modal } from "@mui/material";
import { useRef, useState } from "react"
import { QrReader } from "react-qr-reader";


function QRCodeReader ({ onResult }) {
  const lastResult = useRef()

  const constraints = {
    facingMode: "environment",
  };

  const onReadResult = (result, error) => {
    if (!result) return;
    
    // This callback will keep existing even after 
    // this component is unmounted
    // So ignore it (only in this reference) if result keeps repeating
    if (lastResult.current === result.text) {
      return
    }
    
    lastResult.current = result.text;
    onResult(result.text);
  };

  return (
    <QrReader 
    onResult={onReadResult} 
    constraints={constraints}
    />    
  )
}

export function QrModal({setResult}){

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

    const [open, setOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false)

    const openModal = () => {
      setOpen(true)
      setShouldRender(true)
    }
    const closeModal = () => {
      setOpen(false);
      setShouldRender(false)
    }

    const handleResult = (result, error) => {
      if(result){
        setResult(result)
        closeModal()
      }
    };



    return (
      <>
        <Button onClick={openModal}>Leer Qr</Button>
        <Modal open={open} onClose={closeModal}>
          <Box sx={style}>
            {shouldRender && <QRCodeReader onResult={handleResult}/>}
          </Box>
        </Modal>
      </>
    );
}