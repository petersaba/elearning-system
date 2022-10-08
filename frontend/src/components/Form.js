import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import LoginSignUpSwitch from "./LoginSignUpSwitch";

const Form = ({ type, onClick }) => {
    const [inputValues, setInputValues] = useState({});

    console.log("executed");

    useEffect(() => {
        console.log(inputValues);
    }, [inputValues]);

    function setParentValue(attribute, value){
        setInputValues({...inputValues, [attribute]: value});
    }

    // Form for the login
    if(type == 'Login'){
        return (
            <form className="form">
                <h1>{type}</h1>
                <Input type={'text'} id="email" text={'Email'} onChange={setParentValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={setParentValue}/>
                <div>
                    <Button text={type}></Button>
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
                <Input type={'text'} id="email" text={'Email'} />
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={setParentValue}/>
                <Input type={'password'} id="password" text={'Password'} onChange={setParentValue}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={setParentValue}/>
                <div>
                    <Button text={type}></Button>
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