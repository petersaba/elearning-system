const Button = (props) => {
    if(props.type == 'Login'){
        return (
            <button type={props.submit ? "submit" : "button"} className="button" 
            onClick={(e) => props.onClick(e, props.email, props.password)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Sign Up' || props.type == 'Add User'){
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
            onClick={(e) => props.onClick(e, props.instructor_id, props.course_id)}>
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