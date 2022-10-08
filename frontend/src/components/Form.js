const Form = ({ type, onClick }) => {
    if(type == 'login'){
        return (
            <form className="form">
                <h1>{type}</h1>
            </form>
        );
    }
}

Form.defaultProps = {
    type: 'login'
}

export default Form;