import React from "react";
import Navbar from "./componentes/barraNav";
//import CrudApp from "./componentes/crud-app";
import CrudApi from "./componentes/CrudApi";
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>


function App() {
  return (
    <> 
    <Navbar/>
    <CrudApi/>
    <hr/>
    
    <hr/>
    </>  
  );
}

export default App;
