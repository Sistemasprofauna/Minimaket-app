import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudApi from "./componentes/CrudApi";
import Navbar from "./componentes/barraNav";
import Inicio from "./componentes/Inicio";
import CrudBono from "./componentes/Bonos/asignarBono";
import Login from "./componentes/Login/Login";
import { CreateSalePage } from "./pages/sales/createSale.page";
import { PageBonos } from "./pages/bonos/bonos.page";
import { ListColaboradoresPage } from "./pages/colaboradores/ListColaboradores.pages";
import Container from '@mui/material/Container';
import { AuthProvider, RequireAuth, useAuth } from "./components/AuthProvider";
import { AdminPage } from "./pages/AdminPage.page";
import { CashierPage } from "./pages/CashierPage.page";
import { CreateEmployeePage } from "./pages/colaboradores/CreateEmployee.page";
import { EditEmployee } from "./pages/colaboradores/EditEmployee.pages";
import { ListBondsPage } from "./pages/bonos/ListBonds.page";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<RequireAuth><Layout/></RequireAuth>}>
          <Route path="/employees" element={<ListColaboradoresPage></ListColaboradoresPage>}></Route>
          <Route path="/bonds" element={<ListBondsPage></ListBondsPage>}/>
          <Route path='/employees/create' element={<CreateEmployeePage/>}/>
          <Route path='/employees/:id' element={<EditEmployee/>}/>
        </Route>
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </AuthProvider>
  );
}

function Layout() {

  let auth = useAuth()
  let user = auth.getUserData();

  if(user.userType == 'Administrator'){
    return <AdminPage></AdminPage>;
  }
  
  if(user.userType == 'Cashier'){
    return <CashierPage></CashierPage>
  }

  return(
    <div>Error</div>
  )
}

export default App;
