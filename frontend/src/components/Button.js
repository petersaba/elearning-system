const Button = (props) => {
    if(props.type == 'Login'){
        return (
            <button type={props.submit ? "button" : "submit"} className="button" 
            onClick={(e) => props.onClick(e, props.email, props.password)}>
            {props.text}</button>
        );
    }
}

Button.defaultProps = {
    submit: false
}

export default Button;