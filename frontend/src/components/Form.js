import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import LoginSignUpSwitch from "./LoginSignUpSwitch";
import { login, signUp, addCourse, getAllInstructors, getUnassignedCourses, assignInstructor } from "../utilities";
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
    function saveToInputValues(attribute, value){
        setInputValues({...inputValues, [attribute]: value});
    }

    const [error, setError] = useState('');

    useEffect(() =>{
        setInputValues({type: 'student'});
        getUnassignedCourses().then((response) => setCourses(response));
        getAllInstructors().then((response) => setInstructors(response));
    }, []);

    const [instructors, setInstructors] = useState();
    const [courses, setCourses] = useState(); 

    useEffect(() => {
        console.log(instructors);
        console.log(courses);
    }, [courses, instructors]);
    

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
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValues}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValues}/>
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
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValues}/>
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={saveToInputValues}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValues}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={saveToInputValues}/>
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

    // form to add a user by the admin
    if(type == 'Add User' || type== 'Add Student'){

        async function changeErrorField(e, email, full_name, password, confirm_password, user_type){
            const message = await signUp(e, email, full_name, password, confirm_password, user_type);
            setError(message ? message : 'Account has been created');
        }

        const options = ['student', 'instructor'];
        return (
            <form className="form fix-position">
                <h1>{type}</h1>
                <span className="error">{error}</span>
                <Input type={'text'} id="email" text={'Email'} onChange={saveToInputValues}/>
                <Input type={'text'} id="full_name" text={'Full Name'} onChange={saveToInputValues}/>
                <Input type={'password'} id="password" text={'Password'} onChange={saveToInputValues}/>
                <Input type={'password'} id="confirm_password" text={'Confirm Password'} onChange={saveToInputValues}/>
                {type != 'Add Student' ? <DropDown {...options} onChange={saveToInputValues} type='user_type'/> : ''}
                <div>
                    <Button text={type} onClick={changeErrorField} 
                        email={inputValues.email}
                        full_name={inputValues.full_name}
                        password={inputValues.password}
                        confirm_password={inputValues.confirm_password}
                        user_type={type != 'Add Student' ? inputValues.type : 'student'}
                        type={type}/>
                </div>
            </form>
        );
    }

    // form to create a course by the admin
    if(type == 'Add Course'){

        async function changeErrorField(e, course_code, course_name){
            const message = await addCourse(e, course_code, course_name);
            setError(message ? message : 'Course has been created');
        }

        return (
            <form className="form fix-position">
            <h1>{type}</h1>
            <span className="error">{error}</span>
            <Input type={'text'} id="course_code" text={'Course Code'} onChange={saveToInputValues}/>
            <Input type={'text'} id="course_name" text={'Course Name'} onChange={saveToInputValues}/>
            <div>
                <Button text={type} 
                onClick={changeErrorField} 
                    course_code={inputValues.course_code}
                    course_name={inputValues.course_name}
                    type={type}/>
            </div>
            </form>
        )
    }

    // form to assign instructor to course
    if(type == 'Assign Instructor'){

        async function changeErrorField(e, instructor_email, course_code){
            e.preventDefault();
            console.log(`instructor id: ${instructor_email}`);
            console.log(`course id: ${course_code}`);
            const message = await assignInstructor(instructor_email, course_code);
            setCourses(courses.filter((course) => course.code != course_code));
            setError(message);
        }

        return (
            <form className="form fix-position">
                <h1>{type}</h1>
                <span className="error">{error}</span>
                <DropDown type='instructor_email' onChange={saveToInputValues} {...instructors}/>
                <DropDown type='course_code' onChange={saveToInputValues} {...courses}/>
                <div>
                    <Button text={type} 
                    onClick={changeErrorField} 
                    instructor_email={inputValues.instructor_email}
                    course_code={inputValues.course_code}
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