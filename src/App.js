import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudApi from "./componentes/CrudApi";
import Navbar from "./componentes/barraNav";
//import CrudApi from "./componentes/CrudApi";
import Inicio from "./componentes/Inicio";
//import ReactDOM  from 'react-dom';
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/crearColaborador' element={<CrudApi />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
