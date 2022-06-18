import React from "react";

const Message =({msg,bgColor,icon})=>{
    let style={
        padding:"1rem",
        marginBottom:"1rem",
        textAlign:"center",
        color:"#fff",
        fontWeight:"bold",
        backgroundColor:bgColor,
    };
    return(
        <div style={style}>
           <p>{msg}</p>
           {icon}
        </div>
    );
};

export default Message;

