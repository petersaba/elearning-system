import { Link } from "react-router-dom";

const LoginSignUpSwitch = ({ type }) => {
    return (
        <p>{type == "login" ? "Don't " : ""}already have an account?
        <Link to={type == "login" ? "/signup" : "/"}>{type == "login" ? "Sign Up" : "Login"}</Link></p>
    )
}

LoginSignUpSwitch.defaultProps = {
    type: "login"
}

export default LoginSignUpSwitch;