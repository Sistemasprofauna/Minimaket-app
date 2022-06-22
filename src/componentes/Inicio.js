import React, { useEffect, useState } from "react";
import "./Inicio.css";
import Rgdig from "./rdig";


export default function Inicio() {
    const [time, changeTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
        setInterval(() => {
          changeTime(new Date().toLocaleTimeString());
        }, 1000);
      }, []);
    return (
        <div className="Inicio">
        <h1 className="Titulo">Bienvenido</h1>
        <div className="Time"><Rgdig text={time}/></div>
       
        </div>

    );
};