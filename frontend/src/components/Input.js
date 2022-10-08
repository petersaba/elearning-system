const Input = ({ id, type, text }) => {
    return (
        <div className="input">
            <input id={id} type={type} placeholder="this will not show"/>
            <label htmlFor={id}>{text}</label>
        </div>
    );
}

export default Input;