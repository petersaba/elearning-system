export const disableRefresh = (e) => {
    e.preventDefault();
    console.log('hello world');
}

export const checkValidEmail = (email) => {
    const pattern = /^.{3,}@[^\W_]{3,}\.[^\W_]{2,}$/;
    return checkPattern(email, pattern);
}

export const checkPattern = (value, pattern) => {
    return value.search(pattern);
}

export const checkStrongPassword = (password) => {
    if(password.length < 16)
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