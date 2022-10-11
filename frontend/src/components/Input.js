import { useEffect, useState } from "react";

const Input = ({ id, type, text, onChange }) => {
    const [path, setPath] = useState('/');
    const [value, SetValue] = useState('');

    if(path != window.location.pathname){
        setPath(window.location.pathname);
    }

    useEffect(() => {
        console.log(path);
        SetValue('');
    }, [path]);
    
    return (
        <div className="input"> 
            <input id={id} type={type} placeholder="this will not show" onChange={(e) => {onChange(id, e.target.value);
                                                                                            SetValue(e.target.value);}} value={value}/>
            <label htmlFor={id}>{text}</label>
        </div>
    );
}

export default Input;