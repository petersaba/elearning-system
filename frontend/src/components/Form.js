import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import LoginSignUpSwitch from "./LoginSignUpSwitch";
import { login, signUp, validateSignUp } from "../utilities";
import DropDown from "./DropDown";

const Form = ({ type }) => {
    const [inputValues, setInputValues] = useState({});

    // resetting input values when changing path
    let path;
    path = path == window.location.pathname ? path : window.location.pathname;    
    useEffect(() => {
        setInputValues({});
        setError('');
    }, [path]);

    // save input field value to InputValues object
    function saveToInputValue(attribute, value){
        setInputValues({...inputValues, [attribute]: value});
    }

    const [error, setError] = useState('');

    useEffect(() =>{
        setInputValues({type: 'student'});
    }, []);

    // Form for the login
    if(type == 'Login'){
        
        async function changeErrorField(e, email, password){
            const message = await login(e, email, password);
            setError(message ? message : '');
        }

        return (
            <form className="form">
                <h1>{type}</h1>
                <span className="error">{error}</span>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValue}/>
                <div>
                    <Button text={type} onClick={changeErrorField} 
                        email={inputValues.email} 
                        password={inputValues.password} 
                        type={type}/>
                    <LoginSignUpSwitch/>
                </div>
            </form>
        );
    }

    // form for the sign up
    if(type == 'Sign Up'){

        async function changeErrorField(e, email, full_name, password, confirm_password, user_type='admin'){
            const message = await signUp(e, email, full_name, password, confirm_password, user_type);
            setError(message ? message : 'Account has been created');
        }

        return (
            <form className="form">
                <h1>{type}</h1>
                <span className="error">{error}</span>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValue}/>
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={saveToInputValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValue}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={saveToInputValue}/>
                <div>
                    <Button text={type} onClick={changeErrorField} 
                        email={inputValues.email}
                        full_name={inputValues.full_name}
                        password={inputValues.password}
                        confirm_password={inputValues.confirm_password}
                        type={type}/>
                    <LoginSignUpSwitch type={'Sign Up'}/>
                </div>
            </form>
        );
    }

    if(type == 'Add User'){
        async function changeErrorField(e, email, full_name, password, confirm_password, user_type){
            const message = await signUp(e, email, full_name, password, confirm_password, user_type);
            setError(message ? message : 'Account has been created');
        }

        const options = ['student', 'instructor'];
        return (
            <form className="form fix-position">
                <h1>{type}</h1>
                <span className="error">{error}</span>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValue}/>
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={saveToInputValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValue}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={saveToInputValue}/>
                <DropDown {...options} onChange={saveToInputValue}/>
                <div>
                    <Button text={type} onClick={changeErrorField} 
                        email={inputValues.email}
                        full_name={inputValues.full_name}
                        password={inputValues.password}
                        confirm_password={inputValues.confirm_password}
                        user_type={inputValues.type}
                        type={type}/>
                </div>
            </form>
        );
    }
}

Form.defaultProps = {
    type: 'Login'
}

export default Form;