const Button = ({ text, onClick, submit}) => {
    return (
        <button type={type ? "button" : "submit"} className="button" onClick={onClick}>{text}</button>
    );
}

Button.defaultProps = {
    submit: false
}

export default Button;