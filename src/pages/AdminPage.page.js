import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../componentes/barraNav"

export const AdminPage = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <Outlet/>
        </React.Fragment>
    )
}