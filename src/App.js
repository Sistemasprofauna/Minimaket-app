import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudApi from "./componentes/CrudApi";
import Navbar from "./componentes/barraNav";
import Inicio from "./componentes/Inicio";
import CrudBono from "./componentes/Bonos/asignarBono";
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/crearColaborador' element={<CrudApi />} />
          <Route path='/asignarBono' element={<CrudBono />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
