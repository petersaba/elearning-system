import Input from "./Input";

const Form = ({ type, onClick }) => {
    if(type == 'login'){
        return (
            <form className="form">
                <h1>{type}</h1>
                <Input type={'text'} id="email" text={'Email'}/>
                <Input type={'password'} id="password" text={'Password'}/>
            </form>
        );
    }
}

Form.defaultProps = {
    type: 'login'
}

export default Form;