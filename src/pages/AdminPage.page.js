import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/navBar/barraNav"

export const AdminPage = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <Outlet/>
        </React.Fragment>
    )
}