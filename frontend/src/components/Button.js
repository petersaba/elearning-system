import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
    const navigate = useNavigate();

    if(props.type == 'Login'){

        const changePage = async (e) => {
            const message = await props.onClick(e, props.email, props.password);
            console.log(message);
            if(message == 'admin'){
                navigate('/admin/add_user');
            }else if((message == 'instructor')){
                navigate('/instructor/add_student')
            }else if(message == 'student'){
                navigate('/student/enroll_in_course');
            }
            
            }
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={changePage}>
            {props.text}</button>
        );
    }

    if(props.type == 'Sign Up' || props.type == 'Add User' || props.type == 'Add Student'){
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={(e) => props.onClick(e, props.email, props.full_name, props.password, props.confirm_password, props.user_type)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Add Course'){
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={(e) => props.onClick(e, props.course_code, props.course_name)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Assign Instructor'){
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={(e) => props.onClick(e, props.instructor_email, props.course_code)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Create Assignment' || props.type == 'Create Announcement'){
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={(e) => props.onClick(e, props.title, props.content)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Enroll In Course'){
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={(e) => props.onClick(e, props.course_code)}>
            {props.text}</button>
        );
    }
}

Button.defaultProps = {
    submit: true,
    email: '',
    full_name: '',
    password: '',
    confirm: ''
}

export default Button;