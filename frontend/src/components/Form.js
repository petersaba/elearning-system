import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import LoginSignUpSwitch from "./LoginSignUpSwitch";
import disableRefresh from "../utilities";

const Form = ({ type, onClick }) => {
    const [inputValues, setInputValues] = useState({});
    const [path, setPath] = useState([]);

    if(path != window.location.pathname)
        setPath(window.location.pathname);

    useEffect(() => {
        setInputValues({});
        console.log(inputValues);
    }, [path]);

    // save input field value to InputValues object
    function saveToInptValue(attribute, value){
        setInputValues({...inputValues, [attribute]: value});
    }

    // Form for the login
    if(type == 'Login'){
        return (
            <form className="form">
                <h1>{type}</h1>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInptValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInptValue}/>
                <div>
                    <Button text={type} onClick={disableRefresh}></Button>
                    <LoginSignUpSwitch/>
                </div>
            </form>
        );
    }

    // form for the sign up
    if(type == 'Sign Up'){
        return (
            <form className="form">
                <h1>{type}</h1>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInptValue}/>
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={saveToInptValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInptValue}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={saveToInptValue}/>
                <div>
                    <Button text={type} onClick={disableRefresh}></Button>
                    <LoginSignUpSwitch type={'Sign Up'}/>
                </div>
            </form>
        );
    }
}

Form.defaultProps = {
    type: 'Login'
}

export default Form;