const Button = (props) => {
    if(props.type == 'Login'){
        return (
            <button type={props.submit ? "button" : "submit"} className="button" 
            onClick={(e) => props.onClick(e, props.email, props.password)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Sign Up' || props.type == 'Add User'){
        return (
            <button type={props.submit ? "button" : "submit"} className="button" 
            onClick={(e) => props.onClick(e, props.email, props.full_name, props.password, props.confirm_password, props.user_type)}>
            {props.text}</button>
        );
    }

    if(props.type == 'Add Course'){
        return (
            <button type={props.submit ? "button" : "submit"} className="button" 
            onClick={(e) => props.onClick(e, props.course_code, props.course_name)}>
            {props.text}</button>
        );
    }
}

Button.defaultProps = {
    submit: false,
    email: '',
    full_name: '',
    password: '',
    confirm: ''
}

export default Button;