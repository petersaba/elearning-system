import axios from "axios";

export const checkPattern = (value, pattern) => {
    return value.search(pattern);
}

export const checkValidEmail = (email) => {
    const pattern = /^.{3,}@[^\W_]{3,}\.[^\W_]{2,}$/;
    return checkPattern(email, pattern) == -1 ? false : true;
}

export const checkStrongPassword = (password) => {
    if(password.length < 12)
        return false;

    let pattern = / /;
    if(checkPattern(password, pattern) != -1)
        return false;

    pattern = /\d.*\d/;
    if(checkPattern(password, pattern) == -1) 
        return false;
    
    pattern = /[A-Z].*[A-Z]/;
    if(checkPattern(password, pattern) == -1)
        return false;

    pattern = /[a-z].*[a-z]/;
    if(checkPattern(password, pattern) == -1)
        return false;

    // checkign for 2 symbols
    pattern = /[\W_].*[\W_]/;
    if(checkPattern(password, pattern) == -1)
        return false;
    
    return true;
}

export const samePasswords = (password1, password2) => {
    if(password1 == password2)
        return true;
    return false;
}

const baseUrl = 'http://127.0.0.1:8000/api/';

export const axiosPost = async (api, data, token=null) => {
    try{
        return await axios.post(baseUrl + api, data,
                                {
                                    headers: {
                                        'Authorization': "Bearer" + token
                                    }
                                });
    }catch(error){
        console.log('Error from API');
        console.log(error);
    }
}

export const axiosGet = async (api, token=null) => {
    try{
        return await axios.get(baseUrl + api,
            {
                headers: {
                    'Authorization': "Bearer " + token
                }
            });
    }catch(error){
        console.log('Error from Api');
        console.log(error);
    }
}

export const validateLogin = (e, email, password) => {
    e.preventDefault();
    if(email == '' || password == '')
        return 'Please fill all fields';
    if(!checkValidEmail(email))
        return 'Invalid email format';
    if(!checkStrongPassword(password))
        return 'Password is not strong enough';
}

export const validateSignUp = (e, email, full_name, password, confirm_password) => {
    e.preventDefault();
    if(email == '' || password == '' || full_name == '' || confirm_password == '')
        return 'Please fill all fields';
    const message = validateLogin(e, email, password);
    if(message)
        return message;
    if(!samePasswords(password, confirm_password))
        return 'passwords do not match';

    const data = new FormData();
    data.append('email', email);
    data.append('full_name', full_name);
    data.append('password', password);
    data.append('confirm_password', confirm_password);

    axiosPost('register/admin', data);
}