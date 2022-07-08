import React,{useState} from "react";




const CrudRowBono = ({el}) =>{
    let{nombre,puesto,monto}=el
    const [isChecked, setIsChecked] = useState(null);

    const handleChange = () => {
        setIsChecked(!isChecked);
      }; 
   
    return(
        
        <tr>
            <td className="text-center">{nombre}</td>
            <td className="text-center">{puesto}</td>
            <td className="text-center">{monto}</td>
            <td className="text-center"><input type="checkbox"  checked={isChecked} onChange={handleChange} ></input></td>
            
        </tr>
    )
}

export default CrudRowBono;