import onChange from "../utilities";

const Input = ({ id, type, text, onChange }) => {
    return (
        <div className="input">
            <input id={id} type={type} placeholder="this will not show" onChange={(e) => onChange(id, e.target.value)}/>
            <label htmlFor={id}>{text}</label>
        </div>
    );
}

export default Input;