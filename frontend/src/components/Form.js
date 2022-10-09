import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import LoginSignUpSwitch from "./LoginSignUpSwitch";
import { disableRefresh } from "../utilities";

const Form = ({ type, onClick }) => {
    const [inputValues, setInputValues] = useState({});

    // resetting input values when changing path
    let path;
    path = path == window.location.pathname ? path : window.location.pathname;    
    useEffect(() => {
        setInputValues({});
    }, [path]);

    // save input field value to InputValues object
    function saveToInputValue(attribute, value){
        setInputValues({...inputValues, [attribute]: value});
    }

    // Form for the login
    if(type == 'Login'){
        return (
            <form className="form">
                <h1>{type}</h1>
                <span className="error">here goes the error</span>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValue}/>
                <div>
                    <Button text={type} onClick={disableRefresh}/>
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
                <span className="error">here goes the error</span>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValue}/>
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={saveToInputValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValue}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={saveToInputValue}/>
                <div>
                    <Button text={type} onClick={disableRefresh}/>
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