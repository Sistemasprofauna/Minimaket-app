import React from "react";
import {  Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { ListColaboradoresPage } from "./pages/colaboradores/ListColaboradores.pages";
import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth.component";
import { AdminPage } from "./pages/AdminPage.page";
import { CashierPage } from "./pages/CashierPage.page";
import { CreateEmployeePage } from "./pages/colaboradores/CreateEmployee.page";
import { EditEmployee } from "./pages/colaboradores/EditEmployee.pages";
import { ListBondsPage } from "./pages/bonos/ListBonds.page";
import { authService } from "./services/auth.service";

function App(){
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
  const user = authService.getUserData();

  if (user) {
    if (user.userType == "Administrator") {
      return <AdminPage></AdminPage>;
    }

    if (user.userType == "Cashier") {
      return <CashierPage></CashierPage>;
    }
  }

  return <div>Error</div>;
}

export default App;
